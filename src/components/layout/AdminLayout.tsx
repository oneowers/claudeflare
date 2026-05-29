import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { Seo } from '@/components/shared/Seo';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Seo title="Admin" noIndex />
      <AdminSidebar />
      <main className="flex-1 bg-background">
        <div className="container max-w-6xl py-8">
          <Suspense fallback={<PageSkeleton className="py-0" />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
