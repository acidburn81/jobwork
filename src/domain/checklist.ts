import { z } from "zod";
import { companyTypeSchema, legalReviewFlagsSchema } from "@/domain/company";

export const checklistStatusSchema = z.enum(["todo", "in_progress", "done", "blocked"]);

export const checklistItemSchema = z.object({
  code: z.string().min(3),
  title: z.string().min(5),
  description: z.string().min(10),
  status: checklistStatusSchema,
  companyType: companyTypeSchema,
  requiresDocumentDraft: z.boolean(),
  reviewFlags: legalReviewFlagsSchema
});

export const generatedChecklistSchema = z.object({
  version: z.literal("v1"),
  items: z.array(checklistItemSchema).min(1)
});

export type GeneratedChecklist = z.infer<typeof generatedChecklistSchema>;
