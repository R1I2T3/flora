"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { SignInType, SignInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialAuth from "./SocialAuth";
import OrSeparator from "./OrSeparator";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const SignInForm = () => {
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = async (LoginFormData: SignInType) => {
    setLoading(true);
    await authClient.signIn.email(
      {
        email: LoginFormData.email,
        password: LoginFormData.password,
      },
      {
        onError: ({ error }) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("Login Success");
          router.replace("/");
        },
      }
    );
    setLoading(false);
  };
  return (
    <Card className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold m-auto">Sign In</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormProvider {...form}>
              <Input label="Email" name="email" />
              <Input label="Password" name="password" type="password" />
              <Link
                href={"/agency/forget-password"}
                className="flex justify-end  text-blue-600 my-3 text-sm hover:underline hover:underline-offset-2"
              >
                Forgot Password?
              </Link>
            </FormProvider>
            <Button
              className="bg-blue-500  hover:bg-blue-600 dark:bg-blue-600 w-full text-white text-[16px]"
              disabled={loading}
            >
              {loading ? "pending..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 w-full">
        <OrSeparator />
        <Link
          className="border-blue-500 border-2  hover:border-blue-600 dark:border-blue-600 w-full text-black text-[16px] rounded-lg py-1 text-center dark:text-white"
          href={"/agency/sign_up"}
        >
          Sign-up
        </Link>
        <SocialAuth />
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
