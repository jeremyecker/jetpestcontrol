import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — never created at build time
let _supabase: SupabaseClient | null = null;
let _serviceClient: SupabaseClient | null = null;

/**
 * Get Supabase client (anon key — for client-side use)
 * Created lazily at runtime, never during build
 */
export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  }

  _supabase = createClient(url, anonKey);
  return _supabase;
}

/**
 * Backward-compatible export — lazy getter
 * Use getSupabase() directly in new code
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop];
  },
});

/**
 * Server-side Supabase client with service role key
 * Use ONLY in API routes and server components that need elevated access
 */
export function getServiceClient(): SupabaseClient {
  if (_serviceClient) return _serviceClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  _serviceClient = createClient(url, serviceRoleKey);
  return _serviceClient;
}
