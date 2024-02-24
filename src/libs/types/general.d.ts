import { AuthError, Session, User } from "@supabase/supabase-js";

export type Inputs = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type InputsComments = {
  description: string;
  stars: string;
};

export type Data = User | null;

export type Details = {
  show: boolean;
  width?: number;
  height?: number;
};
