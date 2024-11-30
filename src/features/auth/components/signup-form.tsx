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
import { SignUpSchema, SignUpType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialAuth from "./SocialAuth";
import OrSeparator from "./OrSeparator";
const SignUpForm = () => {
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignUpType) => {};
  return (
    <Card className="w-[90%] md:w-[50%] lg:w-[40%] m-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold m-auto">SignUp</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormProvider {...form}>
              <Input label="Email" name="email" />
              <Input label="Username" name="name" />
              <Input label="Password" name="password" type="password" />
            </FormProvider>
            <Button
              className="bg-blue-500  hover:bg-blue-600 dark:bg-blue-600 w-full text-white text-[16px]"
              // disabled={isExecuting}
            >
              {false ? "pending..." : "Signup"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 w-full">
        <OrSeparator />
        <Link
          className="border-blue-500 border-2  hover:border-blue-600 dark:border-blue-600 w-full text-white text-[16px] rounded-lg py-1 text-center"
          href={"/agency/sign-in"}
          // disabled={isExecuting}
        >
          SignIn
        </Link>
        <SocialAuth />
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
