import { supabase } from '@/lib/supabase';
import type { TestReport, TestType, TestStatus } from './types';
import type { TestReportFormValues } from './schemas';
import type { RunResult } from './runner/types';

type TestReportRow = {
  id: string;
  title: string;
  project: string | null;
  type: TestType;
  status: TestStatus;
  total_tests: number | null;
  passed_tests: number | null;
  coverage_pct: string | null;
  requests_per_sec: string | null;
  error_rate: string | null;
  total_requests: number | null;
  duration_ms: number | null;
  notes: string | null;
  run_at: string;
  created_at: string;
  updated_at: string;
};

function rowToReport(row: TestReportRow): TestReport {
  return {
    id: row.id,
    title: row.title,
    project: row.project,
    type: row.type,
    status: row.status,
    total_tests: row.total_tests,
    passed_tests: row.passed_tests,
    coverage_pct: row.coverage_pct != null ? Number(row.coverage_pct) : null,
    requests_per_sec: row.requests_per_sec != null ? Number(row.requests_per_sec) : null,
    error_rate: row.error_rate != null ? Number(row.error_rate) : null,
    total_requests: row.total_requests,
    duration_ms: row.duration_ms,
    notes: row.notes,
    run_at: row.run_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function toNullable(v: unknown): number | null {
  if (v === '' || v === undefined || v === null) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

function buildPayload(values: TestReportFormValues) {
  return {
    title: values.title.trim(),
    project: values.project?.trim() || null,
    type: values.type,
    status: values.status,
    total_tests: toNullable(values.total_tests),
    passed_tests: toNullable(values.passed_tests),
    coverage_pct: toNullable(values.coverage_pct),
    requests_per_sec: toNullable(values.requests_per_sec),
    error_rate: toNullable(values.error_rate),
    total_requests: toNullable(values.total_requests),
    duration_ms: toNullable(values.duration_ms),
    notes: values.notes?.trim() || null,
    run_at: values.run_at,
  };
}

export async function listTestReports({
  type,
  status,
}: { type?: string; status?: string } = {}): Promise<TestReport[]> {
  let q = supabase
    .from('test_reports')
    .select('*')
    .order('run_at', { ascending: false });
  if (type) q = q.eq('type', type);
  if (status) q = q.eq('status', status);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map((r) => rowToReport(r as TestReportRow));
}

export async function getTestReportById(id: string): Promise<TestReport> {
  const { data, error } = await supabase
    .from('test_reports')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return rowToReport(data as TestReportRow);
}

export async function createTestReport(
  values: TestReportFormValues,
): Promise<TestReport> {
  const { data, error } = await supabase
    .from('test_reports')
    .insert(buildPayload(values))
    .select()
    .single();
  if (error) throw error;
  return rowToReport(data as TestReportRow);
}

export async function updateTestReport(
  id: string,
  values: TestReportFormValues,
): Promise<TestReport> {
  const { data, error } = await supabase
    .from('test_reports')
    .update(buildPayload(values))
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToReport(data as TestReportRow);
}

/** Persist the outcome of an in-browser test run as a new report row. */
export async function saveRunResult(input: {
  title: string;
  project: string | null;
  type: TestType;
  result: RunResult;
}): Promise<TestReport> {
  const { result } = input;
  const payload = {
    title: input.title,
    project: input.project,
    type: input.type,
    status: result.status,
    total_tests: result.total_tests,
    passed_tests: result.passed_tests,
    coverage_pct: result.coverage_pct,
    requests_per_sec: result.requests_per_sec,
    error_rate: result.error_rate,
    total_requests: result.total_requests,
    duration_ms: result.duration_ms,
    notes: result.notes,
    run_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('test_reports')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return rowToReport(data as TestReportRow);
}

export async function deleteTestReport(id: string): Promise<void> {
  const { error } = await supabase.from('test_reports').delete().eq('id', id);
  if (error) throw error;
}
