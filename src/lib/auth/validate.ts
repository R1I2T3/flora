"use server";

import { auth } from "./server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const validatePage = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/agency/sign-in");
  }
  return session;
};
