import { z } from 'zod';

export const testTypeEnum = z.enum(['unit', 'load']);
export const testStatusEnum = z.enum(['passed', 'failed', 'in_progress', 'error']);

export const testReportSchema = z.object({
  title: z.string().min(2).max(200),
  project: z.string().max(120).optional().or(z.literal('')),
  type: testTypeEnum.default('unit'),
  status: testStatusEnum.default('in_progress'),
  total_tests: z.coerce.number().int().min(0).optional().or(z.literal('')),
  passed_tests: z.coerce.number().int().min(0).optional().or(z.literal('')),
  coverage_pct: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
  requests_per_sec: z.coerce.number().min(0).optional().or(z.literal('')),
  error_rate: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
  total_requests: z.coerce.number().int().min(0).optional().or(z.literal('')),
  duration_ms: z.coerce.number().int().min(0).optional().or(z.literal('')),
  notes: z.string().max(10_000).optional().or(z.literal('')),
  run_at: z.string().min(1),
});

export type TestReportFormValues = z.infer<typeof testReportSchema>;
