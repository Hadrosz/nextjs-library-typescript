"use server";

import { cookies } from "next/headers";
import { Inputs } from "@/libs/types/general";
import { createClient } from "@/libs/supabase/actions";

export async function logIn(user: Inputs) {
  const cookieStore = cookies();
  const { email, password } = user;
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const getuser = await supabase.auth.getUser();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      console.log("Sesion change " + _event);
    }
  );

  console.log("user " + getuser);

  return error;
}
