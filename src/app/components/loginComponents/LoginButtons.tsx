"use client";
import { GitHubSVG, GoogleSVG } from "@/app/assets/FormsAsset";

export const GitHubButton = () => {
  return (
    <button
      onClick={() => {
        alert("Login...");
      }}
      type="button"
      className="text-white bg-[#24292F]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2 justify-center"
    >
      <GitHubSVG />
      Sign in with Github
    </button>
  );
};

export const GoogleButton = () => {
  return (
    <button
      onClick={() => {
        alert("Login...");
      }}
      type="button"
      className="text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center me-2 mb-2 justify-center"
    >
      <GoogleSVG />
      Sign in with Google
    </button>
  );
};
