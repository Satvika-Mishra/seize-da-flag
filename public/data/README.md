# Shortlisted Teams Data

This directory contains the data files for the **SEIZE DA FLAQ (SDF//26)** Shortlisted Teams portal.

## Files:
- `shortlisted-teams.json`: **Production Shortlist Dataset**.
  - Default status: Empty array `[]`.
  - When the screening round results are approved, paste the official JSON array of teams directly into this file.
- `shortlisted-teams.test.json`: **Testing Dataset (150 Teams)**.
  - Used for interface verification, pagination testing, search validation, and stress-testing.

## Data Schema:
Each record must adhere to this structure:
```json
[
  {
    "id": "team-001",
    "teamName": "NULL BYTE",
    "teamLeader": "Aarav Sharma",
    "teamSize": 3
  }
]
```

### Constraints:
- `id`: Unique string (e.g., `team-001`, `team-002`)
- `teamName`: String, 1–50 characters
- `teamLeader`: String, 1–50 characters
- `teamSize`: Integer between `1` and `3` (inclusive, per official CTF rules)
