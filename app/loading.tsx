export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white space-y-4">
      
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute text-emerald-500 font-arabic text-xl">⏳</div>
      </div>
      <p className="text-zinc-500 text-sm animate-pulse tracking-widest uppercase font-bold">
        Loading Surah...
      </p>
    </div>
  );
}