import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nsfdzdisybjejoynbyrr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmR6ZGlzeWJqZWpveW5ieXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwNTgyNTcsImV4cCI6MjAzMDYzNDI1N30.NcuIJ_zlHWcEEcqmMDs0tc-Lz-VqhtuTXGuBLQ_clOA'; // Replace with your actual Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;