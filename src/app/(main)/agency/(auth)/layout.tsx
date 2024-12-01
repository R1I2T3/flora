import { ModeToggle } from "@/components/ThemeToggle";
import React from "react";

const AgencyAuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <nav className="mt-2 flex justify-end">
        <ModeToggle />
      </nav>
      <section className="w-full h-[80%] flex justify-center items-center">
        {children}
      </section>
    </main>
  );
};

export default AgencyAuthLayout;
