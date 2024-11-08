import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnujdvuddyvdibkjxjfu.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudWpkdnVkZHl2ZGlia2p4amZ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTg2NzIwOSwiZXhwIjoyMDQxNDQzMjA5fQ.39j9z9ooFN2SD-N5FGGCXxd6666LYziHi7KmB67fy7U';

export const supabase = createClient(supabaseUrl, supabaseKey);
