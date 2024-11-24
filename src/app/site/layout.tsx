import React from "react";
import Navigation from "@/features/site/components/navigation";
const SiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-full">
      <Navigation />
      {children}
    </main>
  );
};

export default SiteLayout;
