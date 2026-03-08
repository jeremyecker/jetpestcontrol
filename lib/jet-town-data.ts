// lib/jet-town-data.ts
// Region-differentiated FAQ sets and enriched content for Jet Pest Control town pages

export interface TownFAQ {
  q: string;
  a: string;
}

export const regionFAQs: Record<string, TownFAQ[]> = {
  brooklyn: [
    {
      q: 'How quickly can Jet Pest Control respond to a pest emergency in Brooklyn?',
      a: 'We offer same-day and next-day service throughout Brooklyn. For urgent bed bug, rodent, or cockroach issues, call (718) 710-0330 and we can typically dispatch a technician within hours. Brooklyn\'s dense housing means infestations spread fast — early response is critical.',
    },
    {
      q: 'Why are bed bugs such a persistent problem in Brooklyn apartments?',
      a: 'Brooklyn\'s mix of pre-war walkups, converted lofts, and high-turnover rentals makes bed bug transmission especially common. A single infested unit in a brownstone or co-op building can spread to neighboring apartments within weeks. Jet uses K-9 detection and heat treatments to eliminate infestations at the source.',
    },
    {
      q: 'Do you treat cockroach infestations in Brooklyn without harsh chemicals?',
      a: 'Yes. Jet Pest Control uses integrated pest management (IPM) protocols with low-toxicity gel baits, insect growth regulators, and targeted applications. All treatments are family-safe and pet-safe. German cockroaches are the most common species in Brooklyn apartments — we target harborage areas in kitchens and bathrooms.',
    },
    {
      q: 'Are your Brooklyn pest control services guaranteed?',
      a: 'Yes — all Jet treatments come with a service guarantee. If pests return between scheduled visits, we return at no additional charge. We\'re licensed by the New York State DEC and carry full liability insurance for every Brooklyn service call.',
    },
  ],
  queens: [
    {
      q: 'What pests are most common in Queens homes and apartments?',
      a: 'Queens sees high rates of rodent activity, German cockroaches, bed bugs, and ants. The borough\'s diverse housing stock — from attached row houses in Astoria to large apartment complexes in Flushing — provides plenty of entry points and harborage for pests year-round.',
    },
    {
      q: 'How does Jet handle rodent problems in Queens?',
      a: 'Our Queens rodent control includes a full inspection of entry points, tamper-resistant bait station placement, and exclusion sealing of gaps around pipes, foundation vents, and utility lines. We also provide sanitation recommendations to eliminate attractants. Follow-up visits confirm elimination.',
    },
    {
      q: 'Is same-day pest control available in Queens?',
      a: 'Yes. Jet Pest Control offers same-day service throughout Queens for urgent pest issues. Call (718) 710-0330 before noon and we can typically dispatch a licensed technician the same day. Weekend availability is also offered for most areas.',
    },
    {
      q: 'Do you service multi-family buildings and apartment complexes in Queens?',
      a: 'Absolutely. A significant portion of our Queens work is in multi-family housing, condos, and co-ops. We coordinate with building management to treat multiple units simultaneously when an infestation affects a shared structure, which is the only effective approach for building-wide pest problems.',
    },
  ],
  manhattan: [
    {
      q: 'How does Jet Pest Control handle bed bugs in Manhattan high-rise buildings?',
      a: 'Manhattan high-rises require a coordinated approach. Jet\'s bed bug protocol includes K-9 scent detection to identify affected units, heat treatment or targeted chemical treatment depending on severity, and encasement recommendations. We work discreetly with building management and handle HOA and co-op documentation requirements.',
    },
    {
      q: 'What is the typical response time for pest control in Manhattan?',
      a: 'Manhattan service calls are typically scheduled within 24-48 hours. For urgent situations — active rodent sightings, confirmed bed bug infestations, or large cockroach populations — call (718) 710-0330 for same-day availability. We understand Manhattan residents\' schedules and offer early morning and evening appointment windows.',
    },
    {
      q: 'Why are mice so difficult to eliminate in Manhattan apartments?',
      a: 'Manhattan\'s aging pre-war building stock, interconnected utility chases, and underground infrastructure give mice near-infinite pathways between units and floors. Jet\'s Manhattan rodent program addresses exclusion at the unit level, seals interior penetrations, and places bait stations in common areas with building management approval.',
    },
    {
      q: 'Is Jet licensed to provide pest control in New York City?',
      a: 'Yes. Jet Pest Control holds all required New York State Department of Environmental Conservation (DEC) pest control licenses. All technicians working in Manhattan are individually licensed and background-checked. We carry full commercial liability insurance and comply with NYC Housing Maintenance Code pest control requirements.',
    },
  ],
  nassau: [
    {
      q: 'What pest threats are most common in Nassau County homes?',
      a: 'Nassau County homeowners most frequently deal with rodents (especially as fall approaches), termites in older housing stock, carpenter ants, stinging insects (yellow jackets, wasps), mosquitoes near wetlands, and occasional bed bug introductions. The county\'s suburban density means pest pressure from neighbors\' properties is a real factor.',
    },
    {
      q: 'Do you offer termite inspections and treatment in Nassau County?',
      a: 'Yes. Jet provides WDO (wood-destroying organism) inspections and liquid termite treatments throughout Nassau County. Eastern subterranean termites are the primary species — they thrive in the soil conditions common across Nassau\'s suburban communities. We offer both conventional liquid barrier treatments and targeted spot treatments.',
    },
    {
      q: 'How does Jet handle mosquito control for Nassau County properties?',
      a: 'Our Nassau mosquito program includes barrier spray treatments applied to vegetation, shrubs, and lawn edges where mosquitoes rest. Treatments are scheduled every 3 weeks during peak season (May–October). We also identify and address standing water sources on the property. Treatments are safe for children and pets when dry.',
    },
    {
      q: 'Is same-day pest control available in Nassau County?',
      a: 'Same-day availability in Nassau County depends on scheduling, but we prioritize urgent calls. Call (718) 710-0330 for current same-day availability. Next-day service is available throughout Nassau County including Hempstead, Garden City, Levittown, Long Beach, and all surrounding communities.',
    },
  ],
  suffolk: [
    {
      q: 'What makes tick control especially important in Suffolk County?',
      a: 'Suffolk County consistently ranks among the highest counties in New York for Lyme disease cases, driven by the dense deer and white-footed mouse populations in wooded and suburban areas. Jet\'s tick control program uses barrier spray treatments along lawn edges, wood lines, and ornamental beds where ticks aggregate. Spring and fall treatments are the most critical timing.',
    },
    {
      q: 'Do you treat termites in Suffolk County?',
      a: 'Yes. Termite pressure is significant across Suffolk County, particularly in older housing stock and properties with wood-to-soil contact. Jet provides full WDO inspections, liquid barrier treatments, and targeted spot treatments for subterranean termites. We service all areas from Babylon and Islip to Brookhaven, Smithtown, and the East End.',
    },
    {
      q: 'How does Jet handle rodents in Suffolk County homes?',
      a: 'Suffolk County rodent problems often originate from wooded buffers and adjacent properties. Jet\'s program includes exterior exclusion, interior bait station placement, and recommendations for entry point sealing. Fall is the highest-risk season as mice and rats seek indoor harborage — scheduling a preventive inspection in September or October is strongly recommended.',
    },
    {
      q: 'Does Jet service the East End and Hamptons area of Suffolk County?',
      a: 'Yes. Jet Pest Control services all of Suffolk County including Smithtown, Hauppauge, Huntington, Bay Shore, Patchogue, Riverhead, and out to the East End including Southampton, East Hampton, and Montauk. Call (718) 710-0330 for scheduling across all Suffolk County communities.',
    },
  ],
};

export const regionServices: Record<string, { title: string; description: string; icon: string }[]> = {
  brooklyn: [
    { title: 'Bed Bug Elimination', description: 'K-9 detection, heat treatment, and chemical protocols for Brooklyn apartments, brownstones, and co-ops. Discreet service with HOA documentation available.', icon: '🛏️' },
    { title: 'Rodent Control', description: 'Full exclusion program for Brooklyn homes — seal entry points, tamper-resistant bait stations, and sanitation guidance to prevent re-entry.', icon: '🐀' },
    { title: 'Cockroach Extermination', description: 'Gel bait and IGR treatments targeting German cockroach infestations in Brooklyn kitchens, bathrooms, and shared building areas.', icon: '🪲' },
  ],
  queens: [
    { title: 'Rodent Control', description: 'Comprehensive mouse and rat programs for Queens row houses and apartment buildings — exclusion sealing, bait stations, and follow-up visits.', icon: '🐀' },
    { title: 'Cockroach Treatment', description: 'Fast-acting gel bait and IGR protocols for German cockroach infestations common in Queens multi-family housing.', icon: '🪲' },
    { title: 'Bed Bug Treatments', description: 'K-9 detection and heat or chemical treatment for bed bug infestations in Queens apartments, hotels, and multi-unit buildings.', icon: '🛏️' },
  ],
  manhattan: [
    { title: 'Bed Bug Removal', description: 'Discreet bed bug treatment for Manhattan apartments, co-ops, and condos. K-9 detection, heat treatment, full building coordination available.', icon: '🛏️' },
    { title: 'Rodent Exclusion', description: 'Mice and rat programs for Manhattan buildings — exclusion at unit level, bait stations in common areas, and building management coordination.', icon: '🐀' },
    { title: 'Cockroach Control', description: 'Low-disruption gel bait protocols for Manhattan apartment cockroach infestations. Safe for kitchens, bathrooms, and around food prep areas.', icon: '🪲' },
  ],
  nassau: [
    { title: 'Termite Inspection & Treatment', description: 'WDO inspections and liquid barrier termite treatments for Nassau County homes. Protect your investment from subterranean termite damage.', icon: '🪵' },
    { title: 'Rodent Control', description: 'Fall and winter rodent programs for Nassau County homes — exclusion sealing, bait stations, and follow-up monitoring throughout the season.', icon: '🐀' },
    { title: 'Mosquito & Tick Control', description: 'Seasonal barrier spray programs for Nassau County properties. Protect your yard from mosquitoes and disease-carrying ticks all season.', icon: '🦟' },
  ],
  suffolk: [
    { title: 'Tick Control', description: 'Barrier spray tick treatments for Suffolk County lawns and wooded edges. Reduce Lyme disease risk with spring and fall applications.', icon: '🕷️' },
    { title: 'Termite Treatment', description: 'Liquid termite barrier and spot treatments for Suffolk County homes. Full WDO inspections available for real estate transactions.', icon: '🪵' },
    { title: 'Rodent & Wildlife Control', description: 'Full exclusion rodent programs for Suffolk County homes, including fall entry-point sealing to prevent winter infestations.', icon: '🐀' },
  ],
};

// Helper: get 4 nearby towns from the same region, excluding the current town
export function getNearbyTowns(currentTown: string, allTowns: string[], count = 4): string[] {
  const idx = allTowns.findIndex(t => t === currentTown);
  if (idx === -1) return allTowns.slice(0, count);
  const nearby: string[] = [];
  const len = allTowns.length;
  for (let offset = 1; nearby.length < count && offset < len; offset++) {
    if (idx - offset >= 0) nearby.push(allTowns[idx - offset]);
    if (nearby.length < count && idx + offset < len) nearby.push(allTowns[idx + offset]);
  }
  return nearby.slice(0, count);
}
