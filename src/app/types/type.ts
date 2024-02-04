import { AuthError, Session, User } from "@supabase/supabase-js";

export type Inputs = {
  email: string;
  username: string;
  password: string;
};

export type Data = {
  data: {
    user: User | null;
  };
  error: AuthError | null;
};
