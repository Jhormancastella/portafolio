export function createSupabaseClient() {
  if (!window.supabase) {
    console.error('Supabase library not loaded');
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const db = createSupabaseClient();
