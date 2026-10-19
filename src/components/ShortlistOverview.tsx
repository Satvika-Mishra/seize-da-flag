import { EVENT_CONFIG } from "@/config/event";

interface ShortlistOverviewProps {
  totalTeams: number;
  isLoading: boolean;
}

export default function ShortlistOverview({
  totalTeams,
  isLoading,
}: ShortlistOverviewProps) {
  return (
    <div className="relative border-b border-[#242B35]/70 bg-[#0C0E13]/80 backdrop-blur-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
          {/* Metrics Strip with subtle dividers */}
          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2">
            {/* Metric 1: Total Teams */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D8B9B]">
                SHORTLISTED CREWS:
              </span>
              {isLoading ? (
                <span className="text-sm font-mono font-bold text-[#F37021] animate-pulse">
                  CALCULATING...
                </span>
              ) : (
                <span className="text-base font-mono font-bold text-white tracking-wider">
                  {totalTeams} {totalTeams === 1 ? "TEAM" : "TEAMS"}
                </span>
              )}
            </div>

            <div className="hidden sm:block h-4 w-px bg-[#242B35]" />

            {/* Metric 2: Team Size Range */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D8B9B]">
                SQUAD SPEC:
              </span>
              <span className="text-sm font-mono font-semibold text-[#EDE8DF]">
                {EVENT_CONFIG.teamSizeRange}
              </span>
            </div>

            <div className="hidden sm:block h-4 w-px bg-[#242B35]" />

            {/* Metric 3: RSVP Deadline */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D8B9B]">
                RSVP DEADLINE:
              </span>
              <span className="text-sm font-mono font-bold text-[#F37021]">
                {EVENT_CONFIG.rsvpDeadline}
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8E9CAE] tracking-wider uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span>SYSTEM ACTIVE // VERIFIED DIRECTORY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
