import { z } from "zod";
import { generatedChecklistSchema } from "@/domain/checklist";
import { draftDocumentSchema } from "@/domain/documents";
import { promptsV1 } from "@/ai/prompt-registry";

const aiEnvelopeSchema = z.object({
  model: z.string().min(1),
  content: z.string().min(2)
});

export type AiCall = (input: { model: string; systemPrompt: string; userPrompt: string }) => Promise<{ content: string }>;

function safeParseJson<T>(schema: z.ZodSchema<T>, raw: string): T {
  const parsed = JSON.parse(raw) as unknown;
  return schema.parse(parsed);
}

export async function generateChecklistWithValidation(aiCall: AiCall, userPrompt: string) {
  const envelope = aiEnvelopeSchema.parse({
    model: "gpt-5",
    content: userPrompt
  });

  const response = await aiCall({
    model: envelope.model,
    systemPrompt: promptsV1.checklistSystem,
    userPrompt: envelope.content
  });

  return safeParseJson(generatedChecklistSchema, response.content);
}

export async function generateDocumentDraftWithValidation(aiCall: AiCall, userPrompt: string) {
  const response = await aiCall({
    model: "gpt-5",
    systemPrompt: promptsV1.documentSystem,
    userPrompt
  });

  return safeParseJson(draftDocumentSchema, response.content);
}
