"use client";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function SettingsPanel({ 
  searchQuery, 
  setSearchQuery 
}: { 
  searchQuery: string; 
  setSearchQuery: (val: string) => void 
}) {
  const { settings, setSettings } = useQuranSettings();

  return (
    <div className="space-y-8">
      {/* ১. Appearance Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold border-b border-zinc-800 pb-2 text-emerald-500">Appearance</h3>
        
        {/* আরবি ফন্ট সিলেকশন */}
        <div>
          <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest font-bold">Arabic Font</label>
          <select 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            value={settings.arabicFont}
            onChange={(e) => setSettings({...settings, arabicFont: e.target.value})}
          >
            <option value="Amiri">Amiri (Classic)</option>
            <option value="'Scheherazade New'">Scheherazade (Modern)</option>
            <option value="Lateef">Lateef (Elegant)</option>
          </select>
        </div>

        {/* অ্যারাবিক ফন্ট সাইজ */}
        <div>
          <label className="flex justify-between text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">
            Arabic Size <span>{settings.arabicSize}px</span>
          </label>
          <input 
            type="range" min="20" max="80" 
            value={settings.arabicSize}
            onChange={(e) => setSettings({...settings, arabicSize: Number(e.target.value)})}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* অনুবাদ ফন্ট সাইজ */}
        <div>
          <label className="flex justify-between text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">
            Translation Size <span>{settings.translationSize}px</span>
          </label>
          <input 
            type="range" min="14" max="40" 
            value={settings.translationSize}
            onChange={(e) => setSettings({...settings, translationSize: Number(e.target.value)})}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {/* ২. Translation Language Section */}
      <div className="pt-6 border-t border-zinc-800">
        <label className="block text-[10px] text-zinc-500 mb-4 uppercase tracking-widest font-bold">
          Translation Language
        </label>
        <LanguageToggle />
      </div>

      {/* ৩. Search Section (এটি এখন সাইডবারের সেটিংসের নিচেই থাকবে) */}
      <div className="pt-6 border-t border-zinc-800">
        <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">
          Search Translation
        </label>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search in English or Bengali..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-zinc-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3.5 text-zinc-500 hover:text-emerald-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}