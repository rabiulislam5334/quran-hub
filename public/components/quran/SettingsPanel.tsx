"use client";
import { useQuranSettings } from "@/hooks/useQuranSettings";
import { QuranSettings } from "@/types/quran.types";

export default function SettingsPanel() {
  const { settings, setSettings } = useQuranSettings();

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof QuranSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Number(e.target.value),
    }));
  };

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">
      <h3 className="text-xl font-bold">Display Settings</h3>
      
      {/* Arabic Font Size Slider */}
      <div>
        <label className="block text-sm mb-2 text-zinc-400">
          Arabic Font Size: {settings.arabicSize}px
        </label>
        <input
          type="range" min="20" max="60"
          value={settings.arabicSize}
          onChange={(e) => handleSizeChange(e, "arabicSize")}
          className="w-full accent-emerald-500"
        />
      </div>

      {/* Translation Font Size Slider */}
      <div>
        <label className="block text-sm mb-2 text-zinc-400">
          Translation Size: {settings.translationSize}px
        </label>
        <input
          type="range" min="14" max="30"
          value={settings.translationSize}
          onChange={(e) => handleSizeChange(e, "translationSize")}
          className="w-full accent-emerald-500"
        />
      </div>
    </div>
  );
}