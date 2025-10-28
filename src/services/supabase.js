import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xeiepqxiolfzfdbxpwtv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlaWVwcXhpb2xmemZkYnhwd3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDQ5NTcsImV4cCI6MjA3NzAyMDk1N30.mUTd04GOThUW0BGkSnyBpi5mWw-QfcHzMQa6p6shsOQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
