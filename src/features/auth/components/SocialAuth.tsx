import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth/client";
const SocialAuth = () => {
  const onClick = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };
  return (
    <Button
      className="bg-background hover:bg-background border-blue-600 border-2 text-center w-full py-1 rounded-xl"
      onClick={onClick}
    >
      <FcGoogle className="mr-2" size={20} />
    </Button>
  );
};

export default SocialAuth;
