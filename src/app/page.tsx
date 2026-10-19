"use client";

import { useState, useEffect, useCallback } from "react";
import CinematicBackground from "@/components/CinematicBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShortlistOverview from "@/components/ShortlistOverview";
import TeamsTable from "@/components/TeamsTable";
import RsvpModal from "@/components/RsvpModal";
import Footer from "@/components/Footer";
import { ShortlistedTeam } from "@/types/team";

export default function HomePage() {
  const [teams, setTeams] = useState<ShortlistedTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Validate raw data record
  const validateTeamRecord = (item: unknown): ShortlistedTeam | null => {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;

    if (
      typeof record.id !== "string" ||
      typeof record.teamName !== "string" ||
      typeof record.teamLeader !== "string"
    ) {
      return null;
    }

    const teamSize = Number(record.teamSize);
    if (isNaN(teamSize) || teamSize < 1 || teamSize > 3) {
      return null;
    }

    return {
      id: record.id.trim(),
      teamName: record.teamName.trim(),
      teamLeader: record.teamLeader.trim(),
      teamSize,
    };
  };

  // Fetch data
  const loadTeams = useCallback(async (useTestDataset: boolean) => {
    setIsLoading(true);
    setError(null);

    const dataSource = useTestDataset
      ? "/data/shortlisted-teams.test.json"
      : "/data/shortlisted-teams.json";

    try {
      const response = await fetch(dataSource, {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load shortlist from ${dataSource} (HTTP ${response.status})`
        );
      }

      const rawData = await response.json();

      if (!Array.isArray(rawData)) {
        throw new Error("Invalid data format: Expected a JSON array of teams.");
      }

      // Validate & deduplicate records
      const validated: ShortlistedTeam[] = [];
      const seenIds = new Set<string>();

      for (const item of rawData) {
        const team = validateTeamRecord(item);
        if (team && !seenIds.has(team.id)) {
          seenIds.add(team.id);
          validated.push(team);
        }
      }

      setTeams(validated);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[Shortlist Load Error]:", err);
      setError(message);
      setTeams([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadTeams(isTestMode);
  }, [loadTeams, isTestMode]);

  // Toggle dataset mode
  const handleToggleTestMode = () => {
    setIsTestMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#08090B] text-[#EDE8DF]">
      {/* Background layer */}
      <CinematicBackground />

      {/* Header */}
      <Header
        onOpenRsvp={() => setIsRsvpOpen(true)}
        isTestMode={isTestMode}
        onToggleTestMode={handleToggleTestMode}
      />

      {/* Main Content Area */}
      <main className="relative flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Shortlist Overview Metrics */}
        <ShortlistOverview totalTeams={teams.length} isLoading={isLoading} />

        {/* Shortlisted Teams Table */}
        <TeamsTable
          teams={teams}
          isLoading={isLoading}
          error={error}
          onRetry={() => loadTeams(isTestMode)}
          isTestMode={isTestMode}
          onToggleTestMode={handleToggleTestMode}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* RSVP Protocol Modal */}
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </div>
  );
}
