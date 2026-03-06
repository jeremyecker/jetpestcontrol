import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, href, className, hover = true }: CardProps) {
  const classes = cn(
    'bg-white rounded-xl border border-gray-200 p-6',
    hover && 'transition-all duration-200 hover:shadow-lg hover:border-brand-primary/30 hover:-translate-y-0.5',
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block')}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
