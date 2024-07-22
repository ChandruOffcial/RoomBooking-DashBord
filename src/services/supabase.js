import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nvpgfgsoaeuhnzmtdfik.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cGdmZ3NvYWV1aG56bXRkZmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MDUwOTMsImV4cCI6MjAzNjk4MTA5M30.e7YPENChcERcECdBlzWW6BwPiW4RyNcxex2_jyWmfV4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
