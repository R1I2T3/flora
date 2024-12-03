import React from "react";
import { validatePage } from "@/lib/auth/validate";
const TemplateForAuth = async ({ children }: { children: React.ReactNode }) => {
  await validatePage();
  return <div>{children}</div>;
};

export default TemplateForAuth;
