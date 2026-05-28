import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background">
        <div className="container max-w-6xl py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
