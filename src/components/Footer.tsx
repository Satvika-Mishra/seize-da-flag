import { EVENT_CONFIG } from "@/config/event";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#212732] bg-[#07080A]/95 backdrop-blur-md mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7D8B9B]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-white tracking-wider font-oswald uppercase">
              {EVENT_CONFIG.eventName} ({EVENT_CONFIG.edition})
            </span>
            <span className="hidden sm:inline text-[#2A3340]">|</span>
            <span>ORGANIZED BY {EVENT_CONFIG.organizer.toUpperCase()}</span>
            <span className="hidden sm:inline text-[#2A3340]">|</span>
            <span>{EVENT_CONFIG.institution.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] tracking-wider uppercase">
            <a
              href={EVENT_CONFIG.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F37021] transition-colors"
            >
              OFFICIAL SITE
            </a>
            <span className="text-[#2A3340]">•</span>
            <a
              href="https://cyberonites.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F37021] transition-colors"
            >
              CYBERONITES
            </a>
            <span className="text-[#2A3340]">•</span>
            <a
              href="https://www.gla.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F37021] transition-colors"
            >
              GLA UNIVERSITY
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#161B22] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#586472]">
          <span>
            SEIZE DA FLAQ ARCHIVE // CONFIDENTIAL DOSSIER SYSTEM · ALL RIGHTS RESERVED
          </span>
          <span>
            STATUS: SCREENING ROUND COMPLETE · GRAND FINALE 21–22 NOV 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
