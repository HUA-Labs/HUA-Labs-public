import fs from "fs";
import yaml from "yaml";
import path from "path";

export function loadEthics() {
  const filePath = path.join(process.cwd(), "src/modules/ethics-lite.yml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.parse(file);
  return data.ethics;
} 