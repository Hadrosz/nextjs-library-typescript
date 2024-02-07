import { createClient as database } from "@supabase/supabase-js";
import { Database } from "../types/database";

export default function CreateClient() {
  return database<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
