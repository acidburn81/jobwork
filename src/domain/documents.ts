import { z } from "zod";
import { legalReviewFlagsSchema } from "@/domain/company";

export const draftDocumentTypeSchema = z.enum([
  "activity_description_brief",
  "accountant_handoff_note",
  "lawyer_handoff_note"
]);

export const draftDocumentSchema = z.object({
  type: draftDocumentTypeSchema,
  title: z.string().min(5),
  bodyMarkdown: z.string().min(60),
  reviewFlags: legalReviewFlagsSchema,
  generatedAtIso: z.string().datetime()
});

export type DraftDocument = z.infer<typeof draftDocumentSchema>;
