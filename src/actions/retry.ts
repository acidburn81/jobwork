export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  idempotencyKey: string;
}

export interface RetryStore<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
}

export class InMemoryRetryStore<T> implements RetryStore<T> {
  private readonly data = new Map<string, T>();

  get(key: string): T | undefined {
    return this.data.get(key);
  }

  set(key: string, value: T): void {
    this.data.set(key, value);
  }
}

export async function runRetrySafeAction<T>(
  action: () => Promise<T>,
  options: RetryOptions,
  store: RetryStore<T>
): Promise<T> {
  const cached = store.get(options.idempotencyKey);
  if (cached !== undefined) {
    return cached;
  }

  let attempt = 0;
  let lastError: unknown;

  while (attempt < options.maxAttempts) {
    try {
      const result = await action();
      store.set(options.idempotencyKey, result);
      return result;
    } catch (error) {
      lastError = error;
      attempt += 1;
      if (attempt < options.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Retry-safe action failed");
}
