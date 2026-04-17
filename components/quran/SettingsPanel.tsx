"use client";
import { useQuranSettings } from "@/hooks/useQuranSettings";

export default function SettingsPanel() {
  const { settings, setSettings } = useQuranSettings();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold border-b border-zinc-800 pb-2">Appearance</h3>
      
      {/* ফন্ট সিলেকশন */}
      <div>
        <label className="block text-xs text-zinc-500 mb-2 uppercase">Arabic Font</label>
        <select 
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2"
          value={settings.arabicFont}
          onChange={(e) => setSettings({...settings, arabicFont: e.target.value})}
        >
          <option value="Amiri">Amiri (Classic)</option>
          <option value="'Scheherazade New'">Scheherazade (Modern)</option>
        </select>
      </div>

      {/* অ্যারাবিক ফন্ট সাইজ */}
      <div>
        <label className="flex justify-between text-xs text-zinc-500 mb-2 uppercase">
          Arabic Size <span>{settings.arabicSize}px</span>
        </label>
        <input 
          type="range" min="20" max="60" 
          value={settings.arabicSize}
          onChange={(e) => setSettings({...settings, arabicSize: Number(e.target.value)})}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>

      {/* অনুবাদ ফন্ট সাইজ */}
      <div>
        <label className="flex justify-between text-xs text-zinc-500 mb-2 uppercase">
          Translation Size <span>{settings.translationSize}px</span>
        </label>
        <input 
          type="range" min="14" max="30" 
          value={settings.translationSize}
          onChange={(e) => setSettings({...settings, translationSize: Number(e.target.value)})}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>
    </div>
  );
}