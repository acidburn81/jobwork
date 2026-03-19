import { writeFile } from "node:fs/promises";
import { demoSeedData } from "./demo-seed.js";

const outputPath = new URL("../../data/demo-seed.json", import.meta.url);

await writeFile(outputPath, `${JSON.stringify(demoSeedData, null, 2)}\n`, "utf8");
console.log(`Demo seed written to ${outputPath.pathname}`);
