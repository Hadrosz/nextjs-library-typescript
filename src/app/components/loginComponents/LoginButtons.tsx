"use client";
import { GitHubSVG, DiscordSVG } from "@/app/assets/FormsAsset";
import { createClient } from "@/app/utils/supabase/client";

export const GitHubButton = () => {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "/auth/callback",
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      type="button"
      className="text-white bg-[#24292F]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2 justify-center"
    >
      <GitHubSVG />
      Sign in with Github
    </button>
  );
};

export const DiscordButton = () => {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "/auth/callback",
      },
    });
  };
  return (
    <button
      onClick={handleSignIn}
      type="button"
      className="text-white  bg-[#7289DA] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center me-2 mb-2 justify-center"
    >
      <DiscordSVG />
      Sign in with Discord
    </button>
  );
};
