import type { ZodType } from "zod";

export type SafeParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errorCode: "INVALID_JSON" | "SCHEMA_VALIDATION_FAILED"; message: string };

export function safeParseAiJson<T>(raw: string, schema: ZodType<T>): SafeParseResult<T> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      errorCode: "INVALID_JSON",
      message: "AI response was not valid JSON"
    };
  }

  const validated = schema.safeParse(parsed);
  if (!validated.success) {
    return {
      ok: false,
      errorCode: "SCHEMA_VALIDATION_FAILED",
      message: validated.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")
    };
  }

  return {
    ok: true,
    data: validated.data
  };
}
