import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import {
  LanguageBoundary,
  LanguageRedirect,
  LegacyPathRedirect,
} from '@/i18n/hooks';

import { HomePage } from '@/pages/public/HomePage';
import { ServicesPage } from '@/pages/public/ServicesPage';
import { ServiceDetailPage } from '@/pages/public/ServiceDetailPage';
import { PortfolioPage } from '@/pages/public/PortfolioPage';
import { PortfolioDetailPage } from '@/pages/public/PortfolioDetailPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';

import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { ServicesListPage } from '@/pages/admin/ServicesListPage';
import { ServiceFormPage } from '@/pages/admin/ServiceFormPage';
import { PortfolioListPage } from '@/pages/admin/PortfolioListPage';
import { PortfolioFormPage } from '@/pages/admin/PortfolioFormPage';
import { LeadsPage } from '@/pages/admin/LeadsPage';
import { LeadDetailPage } from '@/pages/admin/LeadDetailPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

export const router = createBrowserRouter([
  { path: '/', element: <LanguageRedirect /> },
  {
    path: '/:lang',
    element: <LanguageBoundary />,
    children: [
      {
        element: <PublicLayout />,
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
      { path: 'admin/login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'admin',
            element: <AdminLayout />,
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
              { path: 'settings', element: <SettingsPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '*', element: <LegacyPathRedirect /> },
]);
