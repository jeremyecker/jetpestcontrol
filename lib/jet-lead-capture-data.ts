// lib/jet-lead-capture-data.ts
// Lead capture page data: 5 regions x 6 intents = 30 pages

export interface LeadCapturePage {
  region: string;
  regionDisplay: string;
  leadType: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  services: string[];
  faqs: { q: string; a: string }[];
}

export const leadCapturePages: LeadCapturePage[] = [
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'pest-control-near-me',
    title: 'Pest Control Near Me',
    metaTitle: `Pest Control Near Me Brooklyn | Same-Day Service`,
    metaDesc: `Looking for pest control near you in Brooklyn? Jet Pest Control offers same-day service, licensed technicians, and guaranteed results. Call (800) 990-9296.`,
    h1: `Pest Control Near Me in Brooklyn`,
    intro: `When you search for pest control near you in Brooklyn, you need a company that actually shows up — same day, with the right solution. Jet Pest Control has served Brooklyn and the surrounding area for years, handling everything from cockroaches and rodents to bed bugs and termites in brownstones, pre-war apartment buildings, converted loft spaces, and densely packed row houses.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

Our licensed and insured technicians know Brooklyn's specific pest pressures intimately: German cockroaches thrive in the borough's older building stock, bed bugs spread easily through multi-unit housing, rats are active along subway corridors, and mice infiltrate through aging foundation gaps. We don't send generalists — we send specialists who understand the local building stock, seasonal patterns, and the pests that exploit both.`,
    services: ["Cockroach Extermination", "Rodent Control", "Bed Bug Treatment", "Termite Inspection", "Ant Control", "General Pest Control"],
    faqs: [
      { q: `How fast can Jet Pest Control respond in Brooklyn?`, a: `We offer same-day service throughout Brooklyn. When you call before noon, a licensed technician can typically arrive the same afternoon. Emergency appointments are also available.` },
      { q: `Do you service all neighborhoods in Brooklyn?`, a: `Yes — Jet Pest Control covers every neighborhood in Brooklyn including Prospect Park, the Brooklyn Bridge, Coney Island, and Williamsburg's dense residential corridors. No area is too remote or too dense for our team.` },
      { q: `Are your treatments approved for use around children and pets?`, a: `Absolutely. We use EPA-registered products applied by licensed technicians following strict safety protocols. We provide detailed prep instructions before treatment and guidance on when it's clear to re-enter.` },
      { q: `What is included in a pest control service call?`, a: `Every service includes a full inspection, targeted treatment, a written report, and a follow-up guarantee. If pests return within the treatment period, we come back at no charge.` },
    ],
  },
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'exterminator-near-me',
    title: 'Exterminator Near Me',
    metaTitle: `Exterminator Near Me Brooklyn | Licensed and Insured`,
    metaDesc: `Need an exterminator near you in Brooklyn? Jet Pest Control is licensed, insured, and ready for same-day service. Call (800) 990-9296 now.`,
    h1: `Exterminator Near Me in Brooklyn`,
    intro: `Searching for an exterminator near you in Brooklyn? The quality of your exterminator matters more than most people realize — the wrong approach just pushes pests deeper into the structure without eliminating them. Jet Pest Control's licensed technicians identify the root cause of every infestation before treatment, delivering lasting results in brownstones, pre-war apartment buildings, converted loft spaces, and densely packed row houses.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

We handle Brooklyn's full range of pest problems: German cockroaches thrive in the borough's older building stock, bed bugs spread easily through multi-unit housing, rats are active along subway corridors, and mice infiltrate through aging foundation gaps. Every job is backed by our service guarantee — if pests return, so do we.`,
    services: ["Cockroach Extermination", "Rodent Extermination", "Bed Bug Extermination", "Termite Treatment", "Ant and Stinging Insect Control", "Flea and Tick Treatment"],
    faqs: [
      { q: `What makes Jet different from other exterminators in Brooklyn?`, a: `Our technicians are licensed by the New York State DEC and trained specifically in urban and suburban pest patterns across Brooklyn. We use integrated pest management — identifying entry points and conditions alongside targeted treatment.` },
      { q: `Do exterminators need to inspect before treating?`, a: `Yes — a proper inspection is non-negotiable. We identify the pest species, assess infestation severity, locate entry points, and choose the right treatment method. Skipping this step leads to failed treatments.` },
      { q: `How long does exterminator treatment take?`, a: `Most standard treatments take 45 to 90 minutes depending on the size of the unit or home and the pest involved. We will give you a time estimate when you book.` },
      { q: `Are follow-up visits included?`, a: `Yes. Our service guarantee means if the infestation persists after treatment within the covered period, we return and retreat at no additional charge.` },
    ],
  },
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'emergency-pest-control',
    title: 'Emergency Pest Control',
    metaTitle: `Emergency Pest Control Brooklyn | Same-Day Urgent Response`,
    metaDesc: `Emergency pest control in Brooklyn. Same-day response for severe infestations, bed bugs, rodents, and more. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Emergency Pest Control in Brooklyn`,
    intro: `A pest emergency in Brooklyn cannot wait. Whether you've discovered bed bugs before guests arrive, a rat in the kitchen, a wasp nest near a doorway, or a cockroach infestation that appeared overnight — Jet Pest Control offers emergency same-day response throughout Brooklyn.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

Pest emergencies are stressful and often escalate quickly in brownstones, pre-war apartment buildings, converted loft spaces, and densely packed row houses. Our emergency response team is equipped to handle high-priority situations immediately: German cockroaches thrive in the borough's older building stock, bed bugs spread easily through multi-unit housing, rats are active along subway corridors, and mice infiltrate through aging foundation gaps. One call gets you a licensed technician on-site the same day.`,
    services: ["Emergency Bed Bug Treatment", "Emergency Rodent Control", "Emergency Cockroach Extermination", "Wasp and Hornet Nest Removal", "Emergency Termite Treatment", "Same-Day Flea Treatment"],
    faqs: [
      { q: `How fast is your emergency response in Brooklyn?`, a: `For emergency calls received before 2 PM, we typically have a technician on-site the same day in Brooklyn. Call us and we will do everything possible to respond immediately.` },
      { q: `What qualifies as a pest emergency?`, a: `Any infestation causing immediate health, safety, or quality-of-life concerns: bed bugs before guests arrive, rats in living spaces or kitchens, aggressive stinging insect nests near entry points, or severe cockroach infestations in food prep areas.` },
      { q: `Do emergency pest control services cost more?`, a: `Same-day service is available at our standard rates. We do not charge surge pricing for urgency — the same licensed technicians, the same professional service, just faster.` },
      { q: `What should I do while waiting for emergency pest control?`, a: `For rodents: seal food in hard containers and block visible entry points with steel wool. For bed bugs: do not move mattresses or furniture between rooms. For wasps: avoid the area. We will give you specific guidance when you call.` },
    ],
  },
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'same-day-pest-control',
    title: 'Same Day Pest Control',
    metaTitle: `Same Day Pest Control Brooklyn | Book Today, Service Today`,
    metaDesc: `Same-day pest control in Brooklyn. Call Jet Pest Control at (800) 990-9296 before noon for afternoon service. Licensed, insured, guaranteed.`,
    h1: `Same Day Pest Control in Brooklyn`,
    intro: `Same-day pest control in Brooklyn is Jet's signature service. Call before noon and a licensed technician arrives the same afternoon — no waiting days for an appointment while an infestation spreads through your home or building.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

Same-day service matters most in Brooklyn's densely housed communities. German cockroaches thrive in the borough's older building stock, bed bugs spread easily through multi-unit housing, rats are active along subway corridors, and mice infiltrate through aging foundation gaps. In multi-unit housing especially, delays mean wider spread — to neighboring units, shared walls, and common areas. Fast response is the only responsible approach.`,
    services: ["Same-Day Cockroach Treatment", "Same-Day Rodent Control", "Same-Day Bed Bug Treatment", "Same-Day Ant Control", "Same-Day Flea and Tick Treatment", "Same-Day General Pest Service"],
    faqs: [
      { q: `What is the cutoff time to book same-day pest control in Brooklyn?`, a: `Call us before noon and we will have a technician at your property the same afternoon in most cases throughout Brooklyn. For some areas, later bookings may still be accommodated.` },
      { q: `Does same-day service mean a rushed job?`, a: `Not at all. Our same-day technicians follow the same thorough inspection and treatment protocols as any scheduled appointment. Speed of response does not mean cutting corners.` },
      { q: `What pests can be treated same day?`, a: `Most common pests: cockroaches, rodents, bed bugs, ants, fleas, silverfish, and stinging insects. Some treatments like heat treatment for large spaces may require scheduling a specific window.` },
      { q: `Is same-day pest control available on weekends?`, a: `Yes — Jet Pest Control offers same-day service 7 days a week throughout Brooklyn. Pests do not take weekends off, and neither do we.` },
    ],
  },
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'bed-bug-exterminator',
    title: 'Bed Bug Exterminator',
    metaTitle: `Bed Bug Exterminator Brooklyn | Heat Treatment + Chemical`,
    metaDesc: `Bed bug exterminator in Brooklyn. Heat treatment, chemical treatment, and K-9 detection available. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Bed Bug Exterminator in Brooklyn`,
    intro: `Bed bugs in Brooklyn require specialized treatment — not the generic pest spray that works for cockroaches. Jet Pest Control's bed bug division uses heat treatment, targeted chemical protocols, and K-9 detection to eliminate infestations at every stage of the life cycle, including eggs.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

Bed bugs are a persistent challenge in Brooklyn's brownstones, pre-war apartment buildings, converted loft spaces, and densely packed row houses. They travel between units through wall voids, electrical outlets, and shared hallways — meaning a single untreated unit becomes a recurring source of reinfestation for an entire building. Professional bed bug extermination is the only effective solution in this environment.`,
    services: ["K-9 Bed Bug Detection", "Heat Treatment", "Chemical Bed Bug Treatment", "Mattress Encasements", "Multi-Unit Bed Bug Programs", "Post-Treatment Inspection"],
    faqs: [
      { q: `What bed bug treatment methods does Jet use in Brooklyn?`, a: `We offer heat treatment raising room temperature to 120 degrees or higher to kill all life stages, targeted chemical treatment using residual insecticides, and combination protocols for severe infestations. K-9 detection is available for accurate verification.` },
      { q: `How long does bed bug heat treatment take?`, a: `A standard apartment heat treatment takes 6 to 8 hours. Larger units or whole-floor treatments may require a full day. You can return the same evening once temperatures normalize.` },
      { q: `Do I need to throw away my mattress?`, a: `Usually not. We treat mattresses in place using heat or approved residual products, and provide encasements to protect them. Discarding a mattress without treating the room is ineffective — bed bugs live in walls, baseboards, and furniture, not just mattresses.` },
      { q: `How do I know if bed bug treatment worked?`, a: `We provide a post-treatment inspection to confirm elimination. No live activity after 2 weeks is a strong indicator of success. Our service guarantee means we return if activity continues.` },
    ],
  },
  {
    region: 'brooklyn',
    regionDisplay: 'Brooklyn',
    leadType: 'free-pest-inspection',
    title: 'Free Pest Inspection',
    metaTitle: `Free Pest Inspection Brooklyn | No-Cost Assessment`,
    metaDesc: `Free pest inspection in Brooklyn. Jet Pest Control offers no-cost inspections to identify infestations, entry points, and risk factors. Call (800) 990-9296.`,
    h1: `Free Pest Inspection in Brooklyn`,
    intro: `Not sure if you have a pest problem — or how serious it is? Jet Pest Control offers free pest inspections throughout Brooklyn. A licensed technician will assess your property, identify any active infestations, locate entry points, and give you a clear picture of what you're dealing with — at no cost and no obligation.

Brooklyn's 2.7 million residents live in some of New York City's oldest housing stock — conditions that make professional pest control essential, not optional.

A free inspection is the right starting point for any pest concern. In Brooklyn's brownstones, pre-war apartment buildings, converted loft spaces, and densely packed row houses, pest problems are often more extensive than they appear — what looks like a single mouse might be a colony using multiple entry points, and what seems like one cockroach is rarely alone.`,
    services: ["Full Property Inspection", "Entry Point Assessment", "Pest Identification", "Treatment Recommendation", "Prevention Consultation", "Written Inspection Report"],
    faqs: [
      { q: `What does a free pest inspection include?`, a: `A licensed Jet technician will inspect your home top to bottom: checking common entry points, looking for evidence of infestation, identifying the pest species, and assessing severity. You receive a full written report — no charge, no obligation.` },
      { q: `How long does a free pest inspection take?`, a: `A standard inspection for a home or apartment takes 30 to 45 minutes. Larger properties may take longer. We will give you a time estimate when you book.` },
      { q: `Will I be pressured to buy a treatment after the inspection?`, a: `No. Our inspections are genuinely free — if we find a problem and you want us to treat it, we will give you a transparent quote. If you want to think it over, that is completely fine. We want to earn your business, not pressure you into it.` },
      { q: `When should I get a free pest inspection?`, a: `Any time you are concerned: if you have seen a pest, noticed droppings or damage, moved into a new home, or just want peace of mind. Annual inspections are a good preventive practice in Brooklyn's older housing stock.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'pest-control-near-me',
    title: 'Pest Control Near Me',
    metaTitle: `Pest Control Near Me Queens | Same-Day Service`,
    metaDesc: `Looking for pest control near you in Queens? Jet Pest Control offers same-day service, licensed technicians, and guaranteed results. Call (800) 990-9296.`,
    h1: `Pest Control Near Me in Queens`,
    intro: `When you search for pest control near you in Queens, you need a company that actually shows up — same day, with the right solution. Jet Pest Control has served Queens and the surrounding area for years, handling everything from cockroaches and rodents to bed bugs and termites in attached homes, two-family houses, garden apartments, and dense urban neighborhoods transitioning to suburban-style streets.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

Our licensed and insured technicians know Queens's specific pest pressures intimately: rodents are common near the borough's busy commercial corridors and transit hubs, cockroaches thrive in older multi-unit housing, and bed bugs spread through high-density neighborhoods like Flushing and Jamaica. We don't send generalists — we send specialists who understand the local building stock, seasonal patterns, and the pests that exploit both.`,
    services: ["Cockroach Extermination", "Rodent Control", "Bed Bug Treatment", "Termite Inspection", "Ant Control", "General Pest Control"],
    faqs: [
      { q: `How fast can Jet Pest Control respond in Queens?`, a: `We offer same-day service throughout Queens. When you call before noon, a licensed technician can typically arrive the same afternoon. Emergency appointments are also available.` },
      { q: `Do you service all neighborhoods in Queens?`, a: `Yes — Jet Pest Control covers every neighborhood in Queens including JFK Airport, Flushing Meadows, Jamaica, Astoria, and Forest Hills. No area is too remote or too dense for our team.` },
      { q: `Are your treatments approved for use around children and pets?`, a: `Absolutely. We use EPA-registered products applied by licensed technicians following strict safety protocols. We provide detailed prep instructions before treatment and guidance on when it's clear to re-enter.` },
      { q: `What is included in a pest control service call?`, a: `Every service includes a full inspection, targeted treatment, a written report, and a follow-up guarantee. If pests return within the treatment period, we come back at no charge.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'exterminator-near-me',
    title: 'Exterminator Near Me',
    metaTitle: `Exterminator Near Me Queens | Licensed and Insured`,
    metaDesc: `Need an exterminator near you in Queens? Jet Pest Control is licensed, insured, and ready for same-day service. Call (800) 990-9296 now.`,
    h1: `Exterminator Near Me in Queens`,
    intro: `Searching for an exterminator near you in Queens? The quality of your exterminator matters more than most people realize — the wrong approach just pushes pests deeper into the structure without eliminating them. Jet Pest Control's licensed technicians identify the root cause of every infestation before treatment, delivering lasting results in attached homes, two-family houses, garden apartments, and dense urban neighborhoods transitioning to suburban-style streets.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

We handle Queens's full range of pest problems: rodents are common near the borough's busy commercial corridors and transit hubs, cockroaches thrive in older multi-unit housing, and bed bugs spread through high-density neighborhoods like Flushing and Jamaica. Every job is backed by our service guarantee — if pests return, so do we.`,
    services: ["Cockroach Extermination", "Rodent Extermination", "Bed Bug Extermination", "Termite Treatment", "Ant and Stinging Insect Control", "Flea and Tick Treatment"],
    faqs: [
      { q: `What makes Jet different from other exterminators in Queens?`, a: `Our technicians are licensed by the New York State DEC and trained specifically in urban and suburban pest patterns across Queens. We use integrated pest management — identifying entry points and conditions alongside targeted treatment.` },
      { q: `Do exterminators need to inspect before treating?`, a: `Yes — a proper inspection is non-negotiable. We identify the pest species, assess infestation severity, locate entry points, and choose the right treatment method. Skipping this step leads to failed treatments.` },
      { q: `How long does exterminator treatment take?`, a: `Most standard treatments take 45 to 90 minutes depending on the size of the unit or home and the pest involved. We will give you a time estimate when you book.` },
      { q: `Are follow-up visits included?`, a: `Yes. Our service guarantee means if the infestation persists after treatment within the covered period, we return and retreat at no additional charge.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'emergency-pest-control',
    title: 'Emergency Pest Control',
    metaTitle: `Emergency Pest Control Queens | Same-Day Urgent Response`,
    metaDesc: `Emergency pest control in Queens. Same-day response for severe infestations, bed bugs, rodents, and more. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Emergency Pest Control in Queens`,
    intro: `A pest emergency in Queens cannot wait. Whether you've discovered bed bugs before guests arrive, a rat in the kitchen, a wasp nest near a doorway, or a cockroach infestation that appeared overnight — Jet Pest Control offers emergency same-day response throughout Queens.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

Pest emergencies are stressful and often escalate quickly in attached homes, two-family houses, garden apartments, and dense urban neighborhoods transitioning to suburban-style streets. Our emergency response team is equipped to handle high-priority situations immediately: rodents are common near the borough's busy commercial corridors and transit hubs, cockroaches thrive in older multi-unit housing, and bed bugs spread through high-density neighborhoods like Flushing and Jamaica. One call gets you a licensed technician on-site the same day.`,
    services: ["Emergency Bed Bug Treatment", "Emergency Rodent Control", "Emergency Cockroach Extermination", "Wasp and Hornet Nest Removal", "Emergency Termite Treatment", "Same-Day Flea Treatment"],
    faqs: [
      { q: `How fast is your emergency response in Queens?`, a: `For emergency calls received before 2 PM, we typically have a technician on-site the same day in Queens. Call us and we will do everything possible to respond immediately.` },
      { q: `What qualifies as a pest emergency?`, a: `Any infestation causing immediate health, safety, or quality-of-life concerns: bed bugs before guests arrive, rats in living spaces or kitchens, aggressive stinging insect nests near entry points, or severe cockroach infestations in food prep areas.` },
      { q: `Do emergency pest control services cost more?`, a: `Same-day service is available at our standard rates. We do not charge surge pricing for urgency — the same licensed technicians, the same professional service, just faster.` },
      { q: `What should I do while waiting for emergency pest control?`, a: `For rodents: seal food in hard containers and block visible entry points with steel wool. For bed bugs: do not move mattresses or furniture between rooms. For wasps: avoid the area. We will give you specific guidance when you call.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'same-day-pest-control',
    title: 'Same Day Pest Control',
    metaTitle: `Same Day Pest Control Queens | Book Today, Service Today`,
    metaDesc: `Same-day pest control in Queens. Call Jet Pest Control at (800) 990-9296 before noon for afternoon service. Licensed, insured, guaranteed.`,
    h1: `Same Day Pest Control in Queens`,
    intro: `Same-day pest control in Queens is Jet's signature service. Call before noon and a licensed technician arrives the same afternoon — no waiting days for an appointment while an infestation spreads through your home or building.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

Same-day service matters most in Queens's densely housed communities. Rodents are common near the borough's busy commercial corridors and transit hubs, cockroaches thrive in older multi-unit housing, and bed bugs spread through high-density neighborhoods like Flushing and Jamaica. In multi-unit housing especially, delays mean wider spread — to neighboring units, shared walls, and common areas. Fast response is the only responsible approach.`,
    services: ["Same-Day Cockroach Treatment", "Same-Day Rodent Control", "Same-Day Bed Bug Treatment", "Same-Day Ant Control", "Same-Day Flea and Tick Treatment", "Same-Day General Pest Service"],
    faqs: [
      { q: `What is the cutoff time to book same-day pest control in Queens?`, a: `Call us before noon and we will have a technician at your property the same afternoon in most cases throughout Queens. For some areas, later bookings may still be accommodated.` },
      { q: `Does same-day service mean a rushed job?`, a: `Not at all. Our same-day technicians follow the same thorough inspection and treatment protocols as any scheduled appointment. Speed of response does not mean cutting corners.` },
      { q: `What pests can be treated same day?`, a: `Most common pests: cockroaches, rodents, bed bugs, ants, fleas, silverfish, and stinging insects. Some treatments like heat treatment for large spaces may require scheduling a specific window.` },
      { q: `Is same-day pest control available on weekends?`, a: `Yes — Jet Pest Control offers same-day service 7 days a week throughout Queens. Pests do not take weekends off, and neither do we.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'bed-bug-exterminator',
    title: 'Bed Bug Exterminator',
    metaTitle: `Bed Bug Exterminator Queens | Heat Treatment + Chemical`,
    metaDesc: `Bed bug exterminator in Queens. Heat treatment, chemical treatment, and K-9 detection available. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Bed Bug Exterminator in Queens`,
    intro: `Bed bugs in Queens require specialized treatment — not the generic pest spray that works for cockroaches. Jet Pest Control's bed bug division uses heat treatment, targeted chemical protocols, and K-9 detection to eliminate infestations at every stage of the life cycle, including eggs.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

Bed bugs are a persistent challenge in Queens's attached homes, two-family houses, garden apartments, and dense urban neighborhoods transitioning to suburban-style streets. They travel between units through wall voids, electrical outlets, and shared hallways — meaning a single untreated unit becomes a recurring source of reinfestation for an entire building. Professional bed bug extermination is the only effective solution in this environment.`,
    services: ["K-9 Bed Bug Detection", "Heat Treatment", "Chemical Bed Bug Treatment", "Mattress Encasements", "Multi-Unit Bed Bug Programs", "Post-Treatment Inspection"],
    faqs: [
      { q: `What bed bug treatment methods does Jet use in Queens?`, a: `We offer heat treatment raising room temperature to 120 degrees or higher to kill all life stages, targeted chemical treatment using residual insecticides, and combination protocols for severe infestations. K-9 detection is available for accurate verification.` },
      { q: `How long does bed bug heat treatment take?`, a: `A standard apartment heat treatment takes 6 to 8 hours. Larger units or whole-floor treatments may require a full day. You can return the same evening once temperatures normalize.` },
      { q: `Do I need to throw away my mattress?`, a: `Usually not. We treat mattresses in place using heat or approved residual products, and provide encasements to protect them. Discarding a mattress without treating the room is ineffective — bed bugs live in walls, baseboards, and furniture, not just mattresses.` },
      { q: `How do I know if bed bug treatment worked?`, a: `We provide a post-treatment inspection to confirm elimination. No live activity after 2 weeks is a strong indicator of success. Our service guarantee means we return if activity continues.` },
    ],
  },
  {
    region: 'queens',
    regionDisplay: 'Queens',
    leadType: 'free-pest-inspection',
    title: 'Free Pest Inspection',
    metaTitle: `Free Pest Inspection Queens | No-Cost Assessment`,
    metaDesc: `Free pest inspection in Queens. Jet Pest Control offers no-cost inspections to identify infestations, entry points, and risk factors. Call (800) 990-9296.`,
    h1: `Free Pest Inspection in Queens`,
    intro: `Not sure if you have a pest problem — or how serious it is? Jet Pest Control offers free pest inspections throughout Queens. A licensed technician will assess your property, identify any active infestations, locate entry points, and give you a clear picture of what you're dealing with — at no cost and no obligation.

Queens is New York City's most geographically diverse borough — from dense urban centers in Flushing and Jamaica to quieter residential pockets in Forest Hills and Bayside.

A free inspection is the right starting point for any pest concern. In Queens's attached homes, two-family houses, garden apartments, and dense urban neighborhoods transitioning to suburban-style streets, pest problems are often more extensive than they appear — what looks like a single mouse might be a colony using multiple entry points, and what seems like one cockroach is rarely alone.`,
    services: ["Full Property Inspection", "Entry Point Assessment", "Pest Identification", "Treatment Recommendation", "Prevention Consultation", "Written Inspection Report"],
    faqs: [
      { q: `What does a free pest inspection include?`, a: `A licensed Jet technician will inspect your home top to bottom: checking common entry points, looking for evidence of infestation, identifying the pest species, and assessing severity. You receive a full written report — no charge, no obligation.` },
      { q: `How long does a free pest inspection take?`, a: `A standard inspection for a home or apartment takes 30 to 45 minutes. Larger properties may take longer. We will give you a time estimate when you book.` },
      { q: `Will I be pressured to buy a treatment after the inspection?`, a: `No. Our inspections are genuinely free — if we find a problem and you want us to treat it, we will give you a transparent quote. If you want to think it over, that is completely fine. We want to earn your business, not pressure you into it.` },
      { q: `When should I get a free pest inspection?`, a: `Any time you are concerned: if you have seen a pest, noticed droppings or damage, moved into a new home, or just want peace of mind. Annual inspections are a good preventive practice in Queens's older housing stock.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'pest-control-near-me',
    title: 'Pest Control Near Me',
    metaTitle: `Pest Control Near Me Manhattan | Same-Day Service`,
    metaDesc: `Looking for pest control near you in Manhattan? Jet Pest Control offers same-day service, licensed technicians, and guaranteed results. Call (800) 990-9296.`,
    h1: `Pest Control Near Me in Manhattan`,
    intro: `When you search for pest control near you in Manhattan, you need a company that actually shows up — same day, with the right solution. Jet Pest Control has served Manhattan and the surrounding area for years, handling everything from cockroaches and rodents to bed bugs and termites in high-rise condos, pre-war co-ops, walk-up apartment buildings, and luxury doorman buildings.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

Our licensed and insured technicians know Manhattan's specific pest pressures intimately: bed bugs are endemic to the borough's dense housing market, cockroaches are persistent in older pre-war buildings, and rats operate along subway lines and restaurant back alleys. We don't send generalists — we send specialists who understand the local building stock, seasonal patterns, and the pests that exploit both.`,
    services: ["Cockroach Extermination", "Rodent Control", "Bed Bug Treatment", "Termite Inspection", "Ant Control", "General Pest Control"],
    faqs: [
      { q: `How fast can Jet Pest Control respond in Manhattan?`, a: `We offer same-day service throughout Manhattan. When you call before noon, a licensed technician can typically arrive the same afternoon. Emergency appointments are also available.` },
      { q: `Do you service all neighborhoods in Manhattan?`, a: `Yes — Jet Pest Control covers every neighborhood in Manhattan including Midtown, the Upper East Side, Greenwich Village, Tribeca, and Harlem. No area is too remote or too dense for our team.` },
      { q: `Are your treatments approved for use around children and pets?`, a: `Absolutely. We use EPA-registered products applied by licensed technicians following strict safety protocols. We provide detailed prep instructions before treatment and guidance on when it's clear to re-enter.` },
      { q: `What is included in a pest control service call?`, a: `Every service includes a full inspection, targeted treatment, a written report, and a follow-up guarantee. If pests return within the treatment period, we come back at no charge.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'exterminator-near-me',
    title: 'Exterminator Near Me',
    metaTitle: `Exterminator Near Me Manhattan | Licensed and Insured`,
    metaDesc: `Need an exterminator near you in Manhattan? Jet Pest Control is licensed, insured, and ready for same-day service. Call (800) 990-9296 now.`,
    h1: `Exterminator Near Me in Manhattan`,
    intro: `Searching for an exterminator near you in Manhattan? The quality of your exterminator matters more than most people realize — the wrong approach just pushes pests deeper into the structure without eliminating them. Jet Pest Control's licensed technicians identify the root cause of every infestation before treatment, delivering lasting results in high-rise condos, pre-war co-ops, walk-up apartment buildings, and luxury doorman buildings.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

We handle Manhattan's full range of pest problems: bed bugs are endemic to the borough's dense housing market, cockroaches are persistent in older pre-war buildings, and rats operate along subway lines and restaurant back alleys. Every job is backed by our service guarantee — if pests return, so do we.`,
    services: ["Cockroach Extermination", "Rodent Extermination", "Bed Bug Extermination", "Termite Treatment", "Ant and Stinging Insect Control", "Flea and Tick Treatment"],
    faqs: [
      { q: `What makes Jet different from other exterminators in Manhattan?`, a: `Our technicians are licensed by the New York State DEC and trained specifically in urban and suburban pest patterns across Manhattan. We use integrated pest management — identifying entry points and conditions alongside targeted treatment.` },
      { q: `Do exterminators need to inspect before treating?`, a: `Yes — a proper inspection is non-negotiable. We identify the pest species, assess infestation severity, locate entry points, and choose the right treatment method. Skipping this step leads to failed treatments.` },
      { q: `How long does exterminator treatment take?`, a: `Most standard treatments take 45 to 90 minutes depending on the size of the unit or home and the pest involved. We will give you a time estimate when you book.` },
      { q: `Are follow-up visits included?`, a: `Yes. Our service guarantee means if the infestation persists after treatment within the covered period, we return and retreat at no additional charge.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'emergency-pest-control',
    title: 'Emergency Pest Control',
    metaTitle: `Emergency Pest Control Manhattan | Same-Day Urgent Response`,
    metaDesc: `Emergency pest control in Manhattan. Same-day response for severe infestations, bed bugs, rodents, and more. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Emergency Pest Control in Manhattan`,
    intro: `A pest emergency in Manhattan cannot wait. Whether you've discovered bed bugs before guests arrive, a rat in the kitchen, a wasp nest near a doorway, or a cockroach infestation that appeared overnight — Jet Pest Control offers emergency same-day response throughout Manhattan.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

Pest emergencies are stressful and often escalate quickly in high-rise condos, pre-war co-ops, walk-up apartment buildings, and luxury doorman buildings. Our emergency response team is equipped to handle high-priority situations immediately: bed bugs are endemic to the borough's dense housing market, cockroaches are persistent in older pre-war buildings, and rats operate along subway lines and restaurant back alleys. One call gets you a licensed technician on-site the same day.`,
    services: ["Emergency Bed Bug Treatment", "Emergency Rodent Control", "Emergency Cockroach Extermination", "Wasp and Hornet Nest Removal", "Emergency Termite Treatment", "Same-Day Flea Treatment"],
    faqs: [
      { q: `How fast is your emergency response in Manhattan?`, a: `For emergency calls received before 2 PM, we typically have a technician on-site the same day in Manhattan. Call us and we will do everything possible to respond immediately.` },
      { q: `What qualifies as a pest emergency?`, a: `Any infestation causing immediate health, safety, or quality-of-life concerns: bed bugs before guests arrive, rats in living spaces or kitchens, aggressive stinging insect nests near entry points, or severe cockroach infestations in food prep areas.` },
      { q: `Do emergency pest control services cost more?`, a: `Same-day service is available at our standard rates. We do not charge surge pricing for urgency — the same licensed technicians, the same professional service, just faster.` },
      { q: `What should I do while waiting for emergency pest control?`, a: `For rodents: seal food in hard containers and block visible entry points with steel wool. For bed bugs: do not move mattresses or furniture between rooms. For wasps: avoid the area. We will give you specific guidance when you call.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'same-day-pest-control',
    title: 'Same Day Pest Control',
    metaTitle: `Same Day Pest Control Manhattan | Book Today, Service Today`,
    metaDesc: `Same-day pest control in Manhattan. Call Jet Pest Control at (800) 990-9296 before noon for afternoon service. Licensed, insured, guaranteed.`,
    h1: `Same Day Pest Control in Manhattan`,
    intro: `Same-day pest control in Manhattan is Jet's signature service. Call before noon and a licensed technician arrives the same afternoon — no waiting days for an appointment while an infestation spreads through your home or building.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

Same-day service matters most in Manhattan's densely housed communities. Bed bugs are endemic to the borough's dense housing market, cockroaches are persistent in older pre-war buildings, and rats operate along subway lines and restaurant back alleys. In multi-unit housing especially, delays mean wider spread — to neighboring units, shared walls, and common areas. Fast response is the only responsible approach.`,
    services: ["Same-Day Cockroach Treatment", "Same-Day Rodent Control", "Same-Day Bed Bug Treatment", "Same-Day Ant Control", "Same-Day Flea and Tick Treatment", "Same-Day General Pest Service"],
    faqs: [
      { q: `What is the cutoff time to book same-day pest control in Manhattan?`, a: `Call us before noon and we will have a technician at your property the same afternoon in most cases throughout Manhattan. For some areas, later bookings may still be accommodated.` },
      { q: `Does same-day service mean a rushed job?`, a: `Not at all. Our same-day technicians follow the same thorough inspection and treatment protocols as any scheduled appointment. Speed of response does not mean cutting corners.` },
      { q: `What pests can be treated same day?`, a: `Most common pests: cockroaches, rodents, bed bugs, ants, fleas, silverfish, and stinging insects. Some treatments like heat treatment for large spaces may require scheduling a specific window.` },
      { q: `Is same-day pest control available on weekends?`, a: `Yes — Jet Pest Control offers same-day service 7 days a week throughout Manhattan. Pests do not take weekends off, and neither do we.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'bed-bug-exterminator',
    title: 'Bed Bug Exterminator',
    metaTitle: `Bed Bug Exterminator Manhattan | Heat Treatment + Chemical`,
    metaDesc: `Bed bug exterminator in Manhattan. Heat treatment, chemical treatment, and K-9 detection available. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Bed Bug Exterminator in Manhattan`,
    intro: `Bed bugs in Manhattan require specialized treatment — not the generic pest spray that works for cockroaches. Jet Pest Control's bed bug division uses heat treatment, targeted chemical protocols, and K-9 detection to eliminate infestations at every stage of the life cycle, including eggs.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

Bed bugs are a persistent challenge in Manhattan's high-rise condos, pre-war co-ops, walk-up apartment buildings, and luxury doorman buildings. They travel between units through wall voids, electrical outlets, and shared hallways — meaning a single untreated unit becomes a recurring source of reinfestation for an entire building. Professional bed bug extermination is the only effective solution in this environment.`,
    services: ["K-9 Bed Bug Detection", "Heat Treatment", "Chemical Bed Bug Treatment", "Mattress Encasements", "Multi-Unit Bed Bug Programs", "Post-Treatment Inspection"],
    faqs: [
      { q: `What bed bug treatment methods does Jet use in Manhattan?`, a: `We offer heat treatment raising room temperature to 120 degrees or higher to kill all life stages, targeted chemical treatment using residual insecticides, and combination protocols for severe infestations. K-9 detection is available for accurate verification.` },
      { q: `How long does bed bug heat treatment take?`, a: `A standard apartment heat treatment takes 6 to 8 hours. Larger units or whole-floor treatments may require a full day. You can return the same evening once temperatures normalize.` },
      { q: `Do I need to throw away my mattress?`, a: `Usually not. We treat mattresses in place using heat or approved residual products, and provide encasements to protect them. Discarding a mattress without treating the room is ineffective — bed bugs live in walls, baseboards, and furniture, not just mattresses.` },
      { q: `How do I know if bed bug treatment worked?`, a: `We provide a post-treatment inspection to confirm elimination. No live activity after 2 weeks is a strong indicator of success. Our service guarantee means we return if activity continues.` },
    ],
  },
  {
    region: 'manhattan',
    regionDisplay: 'Manhattan',
    leadType: 'free-pest-inspection',
    title: 'Free Pest Inspection',
    metaTitle: `Free Pest Inspection Manhattan | No-Cost Assessment`,
    metaDesc: `Free pest inspection in Manhattan. Jet Pest Control offers no-cost inspections to identify infestations, entry points, and risk factors. Call (800) 990-9296.`,
    h1: `Free Pest Inspection in Manhattan`,
    intro: `Not sure if you have a pest problem — or how serious it is? Jet Pest Control offers free pest inspections throughout Manhattan. A licensed technician will assess your property, identify any active infestations, locate entry points, and give you a clear picture of what you're dealing with — at no cost and no obligation.

Manhattan's 1.6 million residents live in one of the world's most densely packed urban environments — where pest problems spread fast and discreet, professional service is the standard.

A free inspection is the right starting point for any pest concern. In Manhattan's high-rise condos, pre-war co-ops, walk-up apartment buildings, and luxury doorman buildings, pest problems are often more extensive than they appear — what looks like a single mouse might be a colony using multiple entry points, and what seems like one cockroach is rarely alone.`,
    services: ["Full Property Inspection", "Entry Point Assessment", "Pest Identification", "Treatment Recommendation", "Prevention Consultation", "Written Inspection Report"],
    faqs: [
      { q: `What does a free pest inspection include?`, a: `A licensed Jet technician will inspect your home top to bottom: checking common entry points, looking for evidence of infestation, identifying the pest species, and assessing severity. You receive a full written report — no charge, no obligation.` },
      { q: `How long does a free pest inspection take?`, a: `A standard inspection for a home or apartment takes 30 to 45 minutes. Larger properties may take longer. We will give you a time estimate when you book.` },
      { q: `Will I be pressured to buy a treatment after the inspection?`, a: `No. Our inspections are genuinely free — if we find a problem and you want us to treat it, we will give you a transparent quote. If you want to think it over, that is completely fine. We want to earn your business, not pressure you into it.` },
      { q: `When should I get a free pest inspection?`, a: `Any time you are concerned: if you have seen a pest, noticed droppings or damage, moved into a new home, or just want peace of mind. Annual inspections are a good preventive practice in Manhattan's older housing stock.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'pest-control-near-me',
    title: 'Pest Control Near Me',
    metaTitle: `Pest Control Near Me Nassau County | Same-Day Service`,
    metaDesc: `Looking for pest control near you in Nassau County? Jet Pest Control offers same-day service, licensed technicians, and guaranteed results. Call (800) 990-9296.`,
    h1: `Pest Control Near Me in Nassau County`,
    intro: `When you search for pest control near you in Nassau County, you need a company that actually shows up — same day, with the right solution. Jet Pest Control has served Nassau County and the surrounding area for years, handling everything from cockroaches and rodents to bed bugs and termites in post-war Levittown Cape Cods, split-level homes, colonial-style houses, and mature tree-lined neighborhoods with aging foundations.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

Our licensed and insured technicians know Nassau County's specific pest pressures intimately: termites are active in Nassau's older wood-frame housing stock, ticks are prevalent in landscaped yards near preserve edges, mice and rats enter through foundation gaps in aging homes, and carpenter ants tunnel through moisture-damaged wood. We don't send generalists — we send specialists who understand the local building stock, seasonal patterns, and the pests that exploit both.`,
    services: ["Cockroach Extermination", "Rodent Control", "Bed Bug Treatment", "Termite Inspection", "Ant Control", "General Pest Control"],
    faqs: [
      { q: `How fast can Jet Pest Control respond in Nassau County?`, a: `We offer same-day service throughout Nassau County. When you call before noon, a licensed technician can typically arrive the same afternoon. Emergency appointments are also available.` },
      { q: `Do you service all neighborhoods in Nassau County?`, a: `Yes — Jet Pest Control covers every neighborhood in Nassau County including Garden City, Levittown, Long Beach, Hempstead, and the South Shore barrier beaches. No area is too remote or too dense for our team.` },
      { q: `Are your treatments approved for use around children and pets?`, a: `Absolutely. We use EPA-registered products applied by licensed technicians following strict safety protocols. We provide detailed prep instructions before treatment and guidance on when it's clear to re-enter.` },
      { q: `What is included in a pest control service call?`, a: `Every service includes a full inspection, targeted treatment, a written report, and a follow-up guarantee. If pests return within the treatment period, we come back at no charge.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'exterminator-near-me',
    title: 'Exterminator Near Me',
    metaTitle: `Exterminator Near Me Nassau County | Licensed and Insured`,
    metaDesc: `Need an exterminator near you in Nassau County? Jet Pest Control is licensed, insured, and ready for same-day service. Call (800) 990-9296 now.`,
    h1: `Exterminator Near Me in Nassau County`,
    intro: `Searching for an exterminator near you in Nassau County? The quality of your exterminator matters more than most people realize — the wrong approach just pushes pests deeper into the structure without eliminating them. Jet Pest Control's licensed technicians identify the root cause of every infestation before treatment, delivering lasting results in post-war Levittown Cape Cods, split-level homes, colonial-style houses, and mature tree-lined neighborhoods with aging foundations.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

We handle Nassau County's full range of pest problems: termites are active in Nassau's older wood-frame housing stock, ticks are prevalent in landscaped yards near preserve edges, mice and rats enter through foundation gaps in aging homes, and carpenter ants tunnel through moisture-damaged wood. Every job is backed by our service guarantee — if pests return, so do we.`,
    services: ["Cockroach Extermination", "Rodent Extermination", "Bed Bug Extermination", "Termite Treatment", "Ant and Stinging Insect Control", "Flea and Tick Treatment"],
    faqs: [
      { q: `What makes Jet different from other exterminators in Nassau County?`, a: `Our technicians are licensed by the New York State DEC and trained specifically in urban and suburban pest patterns across Nassau County. We use integrated pest management — identifying entry points and conditions alongside targeted treatment.` },
      { q: `Do exterminators need to inspect before treating?`, a: `Yes — a proper inspection is non-negotiable. We identify the pest species, assess infestation severity, locate entry points, and choose the right treatment method. Skipping this step leads to failed treatments.` },
      { q: `How long does exterminator treatment take?`, a: `Most standard treatments take 45 to 90 minutes depending on the size of the unit or home and the pest involved. We will give you a time estimate when you book.` },
      { q: `Are follow-up visits included?`, a: `Yes. Our service guarantee means if the infestation persists after treatment within the covered period, we return and retreat at no additional charge.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'emergency-pest-control',
    title: 'Emergency Pest Control',
    metaTitle: `Emergency Pest Control Nassau County | Same-Day Urgent Response`,
    metaDesc: `Emergency pest control in Nassau County. Same-day response for severe infestations, bed bugs, rodents, and more. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Emergency Pest Control in Nassau County`,
    intro: `A pest emergency in Nassau County cannot wait. Whether you've discovered bed bugs before guests arrive, a rat in the kitchen, a wasp nest near a doorway, or a cockroach infestation that appeared overnight — Jet Pest Control offers emergency same-day response throughout Nassau County.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

Pest emergencies are stressful and often escalate quickly in post-war Levittown Cape Cods, split-level homes, colonial-style houses, and mature tree-lined neighborhoods with aging foundations. Our emergency response team is equipped to handle high-priority situations immediately: termites are active in Nassau's older wood-frame housing stock, ticks are prevalent in landscaped yards near preserve edges, mice and rats enter through foundation gaps in aging homes, and carpenter ants tunnel through moisture-damaged wood. One call gets you a licensed technician on-site the same day.`,
    services: ["Emergency Bed Bug Treatment", "Emergency Rodent Control", "Emergency Cockroach Extermination", "Wasp and Hornet Nest Removal", "Emergency Termite Treatment", "Same-Day Flea Treatment"],
    faqs: [
      { q: `How fast is your emergency response in Nassau County?`, a: `For emergency calls received before 2 PM, we typically have a technician on-site the same day in Nassau County. Call us and we will do everything possible to respond immediately.` },
      { q: `What qualifies as a pest emergency?`, a: `Any infestation causing immediate health, safety, or quality-of-life concerns: bed bugs before guests arrive, rats in living spaces or kitchens, aggressive stinging insect nests near entry points, or severe cockroach infestations in food prep areas.` },
      { q: `Do emergency pest control services cost more?`, a: `Same-day service is available at our standard rates. We do not charge surge pricing for urgency — the same licensed technicians, the same professional service, just faster.` },
      { q: `What should I do while waiting for emergency pest control?`, a: `For rodents: seal food in hard containers and block visible entry points with steel wool. For bed bugs: do not move mattresses or furniture between rooms. For wasps: avoid the area. We will give you specific guidance when you call.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'same-day-pest-control',
    title: 'Same Day Pest Control',
    metaTitle: `Same Day Pest Control Nassau County | Book Today, Service Today`,
    metaDesc: `Same-day pest control in Nassau County. Call Jet Pest Control at (800) 990-9296 before noon for afternoon service. Licensed, insured, guaranteed.`,
    h1: `Same Day Pest Control in Nassau County`,
    intro: `Same-day pest control in Nassau County is Jet's signature service. Call before noon and a licensed technician arrives the same afternoon — no waiting days for an appointment while an infestation spreads through your home or building.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

Same-day service matters most in Nassau County's densely housed communities. Termites are active in Nassau's older wood-frame housing stock, ticks are prevalent in landscaped yards near preserve edges, mice and rats enter through foundation gaps in aging homes, and carpenter ants tunnel through moisture-damaged wood. In multi-unit housing especially, delays mean wider spread — to neighboring units, shared walls, and common areas. Fast response is the only responsible approach.`,
    services: ["Same-Day Cockroach Treatment", "Same-Day Rodent Control", "Same-Day Bed Bug Treatment", "Same-Day Ant Control", "Same-Day Flea and Tick Treatment", "Same-Day General Pest Service"],
    faqs: [
      { q: `What is the cutoff time to book same-day pest control in Nassau County?`, a: `Call us before noon and we will have a technician at your property the same afternoon in most cases throughout Nassau County. For some areas, later bookings may still be accommodated.` },
      { q: `Does same-day service mean a rushed job?`, a: `Not at all. Our same-day technicians follow the same thorough inspection and treatment protocols as any scheduled appointment. Speed of response does not mean cutting corners.` },
      { q: `What pests can be treated same day?`, a: `Most common pests: cockroaches, rodents, bed bugs, ants, fleas, silverfish, and stinging insects. Some treatments like heat treatment for large spaces may require scheduling a specific window.` },
      { q: `Is same-day pest control available on weekends?`, a: `Yes — Jet Pest Control offers same-day service 7 days a week throughout Nassau County. Pests do not take weekends off, and neither do we.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'bed-bug-exterminator',
    title: 'Bed Bug Exterminator',
    metaTitle: `Bed Bug Exterminator Nassau County | Heat Treatment + Chemical`,
    metaDesc: `Bed bug exterminator in Nassau County. Heat treatment, chemical treatment, and K-9 detection available. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Bed Bug Exterminator in Nassau County`,
    intro: `Bed bugs in Nassau County require specialized treatment — not the generic pest spray that works for cockroaches. Jet Pest Control's bed bug division uses heat treatment, targeted chemical protocols, and K-9 detection to eliminate infestations at every stage of the life cycle, including eggs.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

Bed bugs are a persistent challenge in Nassau County's post-war Levittown Cape Cods, split-level homes, colonial-style houses, and mature tree-lined neighborhoods with aging foundations. They travel between units through wall voids, electrical outlets, and shared hallways — meaning a single untreated unit becomes a recurring source of reinfestation for an entire building. Professional bed bug extermination is the only effective solution in this environment.`,
    services: ["K-9 Bed Bug Detection", "Heat Treatment", "Chemical Bed Bug Treatment", "Mattress Encasements", "Multi-Unit Bed Bug Programs", "Post-Treatment Inspection"],
    faqs: [
      { q: `What bed bug treatment methods does Jet use in Nassau County?`, a: `We offer heat treatment raising room temperature to 120 degrees or higher to kill all life stages, targeted chemical treatment using residual insecticides, and combination protocols for severe infestations. K-9 detection is available for accurate verification.` },
      { q: `How long does bed bug heat treatment take?`, a: `A standard apartment heat treatment takes 6 to 8 hours. Larger units or whole-floor treatments may require a full day. You can return the same evening once temperatures normalize.` },
      { q: `Do I need to throw away my mattress?`, a: `Usually not. We treat mattresses in place using heat or approved residual products, and provide encasements to protect them. Discarding a mattress without treating the room is ineffective — bed bugs live in walls, baseboards, and furniture, not just mattresses.` },
      { q: `How do I know if bed bug treatment worked?`, a: `We provide a post-treatment inspection to confirm elimination. No live activity after 2 weeks is a strong indicator of success. Our service guarantee means we return if activity continues.` },
    ],
  },
  {
    region: 'nassau',
    regionDisplay: 'Nassau County',
    leadType: 'free-pest-inspection',
    title: 'Free Pest Inspection',
    metaTitle: `Free Pest Inspection Nassau County | No-Cost Assessment`,
    metaDesc: `Free pest inspection in Nassau County. Jet Pest Control offers no-cost inspections to identify infestations, entry points, and risk factors. Call (800) 990-9296.`,
    h1: `Free Pest Inspection in Nassau County`,
    intro: `Not sure if you have a pest problem — or how serious it is? Jet Pest Control offers free pest inspections throughout Nassau County. A licensed technician will assess your property, identify any active infestations, locate entry points, and give you a clear picture of what you're dealing with — at no cost and no obligation.

Nassau County's 1.4 million residents live in some of Long Island's most established residential communities — homes with 50 to 70 years of settlement that create ongoing pest entry points.

A free inspection is the right starting point for any pest concern. In Nassau County's post-war Levittown Cape Cods, split-level homes, colonial-style houses, and mature tree-lined neighborhoods with aging foundations, pest problems are often more extensive than they appear — what looks like a single mouse might be a colony using multiple entry points, and what seems like one cockroach is rarely alone.`,
    services: ["Full Property Inspection", "Entry Point Assessment", "Pest Identification", "Treatment Recommendation", "Prevention Consultation", "Written Inspection Report"],
    faqs: [
      { q: `What does a free pest inspection include?`, a: `A licensed Jet technician will inspect your home top to bottom: checking common entry points, looking for evidence of infestation, identifying the pest species, and assessing severity. You receive a full written report — no charge, no obligation.` },
      { q: `How long does a free pest inspection take?`, a: `A standard inspection for a home or apartment takes 30 to 45 minutes. Larger properties may take longer. We will give you a time estimate when you book.` },
      { q: `Will I be pressured to buy a treatment after the inspection?`, a: `No. Our inspections are genuinely free — if we find a problem and you want us to treat it, we will give you a transparent quote. If you want to think it over, that is completely fine. We want to earn your business, not pressure you into it.` },
      { q: `When should I get a free pest inspection?`, a: `Any time you are concerned: if you have seen a pest, noticed droppings or damage, moved into a new home, or just want peace of mind. Annual inspections are a good preventive practice in Nassau County's older housing stock.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'pest-control-near-me',
    title: 'Pest Control Near Me',
    metaTitle: `Pest Control Near Me Suffolk County | Same-Day Service`,
    metaDesc: `Looking for pest control near you in Suffolk County? Jet Pest Control offers same-day service, licensed technicians, and guaranteed results. Call (800) 990-9296.`,
    h1: `Pest Control Near Me in Suffolk County`,
    intro: `When you search for pest control near you in Suffolk County, you need a company that actually shows up — same day, with the right solution. Jet Pest Control has served Suffolk County and the surrounding area for years, handling everything from cockroaches and rodents to bed bugs and termites in single-family colonial and ranch homes, waterfront properties, rural estates, and seasonal communities along the East End.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

Our licensed and insured technicians know Suffolk County's specific pest pressures intimately: deer ticks carrying Lyme disease are a serious health concern, termites damage wood-frame homes in inland communities, stinging insects nest in overgrown suburban yards, and rodents are active near agricultural land on the East End. We don't send generalists — we send specialists who understand the local building stock, seasonal patterns, and the pests that exploit both.`,
    services: ["Cockroach Extermination", "Rodent Control", "Bed Bug Treatment", "Termite Inspection", "Ant Control", "General Pest Control"],
    faqs: [
      { q: `How fast can Jet Pest Control respond in Suffolk County?`, a: `We offer same-day service throughout Suffolk County. When you call before noon, a licensed technician can typically arrive the same afternoon. Emergency appointments are also available.` },
      { q: `Do you service all neighborhoods in Suffolk County?`, a: `Yes — Jet Pest Control covers every neighborhood in Suffolk County including Huntington, Brentwood, Hauppauge, the Hamptons, and Montauk. No area is too remote or too dense for our team.` },
      { q: `Are your treatments approved for use around children and pets?`, a: `Absolutely. We use EPA-registered products applied by licensed technicians following strict safety protocols. We provide detailed prep instructions before treatment and guidance on when it's clear to re-enter.` },
      { q: `What is included in a pest control service call?`, a: `Every service includes a full inspection, targeted treatment, a written report, and a follow-up guarantee. If pests return within the treatment period, we come back at no charge.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'exterminator-near-me',
    title: 'Exterminator Near Me',
    metaTitle: `Exterminator Near Me Suffolk County | Licensed and Insured`,
    metaDesc: `Need an exterminator near you in Suffolk County? Jet Pest Control is licensed, insured, and ready for same-day service. Call (800) 990-9296 now.`,
    h1: `Exterminator Near Me in Suffolk County`,
    intro: `Searching for an exterminator near you in Suffolk County? The quality of your exterminator matters more than most people realize — the wrong approach just pushes pests deeper into the structure without eliminating them. Jet Pest Control's licensed technicians identify the root cause of every infestation before treatment, delivering lasting results in single-family colonial and ranch homes, waterfront properties, rural estates, and seasonal communities along the East End.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

We handle Suffolk County's full range of pest problems: deer ticks carrying Lyme disease are a serious health concern, termites damage wood-frame homes in inland communities, stinging insects nest in overgrown suburban yards, and rodents are active near agricultural land on the East End. Every job is backed by our service guarantee — if pests return, so do we.`,
    services: ["Cockroach Extermination", "Rodent Extermination", "Bed Bug Extermination", "Termite Treatment", "Ant and Stinging Insect Control", "Flea and Tick Treatment"],
    faqs: [
      { q: `What makes Jet different from other exterminators in Suffolk County?`, a: `Our technicians are licensed by the New York State DEC and trained specifically in urban and suburban pest patterns across Suffolk County. We use integrated pest management — identifying entry points and conditions alongside targeted treatment.` },
      { q: `Do exterminators need to inspect before treating?`, a: `Yes — a proper inspection is non-negotiable. We identify the pest species, assess infestation severity, locate entry points, and choose the right treatment method. Skipping this step leads to failed treatments.` },
      { q: `How long does exterminator treatment take?`, a: `Most standard treatments take 45 to 90 minutes depending on the size of the unit or home and the pest involved. We will give you a time estimate when you book.` },
      { q: `Are follow-up visits included?`, a: `Yes. Our service guarantee means if the infestation persists after treatment within the covered period, we return and retreat at no additional charge.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'emergency-pest-control',
    title: 'Emergency Pest Control',
    metaTitle: `Emergency Pest Control Suffolk County | Same-Day Urgent Response`,
    metaDesc: `Emergency pest control in Suffolk County. Same-day response for severe infestations, bed bugs, rodents, and more. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Emergency Pest Control in Suffolk County`,
    intro: `A pest emergency in Suffolk County cannot wait. Whether you've discovered bed bugs before guests arrive, a rat in the kitchen, a wasp nest near a doorway, or a cockroach infestation that appeared overnight — Jet Pest Control offers emergency same-day response throughout Suffolk County.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

Pest emergencies are stressful and often escalate quickly in single-family colonial and ranch homes, waterfront properties, rural estates, and seasonal communities along the East End. Our emergency response team is equipped to handle high-priority situations immediately: deer ticks carrying Lyme disease are a serious health concern, termites damage wood-frame homes in inland communities, stinging insects nest in overgrown suburban yards, and rodents are active near agricultural land on the East End. One call gets you a licensed technician on-site the same day.`,
    services: ["Emergency Bed Bug Treatment", "Emergency Rodent Control", "Emergency Cockroach Extermination", "Wasp and Hornet Nest Removal", "Emergency Termite Treatment", "Same-Day Flea Treatment"],
    faqs: [
      { q: `How fast is your emergency response in Suffolk County?`, a: `For emergency calls received before 2 PM, we typically have a technician on-site the same day in Suffolk County. Call us and we will do everything possible to respond immediately.` },
      { q: `What qualifies as a pest emergency?`, a: `Any infestation causing immediate health, safety, or quality-of-life concerns: bed bugs before guests arrive, rats in living spaces or kitchens, aggressive stinging insect nests near entry points, or severe cockroach infestations in food prep areas.` },
      { q: `Do emergency pest control services cost more?`, a: `Same-day service is available at our standard rates. We do not charge surge pricing for urgency — the same licensed technicians, the same professional service, just faster.` },
      { q: `What should I do while waiting for emergency pest control?`, a: `For rodents: seal food in hard containers and block visible entry points with steel wool. For bed bugs: do not move mattresses or furniture between rooms. For wasps: avoid the area. We will give you specific guidance when you call.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'same-day-pest-control',
    title: 'Same Day Pest Control',
    metaTitle: `Same Day Pest Control Suffolk County | Book Today, Service Today`,
    metaDesc: `Same-day pest control in Suffolk County. Call Jet Pest Control at (800) 990-9296 before noon for afternoon service. Licensed, insured, guaranteed.`,
    h1: `Same Day Pest Control in Suffolk County`,
    intro: `Same-day pest control in Suffolk County is Jet's signature service. Call before noon and a licensed technician arrives the same afternoon — no waiting days for an appointment while an infestation spreads through your home or building.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

Same-day service matters most in Suffolk County's densely housed communities. Deer ticks carrying Lyme disease are a serious health concern, termites damage wood-frame homes in inland communities, stinging insects nest in overgrown suburban yards, and rodents are active near agricultural land on the East End. In multi-unit housing especially, delays mean wider spread — to neighboring units, shared walls, and common areas. Fast response is the only responsible approach.`,
    services: ["Same-Day Cockroach Treatment", "Same-Day Rodent Control", "Same-Day Bed Bug Treatment", "Same-Day Ant Control", "Same-Day Flea and Tick Treatment", "Same-Day General Pest Service"],
    faqs: [
      { q: `What is the cutoff time to book same-day pest control in Suffolk County?`, a: `Call us before noon and we will have a technician at your property the same afternoon in most cases throughout Suffolk County. For some areas, later bookings may still be accommodated.` },
      { q: `Does same-day service mean a rushed job?`, a: `Not at all. Our same-day technicians follow the same thorough inspection and treatment protocols as any scheduled appointment. Speed of response does not mean cutting corners.` },
      { q: `What pests can be treated same day?`, a: `Most common pests: cockroaches, rodents, bed bugs, ants, fleas, silverfish, and stinging insects. Some treatments like heat treatment for large spaces may require scheduling a specific window.` },
      { q: `Is same-day pest control available on weekends?`, a: `Yes — Jet Pest Control offers same-day service 7 days a week throughout Suffolk County. Pests do not take weekends off, and neither do we.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'bed-bug-exterminator',
    title: 'Bed Bug Exterminator',
    metaTitle: `Bed Bug Exterminator Suffolk County | Heat Treatment + Chemical`,
    metaDesc: `Bed bug exterminator in Suffolk County. Heat treatment, chemical treatment, and K-9 detection available. Call Jet Pest Control at (800) 990-9296.`,
    h1: `Bed Bug Exterminator in Suffolk County`,
    intro: `Bed bugs in Suffolk County require specialized treatment — not the generic pest spray that works for cockroaches. Jet Pest Control's bed bug division uses heat treatment, targeted chemical protocols, and K-9 detection to eliminate infestations at every stage of the life cycle, including eggs.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

Bed bugs are a persistent challenge in Suffolk County's single-family colonial and ranch homes, waterfront properties, rural estates, and seasonal communities along the East End. They travel between units through wall voids, electrical outlets, and shared hallways — meaning a single untreated unit becomes a recurring source of reinfestation for an entire building. Professional bed bug extermination is the only effective solution in this environment.`,
    services: ["K-9 Bed Bug Detection", "Heat Treatment", "Chemical Bed Bug Treatment", "Mattress Encasements", "Multi-Unit Bed Bug Programs", "Post-Treatment Inspection"],
    faqs: [
      { q: `What bed bug treatment methods does Jet use in Suffolk County?`, a: `We offer heat treatment raising room temperature to 120 degrees or higher to kill all life stages, targeted chemical treatment using residual insecticides, and combination protocols for severe infestations. K-9 detection is available for accurate verification.` },
      { q: `How long does bed bug heat treatment take?`, a: `A standard apartment heat treatment takes 6 to 8 hours. Larger units or whole-floor treatments may require a full day. You can return the same evening once temperatures normalize.` },
      { q: `Do I need to throw away my mattress?`, a: `Usually not. We treat mattresses in place using heat or approved residual products, and provide encasements to protect them. Discarding a mattress without treating the room is ineffective — bed bugs live in walls, baseboards, and furniture, not just mattresses.` },
      { q: `How do I know if bed bug treatment worked?`, a: `We provide a post-treatment inspection to confirm elimination. No live activity after 2 weeks is a strong indicator of success. Our service guarantee means we return if activity continues.` },
    ],
  },
  {
    region: 'suffolk',
    regionDisplay: 'Suffolk County',
    leadType: 'free-pest-inspection',
    title: 'Free Pest Inspection',
    metaTitle: `Free Pest Inspection Suffolk County | No-Cost Assessment`,
    metaDesc: `Free pest inspection in Suffolk County. Jet Pest Control offers no-cost inspections to identify infestations, entry points, and risk factors. Call (800) 990-9296.`,
    h1: `Free Pest Inspection in Suffolk County`,
    intro: `Not sure if you have a pest problem — or how serious it is? Jet Pest Control offers free pest inspections throughout Suffolk County. A licensed technician will assess your property, identify any active infestations, locate entry points, and give you a clear picture of what you're dealing with — at no cost and no obligation.

Suffolk County stretches 86 miles from the Queens border to Montauk Point — covering dense suburban communities, rural farmland, and seasonal resort towns, each with distinct pest pressures.

A free inspection is the right starting point for any pest concern. In Suffolk County's single-family colonial and ranch homes, waterfront properties, rural estates, and seasonal communities along the East End, pest problems are often more extensive than they appear — what looks like a single mouse might be a colony using multiple entry points, and what seems like one cockroach is rarely alone.`,
    services: ["Full Property Inspection", "Entry Point Assessment", "Pest Identification", "Treatment Recommendation", "Prevention Consultation", "Written Inspection Report"],
    faqs: [
      { q: `What does a free pest inspection include?`, a: `A licensed Jet technician will inspect your home top to bottom: checking common entry points, looking for evidence of infestation, identifying the pest species, and assessing severity. You receive a full written report — no charge, no obligation.` },
      { q: `How long does a free pest inspection take?`, a: `A standard inspection for a home or apartment takes 30 to 45 minutes. Larger properties may take longer. We will give you a time estimate when you book.` },
      { q: `Will I be pressured to buy a treatment after the inspection?`, a: `No. Our inspections are genuinely free — if we find a problem and you want us to treat it, we will give you a transparent quote. If you want to think it over, that is completely fine. We want to earn your business, not pressure you into it.` },
      { q: `When should I get a free pest inspection?`, a: `Any time you are concerned: if you have seen a pest, noticed droppings or damage, moved into a new home, or just want peace of mind. Annual inspections are a good preventive practice in Suffolk County's older housing stock.` },
    ],
  },
];

export function getLeadCapturePage(region: string, leadType: string): LeadCapturePage | null {
  return leadCapturePages.find(p => p.region === region && p.leadType === leadType) || null;
}
