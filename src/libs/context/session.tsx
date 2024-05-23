"use client";
import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { createClient } from "../supabase/client";

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const supabaseClient = createClient();

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
    };

    return () => {};
  }, [session]);

  const value = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
  };

  const { data: listener } = supabaseClient.auth.onAuthStateChange(
    (_event, session) => {
      console.log("Sesion change " + _event);

      setSession(session);
      setUser(session?.user);
    }
  );

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
