import { useTranslations } from "next-intl";
import { SparklesCore } from "../ui/sparkles";
import { TextGenerateEffect } from "../ui/text-generate-effect";

interface HeaderHeroProps {
  words: string;
}



export function HeaderHero({ words }: HeaderHeroProps) {
    const t = useTranslations("Home");
  return (
    <div className="mb-8 relative">
        <h1>{t("title")}test component</h1>
        <p>{t("desc")}component</p>
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/0 via-fuchsia-600/5 to-fuchsia-600/0 blur-xl" />
      <div className="relative">
        <TextGenerateEffect
          words={words}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 dark:from-white dark:via-fuchsia-200 dark:to-white"
        />
        <div className="mt-3 flex items-center gap-2">
          <div className="relative h-5 w-5 flex items-center justify-center">
            <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-sm animate-pulse" />
            <SparklesCore
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={800}
              className="h-full w-full"
              particleColor="#E879F9"
              speed={1}
            />
            <div className="absolute h-1 w-1 bg-fuchsia-400 rounded-full animate-ping" />
          </div>

          <p className="text-gray-700 dark:text-gray-300 font-medium pl-1">
            Ready to continue learning?
          </p>
        </div>
      </div>
    </div>
  );
}
