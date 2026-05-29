-- QA dashboard: test run history for unit and load tests.
-- Admin-only: no public RLS policy (internal tool).

-- =========================================================================
-- 1. Table
-- =========================================================================

create table if not exists public.test_reports (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  project       text,
  type          text not null default 'unit' check (type in ('unit', 'load')),
  status        text not null default 'in_progress' check (status in ('passed', 'failed', 'in_progress', 'error')),
  -- unit-test metrics
  total_tests   int,
  passed_tests  int,
  coverage_pct  numeric(5, 2),
  -- load-test metrics
  requests_per_sec numeric(10, 2),
  error_rate       numeric(5, 2),
  total_requests   int,
  -- shared
  duration_ms   int,
  notes         text,
  run_at        timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists test_reports_touch on public.test_reports;
create trigger test_reports_touch
  before update on public.test_reports
  for each row execute function public.touch_updated_at();

create index if not exists test_reports_type_idx  on public.test_reports(type, run_at desc);
create index if not exists test_reports_status_idx on public.test_reports(status, run_at desc);

-- =========================================================================
-- 2. RLS — admin-only, no anonymous access
-- =========================================================================

alter table public.test_reports enable row level security;

drop policy if exists "test_reports_admin_all" on public.test_reports;
create policy "test_reports_admin_all" on public.test_reports
  for all using (public.is_admin()) with check (public.is_admin());

-- =========================================================================
-- 3. Grants (default privileges from 0003 cover future tables, but be explicit)
-- =========================================================================

grant select, insert, update, delete on public.test_reports to authenticated;
