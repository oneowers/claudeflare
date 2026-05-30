import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold ring-offset-background transition-all duration-200 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary CTA — violet capsule
        default:
          'bg-primary text-primary-foreground hover:bg-violet-deep hover:-translate-y-0.5',
        // Acid-lime accent (rare, high energy)
        lime: 'bg-lime text-black hover:-translate-y-0.5',
        // On light surfaces — dark capsule
        dark: 'bg-ink text-white hover:bg-ink/85 hover:-translate-y-0.5',
        // Secondary / outline on dark
        secondary:
          'border border-white/20 bg-transparent text-foreground hover:bg-white/[0.06]',
        outline:
          'border border-white/20 bg-transparent text-foreground hover:bg-white/[0.06]',
        ghost: 'text-foreground hover:bg-white/[0.06]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'rounded-none text-foreground underline-offset-4 hover:text-violet hover:underline',
      },
      size: {
        default: 'h-11 px-7 text-[15px]',
        sm: 'h-9 px-5 text-sm',
        lg: 'h-[52px] px-9 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
