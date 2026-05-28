import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import type { Lead } from '../types';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LocalizedLink, useCurrentLanguage } from '@/i18n/hooks';

interface LeadsTableProps {
  leads: Lead[];
}

const LANG_TO_LOCALE: Record<string, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  uz: 'uz-UZ',
};

export function LeadsTable({ leads }: LeadsTableProps) {
  const { t } = useTranslation();
  const lang = useCurrentLanguage();
  const dateFmt = new Intl.DateTimeFormat(LANG_TO_LOCALE[lang] ?? 'en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/60 p-12 text-center text-sm text-muted-foreground">
        {t('admin.leads.empty')}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{t('admin.leads.table.from')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.leads.table.message')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.leads.table.status')}</th>
            <th className="px-4 py-3 font-medium">{t('admin.leads.table.when')}</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {leads.map((lead) => (
            <tr key={lead.id} className="bg-background">
              <td className="px-4 py-3">
                <div className="font-medium">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.email}</div>
              </td>
              <td className="max-w-md px-4 py-3 text-muted-foreground">
                <p className="line-clamp-2">{lead.message}</p>
              </td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {dateFmt.format(new Date(lead.created_at))}
              </td>
              <td className="px-4 py-3 text-right">
                <LocalizedLink
                  to={`/admin/leads/${lead.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {t('admin.leads.table.open')}
                  <ArrowRight className="h-4 w-4" />
                </LocalizedLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
