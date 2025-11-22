// src/supabase.js
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://reffbqitbvogevpweyyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZmZicWl0YnZvZ2V2cHdleXl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzc0MjQxMSwiZXhwIjoyMDc5MzE4NDExfQ.OhAl-yY70aZAwaLq_ZqXjviFDHjqxkqspDj7cP7XeD8';
export const supabase = createClient(supabaseUrl, supabaseKey);