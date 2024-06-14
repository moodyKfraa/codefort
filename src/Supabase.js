import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://uhtemvqbfzogigemhknj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVodGVtdnFiZnpvZ2lnZW1oa25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMjE0ODIsImV4cCI6MjAzMzY5NzQ4Mn0.nomgTGHTE1SDMngFvmVigktrQXgnbROcy-iEZpERahw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase