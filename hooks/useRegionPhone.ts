'use client';

import { usePathname } from 'next/navigation';
import { PHONE, PHONE_HREF, REGION_PHONES } from '@/site.config';

export function useRegionPhone() {
  const pathname = usePathname();
  // pathname like /suffolk/amityville or /queens/flushing
  const segment = pathname?.split('/')[1] ?? '';
  const match = REGION_PHONES[segment];
  return match ?? { display: PHONE, href: PHONE_HREF };
}
