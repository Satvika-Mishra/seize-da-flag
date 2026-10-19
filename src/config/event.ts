export const EVENT_CONFIG = {
  eventName: "SEIZE DA FLAQ",
  edition: "SDF//26",
  organizer: "Cyberonites Club",
  institution: "GLA University, Mathura",
  venue: "GLA University, Mathura, India",
  grandFinale: "21–22 November 2026",
  format: "Cybersecurity Capture The Flag",
  teamSizeRange: "1–3 MEMBERS",
  minTeamSize: 1,
  maxTeamSize: 3,
  rsvpDeadline: "31 OCT 2026",
  officialWebsiteUrl: "https://seizedaflaq.cyberonites.com/",
  // Organizers can configure the live RSVP form or portal URL here:
  // Leaving this empty opens the official briefing modal explaining the activation schedule.
  rsvpUrl: process.env.NEXT_PUBLIC_RSVP_URL || "",
};
