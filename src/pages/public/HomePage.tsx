import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useServices } from '@/features/services/hooks/useServices';
import { usePortfolio } from '@/features/portfolio/hooks/usePortfolio';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { PortfolioCard } from '@/features/portfolio/components/PortfolioCard';

export function HomePage() {
  const services = useServices(true);
  const portfolio = usePortfolio(true);

  return (
    <>
      <section className="container py-24 md:py-32">
        <p className="text-sm font-medium text-muted-foreground">
          Студия веб-разработки
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Делаем сайты, которые работают на цели бизнеса.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          От лендинга до сложного веб-приложения. Дизайн, разработка,
          поддержка — в одной команде.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Обсудить проект
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex h-12 items-center rounded-md border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent"
          >
            Смотреть работы
          </Link>
        </div>
      </section>

      <section className="container border-t border-border/60 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Услуги</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Что мы делаем
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Все услуги →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(services.data ?? []).slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {services.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-lg border border-border/60 bg-muted/40"
              />
            ))}
        </div>
      </section>

      <section className="container border-t border-border/60 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Кейсы</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Недавние работы
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Всё портфолио →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(portfolio.data ?? []).slice(0, 3).map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
          {portfolio.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-muted/40" />
            ))}
        </div>
      </section>

      <section className="container border-t border-border/60 py-20">
        <div className="rounded-lg bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Готовы начать проект?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
            Опишите задачу — пришлём предварительную оценку и план.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
          >
            Написать
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
