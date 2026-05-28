import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useLead } from '@/features/leads/hooks/useLeads';
import { LeadDetail } from '@/features/leads/components/LeadDetail';
import { LocalizedLink, useLocalizedNavigate } from '@/i18n/hooks';

export function LeadDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const { data: lead, isLoading, error } = useLead(id);

  return (
    <div className="space-y-6">
      <LocalizedLink
        to="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('admin.leads.detail.backToAll')}
      </LocalizedLink>

      {isLoading && <div className="h-96 animate-pulse rounded-lg bg-muted/40" />}
      {error && (
        <p className="text-sm text-destructive">
          {t('admin.leads.detail.loadError')}
        </p>
      )}
      {lead && (
        <LeadDetail lead={lead} onDeleted={() => navigate('/admin/leads')} />
      )}
    </div>
  );
}
