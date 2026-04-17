"use client";

import { useEffect, useState } from "react";

export function useLanguage() {
  const [lang, setLang] = useState<"en" | "bn">("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved === "en" || saved === "bn") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return { lang, setLang };
}