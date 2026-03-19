import { readFileSync } from "node:fs";
import { join } from "node:path";

function readPrompt(relativePath: string): string {
  return readFileSync(join(process.cwd(), "src/ai/prompts", relativePath), "utf8");
}

export const promptsV1 = {
  checklistSystem: readPrompt("v1/checklist-system.txt"),
  documentSystem: readPrompt("v1/document-system.txt")
} as const;
