import type { TestStatus } from '../types';

export interface RunProgress {
  /** 0..1 completion ratio. */
  ratio: number;
  /** Human-readable current step (already translated upstream or a raw label). */
  label: string;
}

/** Normalised result of a run, ready to be persisted as a test_reports row. */
export interface RunResult {
  status: TestStatus;
  total_tests: number | null;
  passed_tests: number | null;
  coverage_pct: number | null;
  requests_per_sec: number | null;
  error_rate: number | null;
  total_requests: number | null;
  duration_ms: number;
  notes: string | null;
}
