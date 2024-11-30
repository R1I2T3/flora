import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
const SocialAuth = () => {
  return (
    <Button className="bg-background hover:bg-background border-blue-600 border-2 text-center w-full py-1 rounded-xl">
      <FcGoogle className="mr-2" size={20} />
    </Button>
  );
};

export default SocialAuth;
