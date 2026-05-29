import type { RunProgress, RunResult } from './types';

export interface LoadTestOptions {
  url: string;
  headers?: Record<string, string>;
  totalRequests: number;
  concurrency: number;
  /** Per-request timeout, ms. */
  timeoutMs?: number;
}

async function timedRequest(
  url: string,
  headers: Record<string, string>,
  timeoutMs: number,
): Promise<{ ok: boolean; ms: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const t0 = performance.now();
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal,
      cache: 'no-store',
    });
    // Drain the body so the connection is fully accounted for.
    await res.arrayBuffer().catch(() => undefined);
    return { ok: res.ok, ms: performance.now() - t0 };
  } catch {
    return { ok: false, ms: performance.now() - t0 };
  } finally {
    clearTimeout(timer);
  }
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

export async function runLoadTest(
  opts: LoadTestOptions,
  onProgress?: (p: RunProgress) => void,
): Promise<RunResult> {
  const { url, headers = {}, totalRequests, concurrency, timeoutMs = 10_000 } = opts;
  const latencies: number[] = [];
  let done = 0;
  let errors = 0;
  let next = 0;

  const wallStart = performance.now();

  const worker = async () => {
    while (true) {
      const i = next++;
      if (i >= totalRequests) break;
      const { ok, ms } = await timedRequest(url, headers, timeoutMs);
      latencies.push(ms);
      if (!ok) errors++;
      done++;
      onProgress?.({ ratio: done / totalRequests, label: `${done}/${totalRequests}` });
    }
  };

  const pool = Array.from({ length: Math.min(concurrency, totalRequests) }, worker);
  await Promise.all(pool);

  const wallMs = performance.now() - wallStart;
  const wallSec = wallMs / 1000 || 1;
  const sorted = [...latencies].sort((a, b) => a - b);
  const avg = latencies.reduce((s, x) => s + x, 0) / (latencies.length || 1);
  const p95 = percentile(sorted, 95);
  const errorRate = (errors / totalRequests) * 100;
  const rps = totalRequests / wallSec;

  const status =
    errors === totalRequests ? 'error' : errors > 0 ? 'failed' : 'passed';

  return {
    status,
    total_tests: null,
    passed_tests: null,
    coverage_pct: null,
    requests_per_sec: Math.round(rps * 100) / 100,
    error_rate: Math.round(errorRate * 100) / 100,
    total_requests: totalRequests,
    // Use average latency as the headline duration metric for load runs.
    duration_ms: Math.round(avg),
    notes:
      `Запросов: ${totalRequests}, конкуренция: ${concurrency}\n` +
      `Ошибок: ${errors} (${errorRate.toFixed(1)}%)\n` +
      `Средняя задержка: ${avg.toFixed(0)} мс, p95: ${p95.toFixed(0)} мс\n` +
      `Общее время: ${(wallMs / 1000).toFixed(1)} с, RPS: ${rps.toFixed(1)}\n` +
      `Цель: ${url}`,
  };
}
