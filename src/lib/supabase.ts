import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback to a mock URL if not set or invalid during build time so compilation doesn't fail
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-url-for-build.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder-key-for-build';

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  // Only warn in dev mode or in browser to keep build logs clean
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.warn(
      'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set or invalid. Please check your .env.local configuration.'
    );
  }
}

export const supabase = createClient(finalUrl, finalKey);
