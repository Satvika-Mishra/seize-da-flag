export interface ShortlistedTeam {
  id: string;
  teamName: string;
  teamLeader: string;
  teamSize: number;
}

export type SortField = "default" | "teamName" | "teamLeader" | "teamSize";
export type SortDirection = "asc" | "desc";
