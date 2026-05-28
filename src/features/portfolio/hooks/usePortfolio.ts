import { useQuery } from '@tanstack/react-query';
import {
  getPortfolioById,
  getPortfolioBySlug,
  listPortfolio,
} from '../api';
import { portfolioKeys } from '../queryKeys';

export function usePortfolio(publishedOnly = false) {
  return useQuery({
    queryKey: portfolioKeys.list({ publishedOnly }),
    queryFn: () => listPortfolio({ publishedOnly }),
  });
}

export function usePortfolioBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: portfolioKeys.detail(slug ?? ''),
    queryFn: () => getPortfolioBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function usePortfolioById(id: string | undefined) {
  return useQuery({
    queryKey: portfolioKeys.detail(id ?? ''),
    queryFn: () => getPortfolioById(id!),
    enabled: Boolean(id),
  });
}
