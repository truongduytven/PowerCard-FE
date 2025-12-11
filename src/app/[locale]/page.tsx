"use client";
import GlobalProvider from "@/contexts/globalState";
import ProtectedSignRoute from "@/components/protectedSignRoute";
import { Toaster } from "sonner";
import { useTranslations } from "next-intl";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GradientText from "@/components/GradientText";
import BlurText from "@/components/BlurText";
import ElectricBorder from "@/components/ElectricBorder";
import { WobbleCard } from "@/components/ui/wobble-card";
import { IoLockOpenOutline } from "react-icons/io5";
import { PiMagicWandLight } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useRouter } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";
import FlashcardShowcase from "@/components/flashcard-show-case";

export default function LandingPage() {
  const t = useTranslations("Home");
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      <ProtectedSignRoute>
        <LandingPageComponent />
      </ProtectedSignRoute>
    </GlobalProvider>
  );
}

function LandingPageComponent() {
  const router = useRouter();
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const testimonials = [
    {
      name: "Sarah L., Medical Student",
      handle: "@sarah_med",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDK7oM0luG1_q2c7g4FLBnHGHT95m7aRK4Lar0ur7L4c6AiLayMUvDgKjEdtHnMFQv0EeT8ozxjkEnf-V9PWue0KaioxFtgZJtRRDBQCoo8C1CvF3ezqjAUVLu3829iY89l7ZkjZPbm_ArGMa_d3VU_rWWDkiwM6yqS8ngHQIpGYBXrNaFuJSpHSfnJfAN1BL0R1iT2U30j_lhRBqZLqx6D86-7VeiDGPZsSO58ucM6I-ywL4Y1WlgH4zBhbBlHjxOi7-V1mAeaQM4",
      message:
        "FlashcardRadiant is a game-changer. The no-flip design keeps me locked in. I've retained more anatomy in a month than I did all last semester.",
      borderColor: "border-accent-cyan",
    },
    {
      name: "David C., Software Engineer",
      handle: "@davecodes",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBamiUhhrMzM7ekTtLVZcKIHz4rnhXQaCf-LWeAxkCZrsiJLeTffV3Jm7nRJC4sLCqH6qxF9JBmrO0Rk5D24xUO4KZqY5IitmcvF0Mg7W8Ahzhe_mE9bBrq_Sv1Qf-Vu1NJuX27RSKFt3zfMvy7JCEALr2RMZmKG961TXYLpK__rURe_Sw4_O_bDPIulvipC-xOR9dnjy0L1eEPtzrfXdLVIgLmrg-3v9_78ozPSljHxsx9UsBO4ikaJZ-WBLAzZXkPUMN8mfD264Q",
      message:
        "As a developer, I appreciate the clean UI and keyboard shortcuts. The Anki-like settings are perfect for learning new programming languages. Highly recommend!",
      borderColor: "border-accent-purple",
    },
    {
      name: "Maria G., Language Learner",
      handle: "@polyglot_maria",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAaDtMua1EHRJXjoiiJeoRWPeEaPkMfQINj7k_HXpP0nGNSxzR5CbIh4sp1sAdXCGU_FbJ_iarKdeLh36An5MYuM6BakpCXkfwoWZoMrUH6G-iXL-EeNxktIUAd-L-SU_NAx-P9cSZZqHqty8cI4yDr7hicEUk-GTOBA9L5eagyOpzxnSNyhCEb3QzK5uiuUbdmorEnOK7Nsvj0UgIOCsxHFBQV9KScM1_gcN0Qq5r0yqE_ON1fIFs0pHWeBsw-N_ZgK6qxo53ZN-Q",
      message:
        "The dark mode is beautiful and easy on the eyes for late-night study sessions. It makes learning Japanese vocabulary feel less like a chore and more like a game.",
      borderColor: "border-accent-pink",
    },
  ];

  return (
    <div className="text-[#111418] dark:text-white overflow-x-hidden font-body antialiased">
      <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC] dark:bg-[#10172B]">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#a855f7]/10 dark:bg-[#3e3270] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#06b6d4]/10 dark:bg-[#a5576c] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="layout-content-container max-w-7xl px-4 md:px-10 w-full z-10 pt-8 pb-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit mx-auto lg:mx-0 bg-[#F7F9FC] dark:bg-[#342C56]">
                <span className="w-2 h-2 rounded-full bg-[#1ABAD7] animate-pulse"></span>
                <span className="text-xs font-medium text-[#1ABAD7] uppercase tracking-wider">Power Card</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">

                Master{" "}
                <span className="inline-block">
                  <GradientText
                    colors={["#22d3ee", "#a855f7", "#ec4899", "#a855f7", "#22d3ee"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="inline font-inherit text-inherit leading-inherit tracking-inherit"
                  >
                    Any
                  </GradientText>
                </span>
                <br />
                <span className="inline-block">
                  <GradientText
                    colors={["#22d3ee", "#a855f7", "#ec4899", "#a855f7", "#22d3ee"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="inline font-inherit text-inherit leading-inherit tracking-inherit leading-24"
                  >
                    Subject
                  </GradientText>
                </span>
                <br />
                without
                <br />
                Flipping.
              </h1>
              <p className="text-lg md:text-xl text-text-light font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body">                        Experience the next evolution of spaced repetition. Our unique <span className="text-text-dark font-medium">
                <BlurText
                  text="no-flip interface"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                /></span> keeps you in the flow state, making learning 3x faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="h-14 px-8 text-white cursor-pointer rounded-xl bg-[linear-gradient(135deg,#22d3ee_0%,#a855f7_50%,#ec4899_100%)] text-base font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
                  onClick={() => router.push('/sign-in')}
                >
                  Start Learning for Free
                </button>
                <button className="h-14 px-8 rounded-xl cursor-pointer bg-white dark:bg-[#1B2335] dark:text-white border border-slate-200 dark:border-slate-600 hover:bg-slate-50 text-slate-700 text-base font-bold flex items-center gap-2 justify-center transition-colors">
                  <FaPlayCircle className="w-6 h-6" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-linear-to-tr from-accent-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl transform rotate-6 dark:bg-[#075b69]"></div>
              <div className="relative bg-background-card border-white/10 shadow-2xl overflow-hidden aspect-4/3 flex flex-col glow-box transform transition hover:scale-[1.02] duration-500">
                <div className="h-12 border-b border-white/5 bg-[#F8FAFC] dark:bg-[#18202F] flex items-center px-4 gap-2 rounded-t-lg">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-6 bg-[url('https://placeholder.pics/svg/600x400/ffffff/e2e8f0-06b6d4/Radiant%20Concept')] bg-cover bg-center dark:bg-[url('https://placeholder.pics/svg/600x400/1e293b/334155-22d3ee/Radiant%20Concept')]">
                  <div className="bg-white backdrop-blur-md p-6 rounded-xl border max-w-sm w-full dark:bg-black/60 border-white/10">
                    <p className="text-[#1ABAD7] text-sm font-bold mb-2 uppercase tracking-widest">Question</p>
                    <h3 className="text-2xl font-bold mb-4">What is the capital of radiant design?</h3>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#a855f7] w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-10 w-full">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 bg-background-card dark:bg-[#1E293B] border border-white/10 
                 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                      <IoIosTrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Retention Rate</p>
                      <p className="text-lg font-bold">+94%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 bg-white dark:bg-background relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 flex">
          <div className="flex flex-col items-center">
            <div className="border-2 p-2 rounded-lg">
              <IoLockOpenOutline className="w-7 h-7 text-[#A0AEC0]" />
            </div>
            <div className="flex-1 basis-0 line"></div>
          </div>
          <div>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">
                Everything You Need to Learn, <span className="bg-[linear-gradient(to_right,#06b6d4,#a855f7,#ec4899)] bg-clip-text text-transparent">Faster</span>.
              </h2>
              <p className="text-slate-400 text-lg font-body">
                Our unique toolset is designed to keep you in a state of flow, maximizing retention and minimizing friction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative aspect-video rounded-2xl border bg-background-card p-2 glow-box dark:bg-[#1E293B]">
                <img
                  alt="Visual of creating a flashcard deck"
                  className="rounded-lg object-cover w-full h-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD61C5ETx7sBIzoJbuZ1gbgWESUAiQQSOJNrbxm-dwvn53kz5ly3kJGxbF8fYERSjw_yofmKNBzheMIq4SHmRgF_2gaTCRVN5djFa3flqv7D2dcp1Q3s41RT-nHprAX_Ufe-aN4x8CFmsL_yWCbBpdDQToePt5So-S-3F6PJpwk77Ud2yl8XhdeZuR5E_0tryP-91wFpGh6SYjvuyOVkHszyxEmxl9MYGg-gvIhev6JHwNTg9wmTXd8XNTzi0JMq_j6wkRt5HC5Ms8"
                />

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#06B6D4] rounded-lg flex items-center justify-center text-white dark:text-black shadow-lg">
                  <MdLibraryAdd className="text-2xl" />
                </div>
              </div>

              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="p-6 rounded-xl bg-background-card">
                  <h3 className="text-2xl font-bold mb-3">Effortless Deck Creation</h3>
                  <p className="text-slate-400 leading-relaxed font-body">
                    Quickly build decks from scratch, import from CSV, or paste text.
                    Our smart editor helps you format cards with Markdown, images, and
                    code blocks, making your study material as rich as your knowledge.
                  </p>

                </div>
              </ElectricBorder>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 flex">
          <div className="flex flex-col items-center">
            <div className="border-2 p-2 rounded-lg">
              <PiMagicWandLight className="w-7 h-7 text-[#A0AEC0]" />
            </div>

            <div className="flex-1 basis-0 line"></div>
          </div>

          <div>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">
                Learn Smarter with Adaptive Flashcards <span className="bg-[linear-gradient(to_right,#06b6d4,#a855f7,#ec4899)] bg-clip-text text-transparent">Faster</span>.
              </h2>
              <p className="text-slate-400 text-lg font-body">
                Our intelligent system customizes each card to your pace, ensuring you master every concept with precision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <ElectricBorder
                color="#A855F7"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="p-6 rounded-xl bg-background-card md:order-1">
                  <h3 className="text-2xl font-bold mb-3">Why It Matters</h3>
                  <p className="text-slate-400 leading-relaxed font-body">
                    This adaptive approach removes the frustration of traditional studying by eliminating wasted repetition and focusing your attention exactly where it matters. Whether you're advancing quickly or need extra support, the system adjusts instantly—helping you stay motivated, build confidence, and make continuous progress without feeling overwhelmed.
                  </p>
                </div>
              </ElectricBorder>
              <div className="relative aspect-video rounded-2xl border bg-background-card p-2 glow-box dark:bg-[#1E293B]">
                <img
                  alt="Visual of creating a flashcard deck"
                  className="rounded-lg object-cover w-full h-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc439K-toIpRA5lt6tjVwwKOXVTzarqqE48JKcXG6qK3eB-gx3YnDnBvi4B04LrJC8qr6NO12ES-kHPKD95-3Am8Wm2mOHTIZeTK5-1WFxd_9DCIMYgKtPorErpwTS02WxXiwddxKn4HCpqIvCWw29RtJ-g3MaqNj-kroVmoDn9GQDCmWB66K_03aIx7M_rHL5LHSiOgikuyN0wljkvV4Uukt2awy50Lvfi1upnTab8JHm6-bNaCnz4THkJUK9fNMJoKBSBxyLuMA"
                />

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#A855F7] rounded-lg flex items-center justify-center text-white dark:text-black shadow-lg">
                  <FaBrain className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 flex">
          <div className="flex flex-col items-center">
            <div className="border-2 p-2 rounded-lg">
              <IoAddOutline className="w-7 h-7 text-[#A0AEC0]" />
            </div>

            <div className="flex-1 basis-0 line"></div>
          </div>

          <div>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 dark:text-white">
                Build Lasting Knowledge with Spaced Repetition<span className="bg-[linear-gradient(to_right,#06b6d4,#a855f7,#ec4899)] bg-clip-text text-transparent">Faster</span>.
              </h2>
              <p className="text-slate-400 text-lg font-body">
                Scientifically-timed reviews help you remember more in less time—perfect for long-term retention and confident recall.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative aspect-video rounded-2xl border bg-background-card p-2 glow-box dark:bg-[#1E293B]">
                <img
                  alt="Visual of creating a flashcard deck"
                  className="rounded-lg object-cover w-full h-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwiiF0CHadGybLDhMx6IvL-gPtp0ql08_OkTsGDAPnuVUQdis2OrEYFzZ9ohFmXvzlQlz-qymIYSQCzzWtcSJojK3x1xSOj_Nfuv8dUZ3OdrIjKMvlrNcDXfDmZm_ZmLkBY46Qm3XiuV9vkIkToFygUr5VL7AtSezQGpCVufvOLSDHGQVYlzUm5VRvp9pqjwGXOEw-0T32pZgFth5fsg35LSwwpGEY25anxXcWdtZdzou2432M6IShEgx3fhjnvzykBajOraRkIEY"
                />

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#EC4899] rounded-lg flex items-center justify-center text-white dark:text-black shadow-lg">
                  <MdOutlineTune className="text-2xl" />
                </div>
              </div>

              <ElectricBorder
                color="#EC4899"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="p-6 rounded-xl bg-background-card">
                  <h3 className="text-2xl font-bold mb-3">The Science Behind Real Retention</h3>
                  <p className="text-slate-400 leading-relaxed font-body">
                    Instead of cramming and forgetting, you follow a proven learning rhythm that strengthens memory with every review. The system handles all the scheduling for you, ensuring the right card shows up at the right moment. Over time, you retain more with less effort, turning even short study sessions into powerful long-term results you can rely on in real-world situations.
                  </p>
                </div>
              </ElectricBorder>
            </div>
          </div>
        </div>

        <div className="py-24 bg-[#F8FAFC] relative mt-24 dark:bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Learn Smarter, Not Harder</h2>
              <p className="text-slate-400 text-lg font-body">
                Unlock your full potential with a system built for deep, lasting knowledge.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
              <WobbleCard
                containerClassName="col-span-1 lg:col-span-2 h-full bg-[#06B6D4] min-h-[500px] lg:min-h-[300px]"
                className=""
              >
                <div className="max-w-xs">
                  <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Gippity AI powers the entire universe
                  </h2>
                  <p className="mt-4 text-left  text-base/6 text-neutral-200">
                    With over 100,000 mothly active bot users, Gippity AI is the most
                    popular AI platform for developers.
                  </p>
                </div>
                <img
                  src="https://ui.aceternity.com/linear.webp"
                  width={500}
                  height={500}
                  alt="linear demo image"
                  className="absolute -right-4 lg:-right-[15%] grayscale filter -bottom-5 object-contain rounded-2xl"
                />
              </WobbleCard>
              <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#A855F7]">
                <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  No shirt, no shoes, no weapons.
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  If someone yells “stop!”, goes limp, or taps out, the fight is over.
                </p>
              </WobbleCard>
              <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#EC4899] min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                  <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Signup for blazing-fast cutting-edge state of the art Gippity AI
                    wrapper today!
                  </h2>
                  <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    With over 100,000 mothly active bot users, Gippity AI is the most
                    popular AI platform for developers.
                  </p>
                </div>
                <img
                  src="https://ui.aceternity.com/linear.webp"
                  width={600}
                  height={600}
                  alt="linear demo image"
                  className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-15 object-contain rounded-2xl"
                />
              </WobbleCard>
            </div>
          </div>
        </div>

        <div className="py-16 px-4 bg-[#F8FAFC] dark:bg-[#0F172A]">
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#1E293B] border rounded-2xl p-8 text-center flex flex-col items-center shadow-xl shadow-accent-purple/10">
            <h2 className="text-3xl font-bold mb-3">Start Your Radiant Learning Journey</h2>
            <p className="text-slate-400 mb-6 max-w-lg font-body">
              Stop cramming, start retaining. Your path to mastery begins here.
            </p>
            <button className="flex h-12 px-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#22d3ee_0%,#a855f7_50%,#ec4899_100%)] text-white text-base font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              onClick={() => router.push('/sign-up')}
            >
              Sign Up for Free
            </button>
          </div>
        </div>

        <div className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-radiant-gradient opacity-5 rounded-full blur-[150px]"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Learners Worldwide</h2>
              <p className="text-slate-400 text-lg font-body">Don't just take our word for it. See what our users are saying.</p>
            </div>
            <HoverEffect
              items={testimonials.map((t) => ({
                title: t.name,
                description: t.message,
                link: t.handle,
                avatar: t.avatar,
                borderColor: t.borderColor,
              }))}
            />
          </div>
        </div>

        <div className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-lg font-body">Have questions? We've got answers.</p>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              <div className="bg-white border rounded-xl px-4 overflow-hidden dark:bg-[#1E293B]">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline cursor-pointer font-bold text-lg">Is FlashcardRadiant free to use?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Yes! We offer a generous free plan that includes all core features for you to get started. For advanced features like unlimited cloud sync and detailed analytics, we have a Pro plan.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div className="bg-white border rounded-xl px-4 overflow-hidden dark:bg-[#1E293B]">
                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:no-underline cursor-pointer font-bold text-lg">How is this different from Quizlet?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      We use a similar powerful spaced repetition algorithm, but we focus on a much more modern, intuitive user experience and our unique "no-flip" interaction model. We aim to provide the power of Anki without the steep learning curve.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div className="bg-white border rounded-xl px-4 overflow-hidden dark:bg-[#1E293B]">
                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:no-underline cursor-pointer font-bold text-lg">Can I import my existing decks?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Absolutely. We support importing from CSV files, which is compatible with exports from Anki and other flashcard applications. We are continuously working on adding more direct import options.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div className="bg-white border rounded-xl px-4 overflow-hidden dark:bg-[#1E293B]">
                <AccordionItem value="item-4">
                  <AccordionTrigger className="hover:no-underline cursor-pointer font-bold text-lg">Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      A native mobile app for iOS and Android is currently in active development and will be available to Pro users soon. In the meantime, our web application is fully responsive and works great on mobile browsers.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>

          </div>
        </div>
      </div>
      <div />

      {/* <div className="border w-50 h-50 flex justify-center items-center relative"> 
            <div className="bg-red-300 absolute w-50 h-50 scale-90 -translate-y-10 opacity-70">hello</div>
            <div className="bg-amber-300 absolute w-50 h-50 scale-95 -translate-y-5 opacity-80">hello</div>
            <div className="relative bg-pink-500 w-50 h-50">
              hello
            </div>
          </div> */}

      <div>
        <FlashcardShowcase />
      </div>
    </div>
  );
}
