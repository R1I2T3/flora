import { ModeToggle } from "@/components/ThemeToggle";
import React from "react";

const AgencyAuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-full flex flex-col">
      <nav className="mt-2 flex justify-end">
        <ModeToggle />
      </nav>
      <section className="w-full flex flex-grow justify-center items-center ">
        {children}
      </section>
    </main>
  );
};

export default AgencyAuthLayout;
