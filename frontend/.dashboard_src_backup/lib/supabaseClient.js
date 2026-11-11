import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://cmpghiavghpdwtyuiuqm.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

