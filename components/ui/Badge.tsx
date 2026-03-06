import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'gray';
  className?: string;
}

const variants = {
  primary: 'bg-brand-light text-brand-primary',
  secondary: 'bg-green-100 text-brand-secondary',
  accent: 'bg-orange-100 text-brand-accent',
  gray: 'bg-gray-100 text-gray-700',
};

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
