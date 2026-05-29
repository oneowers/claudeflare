import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { PAYMENT_LABELS, type PaymentMethod } from '../constants';

/**
 * Payment-system badges. Each renders on a light card so brand colours stay
 * legible in both light and dark themes. Marks are simplified, recognisable
 * renditions — not pixel-perfect trademarks.
 */

const FRAME = 'h-7 w-[42px] shrink-0 rounded-[5px] ring-1 ring-black/10';

function Card({
  children,
  bg = '#ffffff',
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <span
      className={cn(FRAME, 'flex items-center justify-center overflow-hidden')}
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

const marks: Record<PaymentMethod, ReactNode> = {
  visa: (
    <Card>
      <svg viewBox="0 0 42 16" className="h-3.5">
        <text
          x="21"
          y="13"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="14"
          letterSpacing="0.5"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>
    </Card>
  ),
  mastercard: (
    <Card>
      <svg viewBox="0 0 42 26" className="h-5">
        <circle cx="17" cy="13" r="8" fill="#EB001B" />
        <circle cx="25" cy="13" r="8" fill="#F79E1B" />
        <path d="M21 7a8 8 0 0 1 0 12 8 8 0 0 1 0-12z" fill="#FF5F00" />
      </svg>
    </Card>
  ),
  mir: (
    <Card>
      <svg viewBox="0 0 42 16" className="h-3">
        <text
          x="21"
          y="13"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="13"
          fill="#0F754E"
        >
          МИР
        </text>
      </svg>
    </Card>
  ),
  paypal: (
    <Card>
      <svg viewBox="0 0 56 16" className="h-3">
        <text x="0" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#003087">
          Pay
        </text>
        <text x="26" y="13" fontFamily="Arial, sans-serif" fontWeight="800" fontStyle="italic" fontSize="14" fill="#009CDE">
          Pal
        </text>
      </svg>
    </Card>
  ),
  humo: (
    <Card>
      <svg viewBox="0 0 48 16" className="h-3">
        <text x="24" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#25A4DD">
          humo
        </text>
      </svg>
    </Card>
  ),
  uzcard: (
    <Card>
      <svg viewBox="0 0 52 16" className="h-2.5">
        <text x="26" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#1A6BB5">
          UZCARD
        </text>
      </svg>
    </Card>
  ),
  payme: (
    <Card bg="#0E2E4A">
      <svg viewBox="0 0 48 16" className="h-3">
        <text x="24" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#33E1C4">
          payme
        </text>
      </svg>
    </Card>
  ),
  click: (
    <Card>
      <svg viewBox="0 0 48 16" className="h-3">
        <text x="24" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#0095DA">
          Click
        </text>
      </svg>
    </Card>
  ),
};

export function PaymentIcon({ method }: { method: PaymentMethod }) {
  return (
    <span title={PAYMENT_LABELS[method]} aria-label={PAYMENT_LABELS[method]}>
      {marks[method]}
    </span>
  );
}
