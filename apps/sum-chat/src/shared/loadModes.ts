import fs from "fs";
import yaml from "yaml";
import path from "path";

export function loadModes() {
  const filePath = path.join(process.cwd(), "src/modules/modes.yml");
  const file = fs.readFileSync(filePath, "utf8");
  const data = yaml.parse(file);
  return data.modes;
} 