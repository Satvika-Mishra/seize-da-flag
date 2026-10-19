"use client";

import { useState, useMemo, useEffect } from "react";
import { ShortlistedTeam, SortField, SortDirection } from "@/types/team";

interface TeamsTableProps {
  teams: ShortlistedTeam[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  isTestMode: boolean;
  onToggleTestMode: () => void;
}

export default function TeamsTable({
  teams,
  isLoading,
  error,
  onRetry,
  isTestMode,
  onToggleTestMode,
}: TeamsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("default");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter teams based on search query
  const filteredTeams = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return teams;

    return teams.filter(
      (team) =>
        team.teamName.toLowerCase().includes(query) ||
        team.teamLeader.toLowerCase().includes(query)
    );
  }, [teams, searchQuery]);

  // Sort filtered teams
  const sortedTeams = useMemo(() => {
    if (sortField === "default") {
      return filteredTeams;
    }

    return [...filteredTeams].sort((a, b) => {
      let comparison = 0;
      if (sortField === "teamName") {
        comparison = a.teamName.localeCompare(b.teamName);
      } else if (sortField === "teamLeader") {
        comparison = a.teamLeader.localeCompare(b.teamLeader);
      } else if (sortField === "teamSize") {
        comparison = a.teamSize - b.teamSize;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredTeams, sortField, sortDirection]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(sortedTeams.length / pageSize));

  // Reset to first page whenever search, sort, or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortField, sortDirection, pageSize]);

  // Adjust page if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Paginated slice
  const paginatedTeams = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedTeams.slice(startIndex, startIndex + pageSize);
  }, [sortedTeams, currentPage, pageSize]);

  // Sorting handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        // Reset to default
        setSortField("default");
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Range indicators
  const startIndex = sortedTeams.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, sortedTeams.length);

  const formatNumber = (num: number) => String(num).padStart(num < 100 ? 2 : 3, "0");
  const formatIndex = (index: number) => String(index).padStart(3, "0");

  return (
    <section className="relative z-10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar: Search, PageSize, Results Count */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-[#242B35]/70">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <label htmlFor="team-search" className="sr-only">
              Search team name or team leader
            </label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#758494]"
                aria-hidden="true"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                id="team-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team name or team leader..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#0D1016]/90 border border-[#2B3542] text-[#EDE8DF] placeholder-[#6A7888] text-sm font-space focus:outline-none focus:border-[#F37021] focus:ring-1 focus:ring-[#F37021] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#758494] hover:text-[#EDE8DF] transition-colors"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Rows per page + Dynamic Results Counter */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-5">
            {/* Rows Per Page Selector */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="page-size"
                className="text-xs font-mono uppercase tracking-wider text-[#818E9E]"
              >
                VIEW:
              </label>
              <select
                id="page-size"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-[#0E1218] border border-[#2B3542] text-xs font-mono text-[#EDE8DF] py-1.5 px-2.5 focus:outline-none focus:border-[#F37021]"
              >
                <option value={25}>25 TEAMS</option>
                <option value={50}>50 TEAMS</option>
                <option value={100}>100 TEAMS</option>
              </select>
            </div>

            {/* Dynamic Result Indicator */}
            <div className="text-xs font-mono tracking-wider text-[#A2B0BF] bg-[#12161E] border border-[#222A35] px-3 py-1.5">
              {sortedTeams.length > 0 ? (
                <span>
                  SHOWING{" "}
                  <strong className="text-white font-bold">
                    {formatNumber(startIndex)}–{formatNumber(endIndex)}
                  </strong>{" "}
                  OF{" "}
                  <strong className="text-[#F37021] font-bold">
                    {sortedTeams.length}
                  </strong>{" "}
                  TEAMS
                </span>
              ) : (
                <span>0 TEAMS FOUND</span>
              )}
            </div>
          </div>
        </div>

        {/* State 1: Loading State */}
        {isLoading && (
          <div className="py-20 text-center bg-[#0B0E14]/85 border border-[#212732] p-8">
            <div className="inline-block w-8 h-8 border-2 border-[#F37021] border-t-transparent rounded-full animate-spin mb-4" />
            <h3 className="text-sm font-mono tracking-widest text-[#F37021] uppercase">
              ACCESSING SHORTLIST...
            </h3>
            <p className="text-xs text-[#7F8D9C] font-mono mt-1">
              Synchronizing verified encrypted dossiers
            </p>
          </div>
        )}

        {/* State 2: Fetch / Parsing Error */}
        {!isLoading && error && (
          <div className="py-16 text-center bg-[#150F12]/80 border border-red-900/60 p-8">
            <div className="w-10 h-10 mx-auto mb-3 bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 font-mono font-bold">
              !
            </div>
            <h3 className="text-base font-oswald tracking-wider uppercase text-red-400">
              COMMUNICATION ERROR // SHORTLIST OFFLINE
            </h3>
            <p className="text-xs font-space text-[#9C8A8F] max-w-md mx-auto mt-2">
              {error}
            </p>
            <button
              onClick={onRetry}
              className="mt-5 px-5 py-2 bg-[#201518] hover:bg-red-900/40 text-red-200 border border-red-700/50 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              RETRY CONNECTION
            </button>
          </div>
        )}

        {/* State 3: Empty Dataset (No shortlisted teams yet) */}
        {!isLoading && !error && teams.length === 0 && (
          <div className="py-20 text-center bg-[#0C0F15]/85 border border-[#212732] p-8 sm:p-12">
            <div className="w-12 h-12 mx-auto mb-4 bg-[#141820] border border-[#2A3442] flex items-center justify-center text-[#7F8E9E]">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-oswald tracking-wider uppercase text-white font-bold">
              NO SHORTLIST DATA AVAILABLE
            </h3>
            <p className="text-sm font-space text-[#8997A7] max-w-md mx-auto mt-2 mb-6">
              The team directory has not been published yet. Please check back later
              or follow official Cyberonites Club announcements.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onToggleTestMode}
                className="px-4 py-2 bg-[#F37021] hover:bg-[#FF8400] text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                LOAD TEST DATASET (150 TEAMS)
              </button>
            </div>
          </div>
        )}

        {/* State 4: No Search Matches */}
        {!isLoading && !error && teams.length > 0 && sortedTeams.length === 0 && (
          <div className="py-16 text-center bg-[#0C0F15]/85 border border-[#212732] p-8">
            <div className="w-10 h-10 mx-auto mb-3 bg-[#161B24] border border-[#2B3544] flex items-center justify-center text-[#F37021] font-mono">
              ?
            </div>
            <h3 className="text-base font-oswald tracking-wider uppercase text-white font-bold">
              NO MATCHES FOUND
            </h3>
            <p className="text-xs font-space text-[#8997A7] max-w-sm mx-auto mt-1 mb-5">
              Try another team name or team leader query.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-[#171C25] hover:bg-[#202734] border border-[#2F3A4A] text-xs font-mono uppercase tracking-wider text-white transition-colors"
            >
              CLEAR SEARCH
            </button>
          </div>
        )}

        {/* State 5: Table Display */}
        {!isLoading && !error && paginatedTeams.length > 0 && (
          <div className="space-y-4">
            {/* Desktop / Tablet Semantic HTML Table */}
            <div className="hidden md:block overflow-hidden border border-[#242B35] bg-[#0A0D12]/90 backdrop-blur-md shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#242B35] bg-[#0E1218]/95 text-[11px] font-mono tracking-widest text-[#7F8D9E] uppercase select-none">
                    <th scope="col" className="py-3.5 px-4 w-20 text-center">
                      NO.
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("teamName")}
                      className="py-3.5 px-6 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>TEAM NAME</span>
                        <span className="text-xs text-[#F37021]">
                          {sortField === "teamName"
                            ? sortDirection === "asc"
                              ? "▲"
                              : "▼"
                            : "↕"}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("teamLeader")}
                      className="py-3.5 px-6 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>TEAM LEADER</span>
                        <span className="text-xs text-[#F37021]">
                          {sortField === "teamLeader"
                            ? sortDirection === "asc"
                              ? "▲"
                              : "▼"
                            : "↕"}
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("teamSize")}
                      className="py-3.5 px-6 text-right w-44 cursor-pointer hover:text-white transition-colors"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>TEAM SIZE</span>
                        <span className="text-xs text-[#F37021]">
                          {sortField === "teamSize"
                            ? sortDirection === "asc"
                              ? "▲"
                              : "▼"
                            : "↕"}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B212B] font-space text-sm">
                  {paginatedTeams.map((team, idx) => {
                    const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                    return (
                      <tr
                        key={team.id}
                        className="group relative transition-all duration-150 hover:bg-[#151A23]/80"
                      >
                        {/* Number */}
                        <td className="py-4 px-4 text-center font-mono text-xs text-[#738292] group-hover:text-[#F37021] transition-colors relative">
                          {/* Accent border on hover */}
                          <span className="absolute inset-y-0 left-0 w-0.5 bg-transparent group-hover:bg-[#F37021] transition-all" />
                          {formatIndex(rowNumber)}
                        </td>

                        {/* Team Name */}
                        <td className="py-4 px-6 font-semibold text-white tracking-wide group-hover:text-[#F37021] transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="font-oswald uppercase text-base tracking-wider">
                              {team.teamName}
                            </span>
                          </div>
                        </td>

                        {/* Team Leader */}
                        <td className="py-4 px-6 text-[#BAC5D1] font-medium">
                          {team.teamLeader}
                        </td>

                        {/* Team Size */}
                        <td className="py-4 px-6 text-right font-mono text-xs">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#12161E] border border-[#252E3B] text-[#CCD7E2] group-hover:border-[#384557]">
                            <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
                            {team.teamSize}{" "}
                            {team.teamSize === 1 ? "MEMBER" : "MEMBERS"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Dossier Card Layout (No horizontal scroll!) */}
            <div className="md:hidden space-y-2.5">
              {paginatedTeams.map((team, idx) => {
                const rowNumber = (currentPage - 1) * pageSize + idx + 1;
                return (
                  <div
                    key={team.id}
                    className="relative p-4 bg-[#0B0E14]/90 border border-[#242B35] hover:border-[#F37021]/60 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#F37021] bg-[#1A1F29] px-2 py-0.5 border border-[#2C3646]">
                          #{formatIndex(rowNumber)}
                        </span>
                        <h4 className="text-base font-bold font-oswald uppercase tracking-wider text-white">
                          {team.teamName}
                        </h4>
                      </div>

                      <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 bg-[#12161E] border border-[#262F3C] text-[#C2CEDC]">
                        {team.teamSize} {team.teamSize === 1 ? "MEMBER" : "MEMBERS"}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-space text-[#96A4B4] flex items-center justify-between pt-2 border-t border-[#1B212B]">
                      <span className="font-mono uppercase text-[10px] text-[#6A7989]">
                        LEADER:
                      </span>
                      <span className="text-[#EDE8DF] font-medium">
                        {team.teamLeader}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#242B35]/70">
                {/* Page Status */}
                <div className="text-xs font-mono text-[#8C9BAA] uppercase tracking-wider">
                  PAGE <strong className="text-white font-bold">{formatNumber(currentPage)}</strong> OF{" "}
                  <strong className="text-white font-bold">{formatNumber(totalPages)}</strong>
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-1.5">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 bg-[#12161E] border border-[#2A3340] text-xs font-mono uppercase tracking-wider text-[#CCD7E2] hover:bg-[#1C222C] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    PREV
                  </button>

                  {/* Numeric page buttons with ellipsis */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      const showEllipsis =
                        index > 0 && page - array[index - 1] > 1;

                      return (
                        <div key={page} className="flex items-center gap-1.5">
                          {showEllipsis && (
                            <span className="text-xs font-mono text-[#627080] px-1">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-8 h-8 px-2 text-xs font-mono tracking-wider transition-all border ${
                              currentPage === page
                                ? "bg-[#F37021] text-black font-bold border-[#F37021]"
                                : "bg-[#10141B] text-[#9FB0C0] border-[#252E3A] hover:bg-[#1A202A] hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 bg-[#12161E] border border-[#2A3340] text-xs font-mono uppercase tracking-wider text-[#CCD7E2] hover:bg-[#1C222C] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
