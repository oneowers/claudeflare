import type { FallbackProps } from 'react-error-boundary';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <section className="container flex min-h-[60vh] items-center py-16">
      <div className="max-w-xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          {t('errorPage.title')}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t('errorPage.description')}
        </p>
        {error instanceof Error && (
          <p className="mt-4 rounded-md border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
            {error.message}
          </p>
        )}
        <Button type="button" onClick={resetErrorBoundary} className="mt-6">
          <RotateCcw className="h-4 w-4" />
          {t('common.tryAgain')}
        </Button>
      </div>
    </section>
  );
}
