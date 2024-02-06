import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import NavBar from "@/components/Navbar";
import { UserResponse } from "@supabase/supabase-js";

export default async function NavBarServer() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getUser();

  return <NavBar session={session} />;
}
