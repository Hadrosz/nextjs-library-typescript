import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import NavBar from "@/app/components/Navbar";

export default async function NavBarServer() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getUser();
  console.log(session.data);

  return <NavBar session={session} />;
}
