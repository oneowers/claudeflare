-- Storage buckets and policies.
-- Create buckets first in Dashboard or via:
--   insert into storage.buckets (id, name, public) values
--     ('service-images', 'service-images', true),
--     ('portfolio-images', 'portfolio-images', true)
--   on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values
  ('service-images', 'service-images', true),
  ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- service-images
drop policy if exists "service_images_public_read" on storage.objects;
create policy "service_images_public_read" on storage.objects
  for select using (bucket_id = 'service-images');

drop policy if exists "service_images_admin_insert" on storage.objects;
create policy "service_images_admin_insert" on storage.objects
  for insert with check (bucket_id = 'service-images' and public.is_admin());

drop policy if exists "service_images_admin_update" on storage.objects;
create policy "service_images_admin_update" on storage.objects
  for update using (bucket_id = 'service-images' and public.is_admin());

drop policy if exists "service_images_admin_delete" on storage.objects;
create policy "service_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'service-images' and public.is_admin());

-- portfolio-images
drop policy if exists "portfolio_images_public_read" on storage.objects;
create policy "portfolio_images_public_read" on storage.objects
  for select using (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_admin_insert" on storage.objects;
create policy "portfolio_images_admin_insert" on storage.objects
  for insert with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "portfolio_images_admin_update" on storage.objects;
create policy "portfolio_images_admin_update" on storage.objects
  for update using (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "portfolio_images_admin_delete" on storage.objects;
create policy "portfolio_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'portfolio-images' and public.is_admin());
