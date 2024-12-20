"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
const Navigation = () => {
  const { data } = authClient.useSession();

  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={"./assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="logo"
        />
        <span className="text-xl font-bold">Flora</span>
      </aside>
      <aside className="flex gap-2 items-center">
        {data?.session ? (
          <Button
            className="bg-primary text-white p-2 px-4  rounded-md hover:bg-primary/50"
            onClick={async () => await authClient.signOut()}
          >
            Sign out
          </Button>
        ) : (
          <Link
            href={"/agency/sign-in"}
            className="bg-primary text-white p-2 px-4  rounded-md hover:bg-primary/50"
          >
            Login
          </Link>
        )}

        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
