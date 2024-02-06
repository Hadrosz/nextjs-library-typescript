"use server";

import { cookies } from "next/headers";
import { Inputs } from "@/libs/types/general";
import { createClient } from "@/libs/supabase/actions";

export async function logIn(user: Inputs) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(user);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  return error;
}
