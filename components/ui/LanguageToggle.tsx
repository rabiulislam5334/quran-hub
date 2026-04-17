"use client";

// ❌ আগের useLanguage ইম্পোর্টটি বাদ দিন
// import { useLanguage } from "@/hooks/useLanguage"; 

// ✅ আপনার তৈরি করা মূল Context ব্যবহার করুন
import { useQuran } from "@/context/QuranContext"; 

export default function LanguageToggle() {
  // সরাসরি Context থেকে lang এবং setLang নিন
  const { lang, setLang } = useQuran(); 

  const btnClass = (current: string) => 
    `relative px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ease-in-out ${
      lang === current 
        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
        : "bg-transparent text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
    }`;

  return (
    <div className="flex bg-zinc-950 p-1.5 rounded-xl w-fit gap-1 border border-zinc-800/50 shadow-inner">
      <button 
        onClick={() => setLang("en")} 
        className={btnClass("en")}
      >
        EN
      </button>

      <button 
        onClick={() => setLang("bn")} 
        className={btnClass("bn")}
      >
        BN
      </button>

      <button 
        onClick={() => setLang("both")} 
        className={btnClass("both")}
      >
        BOTH
      </button>
    </div>
  );
}