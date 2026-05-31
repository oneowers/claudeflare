-- Portfolio logo (client/brand mark) shown in the public "partners" marquee.
-- Stored as a public URL in the existing `portfolio-images` bucket — no new
-- bucket or storage policy needed (0002_storage.sql already covers it).
-- RLS on public.portfolio stays enabled; this only adds a nullable column.

alter table public.portfolio
  add column if not exists logo_url text;
