

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfhngcpobjlsvmagrcqo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmaG5nY3BvYmpsc3ZtYWdyY3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDg4NzQsImV4cCI6MjA1ODkyNDg3NH0.GTM2FVDXWVCcZYOBAx0XCNPgLhvc4sX3Vjk2twhnK_w";

export const supabase = createClient(supabaseUrl, supabaseKey);
