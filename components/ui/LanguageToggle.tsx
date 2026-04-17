// components/ui/LanguageToggle.tsx

"use client";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const btnClass = (current: string) => 
    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
      lang === current ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
    }`;

  return (
    <div className="flex bg-zinc-900 p-1 rounded-xl w-fit gap-1 border border-zinc-800">
      <button onClick={() => setLang("en")} className={btnClass("en")}>EN</button>
      <button onClick={() => setLang("bn")} className={btnClass("bn")}>BN</button>
      <button onClick={() => setLang("both")} className={btnClass("both")}>BOTH</button>
    </div>
  );
}