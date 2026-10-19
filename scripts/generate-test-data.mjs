import fs from "fs";

const teamPrefixes = [
  "NULL", "ROOT", "SHADOW", "CYBER", "ZERO", "KERNEL", "BINARY", "CIPHER",
  "DARK", "RED", "BLACK", "GHOST", "BYTE", "NIGHT", "STEALTH", "PACKET",
  "SYN", "STACK", "BUFFER", "VECTOR", "DECRYPT", "VOID", "PHANTOM", "ROGUE",
  "CHAOS", "VORTEX", "INTRUSION", "NEXUS", "IRON", "TITAN"
];
const teamSuffixes = [
  "BYTE", "ACCESS", "SYNDICATE", "OPERATORS", "DAY", "PANIC", "BANDITS", "PROTOCOL",
  "NET", "CELL", "CREW", "DIVISION", "OVERFLOW", "STORM", "FORCE", "SNIFFERS",
  "KNIGHTS", "LEGION", "MASTERS", "EXPLOIT", "RUNNERS", "SENTINELS", "CARTEL", "VANGUARD",
  "WARRIORS", "BRIGADE", "SQUAD", "GUILD", "RAIDERS", "ALLIANCE"
];
const firstNames = [
  "Aarav", "Ananya", "Rohan", "Priya", "Kabir", "Neha", "Vikram", "Isha",
  "Arjun", "Aditi", "Dev", "Sneha", "Karan", "Tanvi", "Aditya", "Riya",
  "Siddharth", "Pooja", "Harsh", "Anushka", "Nikhil", "Meera", "Yash", "Kavya",
  "Aryan", "Diya", "Rahul", "Simran", "Varun", "Shruti"
];
const lastNames = [
  "Sharma", "Verma", "Singh", "Patel", "Gupta", "Malhotra", "Mehta", "Joshi",
  "Chopra", "Bhatia", "Reddy", "Nair", "Saxena", "Kapoor", "Mishra", "Deshmukh",
  "Rao", "Iyer", "Banerjee", "Chatterjee", "Kulkarni", "Aggarwal", "Chawla", "Bansal",
  "Pandey", "Trivedi", "Soni", "Chaudhary", "Dubey", "Yadav"
];

const teams = [];
const usedNames = new Set();

for (let i = 1; i <= 150; i++) {
  const p = teamPrefixes[(i * 7) % teamPrefixes.length];
  const s = teamSuffixes[(i * 11) % teamSuffixes.length];
  let teamName = `${p} ${s}`;
  if (usedNames.has(teamName)) {
    teamName = `${p} ${s} ${Math.floor(i / 10) + 1}`;
  }
  usedNames.add(teamName);

  const fn = firstNames[(i * 13) % firstNames.length];
  const ln = lastNames[(i * 17) % lastNames.length];
  const teamLeader = `${fn} ${ln}`;
  
  // team size strictly 1 to 3
  const teamSize = (i % 3) + 1;
  const id = `team-${String(i).padStart(3, "0")}`;

  teams.push({
    id,
    teamName,
    teamLeader,
    teamSize
  });
}

fs.writeFileSync("public/data/shortlisted-teams.test.json", JSON.stringify(teams, null, 2));
console.log(`Generated ${teams.length} test teams.`);
