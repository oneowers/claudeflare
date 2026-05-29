import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { RouteErrorBoundary } from '@/components/shared/RouteErrorBoundary';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import {
  LanguageBoundary,
  LanguageRedirect,
  LegacyPathRedirect,
} from '@/i18n/hooks';

const HomePage = lazy(() =>
  import('@/pages/public/HomePage').then((m) => ({ default: m.HomePage })),
);
const ServicesPage = lazy(() =>
  import('@/pages/public/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import('@/pages/public/ServiceDetailPage').then((m) => ({
    default: m.ServiceDetailPage,
  })),
);
const PortfolioPage = lazy(() =>
  import('@/pages/public/PortfolioPage').then((m) => ({
    default: m.PortfolioPage,
  })),
);
const PortfolioDetailPage = lazy(() =>
  import('@/pages/public/PortfolioDetailPage').then((m) => ({
    default: m.PortfolioDetailPage,
  })),
);
const AboutPage = lazy(() =>
  import('@/pages/public/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import('@/pages/public/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/public/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  })),
);

const LoginPage = lazy(() =>
  import('@/pages/admin/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import('@/pages/admin/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  })),
);
const ServicesListPage = lazy(() =>
  import('@/pages/admin/ServicesListPage').then((m) => ({
    default: m.ServicesListPage,
  })),
);
const ServiceFormPage = lazy(() =>
  import('@/pages/admin/ServiceFormPage').then((m) => ({
    default: m.ServiceFormPage,
  })),
);
const PortfolioListPage = lazy(() =>
  import('@/pages/admin/PortfolioListPage').then((m) => ({
    default: m.PortfolioListPage,
  })),
);
const PortfolioFormPage = lazy(() =>
  import('@/pages/admin/PortfolioFormPage').then((m) => ({
    default: m.PortfolioFormPage,
  })),
);
const LeadsPage = lazy(() =>
  import('@/pages/admin/LeadsPage').then((m) => ({ default: m.LeadsPage })),
);
const LeadDetailPage = lazy(() =>
  import('@/pages/admin/LeadDetailPage').then((m) => ({
    default: m.LeadDetailPage,
  })),
);
const CategoriesListPage = lazy(() =>
  import('@/pages/admin/CategoriesListPage').then((m) => ({
    default: m.CategoriesListPage,
  })),
);
const CategoryFormPage = lazy(() =>
  import('@/pages/admin/CategoryFormPage').then((m) => ({
    default: m.CategoryFormPage,
  })),
);
const TestReportsListPage = lazy(() =>
  import('@/pages/admin/TestReportsListPage').then((m) => ({
    default: m.TestReportsListPage,
  })),
);
const TestReportFormPage = lazy(() =>
  import('@/pages/admin/TestReportFormPage').then((m) => ({
    default: m.TestReportFormPage,
  })),
);
const SiteSettingsPage = lazy(() =>
  import('@/pages/admin/SiteSettingsPage').then((m) => ({
    default: m.SiteSettingsPage,
  })),
);
const PartnersListPage = lazy(() =>
  import('@/pages/admin/PartnersListPage').then((m) => ({
    default: m.PartnersListPage,
  })),
);
const PartnerFormPage = lazy(() =>
  import('@/pages/admin/PartnerFormPage').then((m) => ({
    default: m.PartnerFormPage,
  })),
);

export const router = createBrowserRouter([
  { path: '/', element: <LanguageRedirect /> },
  {
    path: '/:lang',
    element: <LanguageBoundary />,
    children: [
      {
        element: (
          <RouteErrorBoundary>
            <PublicLayout />
          </RouteErrorBoundary>
        ),
        children: [
          { index: true, element: <HomePage /> },
          { path: 'services', element: <ServicesPage /> },
          { path: 'services/:slug', element: <ServiceDetailPage /> },
          { path: 'portfolio', element: <PortfolioPage /> },
          { path: 'portfolio/:slug', element: <PortfolioDetailPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: 'contact', element: <ContactPage /> },
        ],
      },
      {
        path: 'admin/login',
        element: (
          <RouteErrorBoundary>
            <Suspense fallback={<PageSkeleton className="container" />}>
              <LoginPage />
            </Suspense>
          </RouteErrorBoundary>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'admin',
            element: (
              <RouteErrorBoundary>
                <AdminLayout />
              </RouteErrorBoundary>
            ),
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'services', element: <ServicesListPage /> },
              { path: 'services/new', element: <ServiceFormPage /> },
              { path: 'services/:id/edit', element: <ServiceFormPage /> },
              { path: 'portfolio', element: <PortfolioListPage /> },
              { path: 'portfolio/new', element: <PortfolioFormPage /> },
              { path: 'portfolio/:id/edit', element: <PortfolioFormPage /> },
              { path: 'leads', element: <LeadsPage /> },
              { path: 'leads/:id', element: <LeadDetailPage /> },
              { path: 'categories', element: <CategoriesListPage /> },
              { path: 'categories/new', element: <CategoryFormPage /> },
              { path: 'categories/:id/edit', element: <CategoryFormPage /> },
              { path: 'test-reports', element: <TestReportsListPage /> },
              { path: 'test-reports/new', element: <TestReportFormPage /> },
              { path: 'test-reports/:id/edit', element: <TestReportFormPage /> },
              { path: 'partners', element: <PartnersListPage /> },
              { path: 'partners/new', element: <PartnerFormPage /> },
              { path: 'partners/:id/edit', element: <PartnerFormPage /> },
              { path: 'settings', element: <SiteSettingsPage /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: (
          <RouteErrorBoundary>
            <Suspense fallback={<PageSkeleton className="container" />}>
              <NotFoundPage />
            </Suspense>
          </RouteErrorBoundary>
        ),
      },
    ],
  },
  { path: '*', element: <LegacyPathRedirect /> },
]);
