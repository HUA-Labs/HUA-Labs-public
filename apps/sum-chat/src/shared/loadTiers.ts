import fs from "fs";
import yaml from "yaml";
import path from "path";

export function loadTiers() {
  const filePath = path.join(process.cwd(), "src/modules/tiers.yml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.parse(file);
  return {
    tierA: data.tier_a,
    tierB: data.tier_b
  };
} 