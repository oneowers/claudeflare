import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { TrustedBy } from '@/features/partners/components/TrustedBy';
import { PageSkeleton } from '@/components/shared/PageSkeleton';
import { Seo } from '@/components/shared/Seo';

export function PublicLayout() {
  return (
    <div className="relative">
      {/* Scrolling content sits above the footer and slides up to reveal it */}
      <div className="relative z-10 flex min-h-screen flex-col bg-background">
        <Seo />
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageSkeleton className="container" />}>
            <Outlet />
          </Suspense>
        </main>
        <TrustedBy />
      </div>

      {/* Reveal footer: pinned to the viewport bottom, uncovered on scroll */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
