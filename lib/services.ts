import { type RegionConfig } from '@/hub.config';

export const SERVICES = [
  { name: 'Ant Control', slug: 'ant-control', icon: '🐜' },
  { name: 'Termite Treatment', slug: 'termite-treatment', icon: '🪵' },
  { name: 'Bed Bug Removal', slug: 'bed-bug-removal', icon: '🛏️' },
  { name: 'Rodent Control', slug: 'rodent-control', icon: '🐀' },
  { name: 'Cockroach Control', slug: 'cockroach-control', icon: '🪳' },
  { name: 'Mosquito Control', slug: 'mosquito-control', icon: '🦟' },
  { name: 'Spider Control', slug: 'spider-control', icon: '🕷️' },
  { name: 'Wasp & Hornet Removal', slug: 'wasp-hornet-removal', icon: '🐝' },
  { name: 'Flea & Tick Treatment', slug: 'flea-tick-treatment', icon: '🦗' },
  { name: 'Wildlife Removal', slug: 'wildlife-removal', icon: '🦝' },
  { name: 'Commercial Pest Control', slug: 'commercial-pest-control', icon: '🏢' },
] as const;

export type Service = typeof SERVICES[number];

export function getServiceDescription(service: Service, region: RegionConfig): string {
  const area = region.shortName || region.name;
  const descriptions: Record<string, string> = {
    'ant-control': `Keep ants out of your kitchen and away from your family. Effective, family-friendly treatments for ${area} homes.`,
    'termite-treatment': 'Protect your biggest investment. Expert termite inspections and treatment to keep your home protected.',
    'bed-bug-removal': "Help your family sleep easy again. Thorough bed bug removal that's gentle on your home.",
    'rodent-control': "Mice and rats don't belong near your family. We remove them and seal entry points so they stay out.",
    'cockroach-control': 'A clean home deserves to stay that way. Complete cockroach elimination that protects your family.',
    'mosquito-control': 'Take back your backyard. Kid and pet-friendly mosquito treatments so your family can enjoy the outdoors.',
    'spider-control': 'No more surprises in the basement or garage. Thorough spider removal for your whole home.',
    'wasp-hornet-removal': "Protect your kids and pets from stinging insects. We'll remove nests from your yard, porch, and eaves.",
    'flea-tick-treatment': 'Protect your family and furry friends. Professional flea and tick control for your home and yard.',
    'wildlife-removal': 'Raccoons in the attic? Squirrels in the walls? Humane removal that protects your family.',
    'commercial-pest-control': `Customized pest management for local ${area} businesses. Discreet, reliable, and effective.`,
  };
  return descriptions[service.slug] ?? `Professional ${service.name.toLowerCase()} services for ${area} homes and businesses.`;
}
