import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://ejojkteyxvqnwncibfmd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqb2prdGV5eHZxbnduY2liZm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTkxMTksImV4cCI6MjA5NzQ3NTExOX0.fBqzha0_ub3MiSupnt8-pgYKTN3r-Ve85Gf6YqNWMSE'
);
