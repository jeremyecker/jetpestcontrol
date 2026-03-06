import { NextRequest, NextResponse } from 'next/server';
import { BRAND } from '@/hub.config';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || BRAND.webhookUrl;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      description,
      pestType,
      smsConsent,
      source,
      regionSlug,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const leadData = {
      name,
      phone,
      email: email || null,
      description: description || null,
      pest_type: pestType || null,
      sms_consent: smsConsent === true,
      source: source || 'website',
      region_slug: regionSlug || null,
      site_domain: BRAND.domain,
      created_at: new Date().toISOString(),
    };

    // Save to Supabase
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(leadData),
      });
    }

    // Send to CRM webhook
    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
