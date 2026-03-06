import { PHONE, PHONE_HREF, HOURS, GEO } from '@/site.config';

export default function TopBar() {
  return (
    <div className="bg-brand-dark text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <span className="hidden sm:inline">🏡 Locally Owned &amp; Serving {GEO.region} Families</span>
        <span className="sm:hidden text-xs">🏡 Serving {GEO.region} Families</span>
        <a
          href={PHONE_HREF}
          className="font-semibold hover:text-brand-accent transition-colors flex items-center gap-1"
        >
          <span>📞</span>
          <span>{PHONE}</span>
        </a>
      </div>
    </div>
  );
}
