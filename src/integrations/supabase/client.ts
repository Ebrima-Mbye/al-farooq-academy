// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zessgwognooejviqrfwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplc3Nnd29nbm9vZWp2aXFyZnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDM3NjAsImV4cCI6MjA2NzM3OTc2MH0.ICw-41Jg8MMYoUJdTCoCO9RWipZjK0hbZjBCXvjxH9I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});