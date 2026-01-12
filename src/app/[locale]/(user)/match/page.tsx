"use client";
import { useEffect, useRef, useState } from "react";

/* ================== DATA ================== */
type Pair = {
    id: string;
    definition: string;
    term: string;
};

const PAIRS: Pair[] = [
    {
        id: "1",
        definition: "Produces ATP through cellular respiration",
        term: "Mitochondria",
    },
    {
        id: "2",
        definition: "Controls cell activities",
        term: "Nucleus",
    },
    {
        id: "3",
        definition: "Protein synthesis",
        term: "Ribosome",
    },
    {
        id: "4",
        definition: "Modifies and packages proteins",
        term: "Golgi apparatus",
    },
];

/* ================== TYPES ================== */
type Card = {
    id: string;
    pairId: string;
    type: "definition" | "term";
    content: string;
    x: number;
    y: number;
    visible: boolean;
};

/* ================== HELPERS ================== */
const getRandomNonOverlappingPosition = (existingCards: Card[]) => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;

    // Responsive card dimensions
    const cardWidth = isMobile ? 180 : isTablet ? 230 : 280;
    const cardHeight = isMobile ? 90 : isTablet ? 100 : 120;
    const maxAttempts = 100;

    // Giới hạn trong viewport với padding an toàn
    const timerHeight = 60;
    const padding = isMobile ? 10 : 20;
    const maxX = Math.max(200, window.innerWidth - cardWidth - padding);
    const maxY = Math.max(200, window.innerHeight - cardHeight - padding);
    const minX = padding;
    const minY = timerHeight + padding;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);

        // Check if this position overlaps with any existing card
        const overlaps = existingCards.some(card => {
            const dx = Math.abs(card.x - x);
            const dy = Math.abs(card.y - y);
            return dx < cardWidth && dy < cardHeight;
        });

        if (!overlaps) {
            return { x, y };
        }
    }

    // Fallback if can't find non-overlapping position
    return {
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY)
    };
};

/* ================== COMPONENT ================== */
export default function MatchGame() {
    const [cards, setCards] = useState<Card[]>([]);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [finalTime, setFinalTime] = useState<number | null>(null);


    /* ---------- INIT ---------- */
    useEffect(() => {
        const initialCards: Card[] = [];

        PAIRS.forEach((p) => {
            const defPos = getRandomNonOverlappingPosition(initialCards);
            initialCards.push({
                id: `d-${p.id}`,
                pairId: p.id,
                type: "definition",
                content: p.definition,
                ...defPos,
                visible: true,
            });

            const termPos = getRandomNonOverlappingPosition(initialCards);
            initialCards.push({
                id: `t-${p.id}`,
                pairId: p.id,
                type: "term",
                content: p.term,
                ...termPos,
                visible: true,
            });
        });

        setCards(initialCards);

        timerRef.current = setInterval(() => {
            setTime((t) => t + 1);
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    /* ---------- RESIZE HANDLER ---------- */
    useEffect(() => {
        const handleResize = () => {
            setCards((prev) => {
                const isMobile = window.innerWidth < 640;
                const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
                const cardWidth = isMobile ? 180 : isTablet ? 230 : 280;
                const cardHeight = isMobile ? 90 : isTablet ? 100 : 120;
                const timerHeight = 60;
                const padding = isMobile ? 10 : 20;
                const maxX = window.innerWidth - cardWidth - padding;
                const maxY = window.innerHeight - cardHeight - padding;
                const minX = padding;
                const minY = timerHeight + padding;

                return prev.map((card) => {
                    // Nếu card bị tràn ra ngoài viewport, đặt lại vào vị trí ngẫu nhiên bên trong
                    if (card.x < minX || card.x > maxX || card.y < minY || card.y > maxY) {
                        return {
                            ...card,
                            x: minX + Math.random() * Math.max(0, maxX - minX),
                            y: minY + Math.random() * Math.max(0, maxY - minY),
                        };
                    }
                    return card;
                });
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* ---------- DRAG START ---------- */
    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        if (isSubmitted) return;

        const card = cards.find((c) => c.id === id);
        if (!card) return;

        setDraggingId(id);
        dragOffset.current = {
            x: e.clientX - card.x,
            y: e.clientY - card.y,
        };
    };

    const handleTouchStart = (e: React.TouchEvent, id: string) => {
        if (isSubmitted) return;

        const card = cards.find((c) => c.id === id);
        if (!card) return;

        const touch = e.touches[0];
        setDraggingId(id);
        dragOffset.current = {
            x: touch.clientX - card.x,
            y: touch.clientY - card.y,
        };
    };


    /* ---------- DRAG MOVE ---------- */
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!draggingId) return;

            const isMobile = window.innerWidth < 640;
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
            const cardWidth = isMobile ? 180 : isTablet ? 230 : 280;
            const cardHeight = isMobile ? 90 : isTablet ? 100 : 120;
            const timerHeight = 60;
            const padding = isMobile ? 10 : 20;
            const maxX = window.innerWidth - cardWidth - padding;
            const maxY = window.innerHeight - cardHeight - padding;
            const minX = padding;
            const minY = timerHeight + padding;

            setCards((prev) =>
                prev.map((c) => {
                    if (c.id === draggingId) {
                        let newX = e.clientX - dragOffset.current.x;
                        let newY = e.clientY - dragOffset.current.y;

                        // Constrain to viewport bounds
                        newX = Math.max(minX, Math.min(newX, maxX));
                        newY = Math.max(minY, Math.min(newY, maxY));

                        return { ...c, x: newX, y: newY };
                    }
                    return c;
                })
            );
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!draggingId) return;
            e.preventDefault();

            const isMobile = window.innerWidth < 640;
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
            const cardWidth = isMobile ? 180 : isTablet ? 230 : 280;
            const cardHeight = isMobile ? 90 : isTablet ? 100 : 120;
            const timerHeight = 60;
            const padding = isMobile ? 10 : 20;
            const maxX = window.innerWidth - cardWidth - padding;
            const maxY = window.innerHeight - cardHeight - padding;
            const minX = padding;
            const minY = timerHeight + padding;

            const touch = e.touches[0];
            setCards((prev) =>
                prev.map((c) => {
                    if (c.id === draggingId) {
                        let newX = touch.clientX - dragOffset.current.x;
                        let newY = touch.clientY - dragOffset.current.y;

                        // Constrain to viewport bounds
                        newX = Math.max(minX, Math.min(newX, maxX));
                        newY = Math.max(minY, Math.min(newY, maxY));

                        return { ...c, x: newX, y: newY };
                    }
                    return c;
                })
            );
        };

        const handleUp = () => {
            if (!draggingId) return;

            setCards((prev) => {
                const current = prev.find((c) => c.id === draggingId)!;

                const target = prev.find(
                    (c) =>
                        c.id !== current.id &&
                        c.visible &&
                        c.type !== current.type &&
                        Math.abs(c.x - current.x) < 120 &&
                        Math.abs(c.y - current.y) < 80
                );

                // ✅ MATCH ĐÚNG → BIẾN MẤT
                if (target && target.pairId === current.pairId) {
                    return prev.map((c) =>
                        c.pairId === current.pairId ? { ...c, visible: false } : c
                    );
                }

                // ❌ MATCH SAI → RANDOM LẠI VỊ TRÍ
                if (target && target.pairId !== current.pairId) {
                    const isMobile = window.innerWidth < 640;
                    const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
                    const cardWidth = isMobile ? 180 : isTablet ? 230 : 280;
                    const cardHeight = isMobile ? 90 : isTablet ? 100 : 120;
                    const timerHeight = 60;
                    const padding = isMobile ? 10 : 20;
                    const maxX = Math.max(200, window.innerWidth - cardWidth - padding);
                    const maxY = Math.max(200, window.innerHeight - cardHeight - padding);
                    const minX = padding;
                    const minY = timerHeight + padding;
                    const randomX = minX + Math.random() * (maxX - minX);
                    const randomY = minY + Math.random() * (maxY - minY);
                    return prev.map((c) =>
                        c.id === current.id ? { ...c, x: randomX, y: randomY } : c
                    );
                }

                // ✅ KHÔNG THẢ VÀO ĐÂU → GIỮ NGUYÊN VỊ TRÍ
                return prev;
            });

            setDraggingId(null);
        };


        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleUp);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [draggingId, time]);

    useEffect(() => {
        const remaining = cards.filter((c) => c.visible);

        if (remaining.length === 0 && !isSubmitted && cards.length > 0) {
            // stop timer
            if (timerRef.current) clearInterval(timerRef.current);

            setFinalTime(time);
            setIsSubmitted(true);
        }
    }, [cards, isSubmitted, time]);


    /* ================== UI ================== */
    return (
        <div className="fixed inset-0 overflow-hidden bg-background">
            <div className="fixed left-4 top-20 z-[100] rounded-lg bg-white dark:bg-[#242C3A] px-3 py-1.5 text-sm font-semibold shadow-lg sm:rounded-xl sm:px-4 sm:py-2 md:left-8 md:text-base lg:text-lg">
                ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
            </div>

            {/* CARDS */}
            {cards.map(
                (card) =>
                    card.visible && (
                        <div
                            key={card.id}
                            onMouseDown={(e) => handleMouseDown(e, card.id)}
                            onTouchStart={(e) => handleTouchStart(e, card.id)}
                            style={{
                                left: card.x,
                                top: card.y,
                            }}
                            className="absolute z-40 w-40 cursor-grab select-none rounded-lg border bg-white dark:bg-[#242C3A] p-2.5 text-xs shadow-2xl active:cursor-grabbing sm:w-52 sm:rounded-xl sm:p-3 sm:text-sm md:w-64 md:p-4 md:text-base"
                        >
                            <p
                                className={
                                    card.type === "term"
                                        ? "font-semibold text-primary"
                                        : "text-gray-700 dark:text-white"
                                }
                            >
                                {card.content}
                            </p>
                        </div>
                    )
            )}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="rounded-2xl bg-white px-8 py-6 text-center shadow-2xl">
                        <h2 className="mb-4 text-2xl font-bold">Hoàn thành 🎉</h2>

                        <p className="mb-6 text-lg">
                            Thời gian hoàn thành:
                            <span className="ml-2 font-semibold text-blue-600">
                                {finalTime}s
                            </span>
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            Làm lại
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
