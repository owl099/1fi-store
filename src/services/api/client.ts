/**
 * Mock API transport.
 *
 * Every "endpoint" in `services/api/*` resolves through `mockRequest`,
 * which simulates network latency and (optionally) failures so the UI's
 * loading and error states are exercised for real. Swapping this file
 * for a `fetch` wrapper is all it would take to point the app at a live
 * backend — callers only see promises.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type MockConfig = {
  /** Artificial latency window, milliseconds. */
  latencyMs: [min: number, max: number];
  /** 0–1 probability that a request rejects with a 503. */
  errorRate: number;
};

const config: MockConfig = {
  latencyMs: [280, 620],
  errorRate: 0,
};

/**
 * Test hook — lets a dev console or an e2e test dial in latency/errors:
 *   __configureMockApi({ errorRate: 1 })
 */
export function configureMockApi(patch: Partial<MockConfig>): void {
  Object.assign(config, patch);
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__configureMockApi =
    configureMockApi;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type MockRequestOptions = {
  /** Force this call to fail regardless of the global error rate. */
  fail?: boolean;
  /** Override the error message/status on failure. */
  error?: { message: string; status: number };
  signal?: AbortSignal;
};

export async function mockRequest<T>(
  resolver: () => T | Promise<T>,
  options: MockRequestOptions = {},
): Promise<T> {
  const [min, max] = config.latencyMs;
  const wait = min + Math.random() * (max - min);
  await delay(wait);

  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const shouldFail = options.fail ?? Math.random() < config.errorRate;
  if (shouldFail) {
    const err = options.error ?? {
      message: 'The service is temporarily unavailable.',
      status: 503,
    };
    throw new ApiError(err.message, err.status);
  }

  return resolver();
}
