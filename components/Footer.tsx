import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800/50 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-black font-black text-xl">Q</span>
              </div>
              <span className="text-white font-bold tracking-tight text-xl">
                Quran<span className="text-emerald-500">Hub</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              A modern digital platform to read, study, and understand the Holy Quran with a seamless user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="text-zinc-500 hover:text-emerald-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-500 hover:text-emerald-500 transition-colors">About Project</Link>
              </li>
              <li>
                <a href="https://github.com/rabiulislam5334/quran-hub" target="_blank" className="text-zinc-500 hover:text-emerald-500 transition-colors">GitHub Repository</a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <p className="text-zinc-500 text-sm mb-4">
              Have any suggestions or found an error? Feel free to contribute on GitHub.
            </p>
            <div className="flex gap-4">
              {/* GitHub Button */}
              <a 
                href="https://github.com/rabiulislam5334/quran-hub" 
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 text-xs font-bold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300"
              >
                CONTRIBUTE
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-medium uppercase tracking-[0.2em]">
            © {currentYear} Quran Hub Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
              Developed by Rabiul Islam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}