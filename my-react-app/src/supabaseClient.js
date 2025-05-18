import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lflywfotholujjzhliua.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbHl3Zm90aG9sdWpqemhsaXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjA1OTksImV4cCI6MjA2MzA5NjU5OX0.ejBm0zMtWzJcJ8cjixgqz1IYvCwIQs2ny5hKdgFcC9w';
export const supabase = createClient(supabaseUrl, supabaseKey);