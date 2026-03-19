import { describe, expect, it, vi } from "vitest";
import { InMemoryRetryStore, runRetrySafeAction } from "../../src/actions/retry.js";

describe("runRetrySafeAction", () => {
  it("retries until success and caches by idempotency key", async () => {
    const store = new InMemoryRetryStore<string>();
    const action = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("temporary"))
      .mockResolvedValueOnce("ok");

    const first = await runRetrySafeAction(
      action,
      { maxAttempts: 3, delayMs: 0, idempotencyKey: "same-key" },
      store
    );

    const second = await runRetrySafeAction(
      action,
      { maxAttempts: 3, delayMs: 0, idempotencyKey: "same-key" },
      store
    );

    expect(first).toBe("ok");
    expect(second).toBe("ok");
    expect(action).toHaveBeenCalledTimes(2);
  });
});
