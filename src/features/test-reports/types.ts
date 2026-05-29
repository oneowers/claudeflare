export type TestType = 'unit' | 'load';
export type TestStatus = 'passed' | 'failed' | 'in_progress' | 'error';

export interface TestReport {
  id: string;
  title: string;
  project: string | null;
  type: TestType;
  status: TestStatus;
  total_tests: number | null;
  passed_tests: number | null;
  coverage_pct: number | null;
  requests_per_sec: number | null;
  error_rate: number | null;
  total_requests: number | null;
  duration_ms: number | null;
  notes: string | null;
  run_at: string;
  created_at: string;
  updated_at: string;
}
