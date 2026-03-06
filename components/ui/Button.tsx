import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-brand-primary text-white hover:bg-brand-secondary shadow-md hover:shadow-lg',
  secondary: 'bg-brand-secondary text-white hover:bg-brand-primary shadow-md',
  accent: 'bg-brand-accent text-white hover:bg-orange-600 shadow-md hover:shadow-lg',
  outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  ghost: 'text-brand-primary hover:bg-brand-light',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled = false,
  onClick,
  fullWidth = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
