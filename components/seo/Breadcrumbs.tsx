import Link from 'next/link';
import { SITE_NAME } from '@/site.config';
import { breadcrumbSchema } from '@/lib/seo';
import Schema from './Schema';
import type { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <Schema data={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            {allItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">/</span>}
                {item.href && index < allItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-brand-dark font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
