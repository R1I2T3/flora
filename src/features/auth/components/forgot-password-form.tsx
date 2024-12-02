"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { ForgetPasswordType, forgetPasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
const ForgotPasswordForm = () => {
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (ForgetPasswordData: ForgetPasswordType) => {
    setLoading(true);
    await authClient.forgetPassword(
      {
        email: ForgetPasswordData.email,
        redirectTo: "/agency/reset-password",
      },
      {
        onError: ({ error }) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("Reset password link sent to your email address");
        },
      }
    );
    setLoading(false);
  };
  return (
    <div>
      <Card className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto">
        <CardHeader>
          <h1 className="text-3xl font-bold m-auto">Forget Password</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormProvider {...form}>
                <Input label="Email" name="email" />
              </FormProvider>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 w-full text-white text-[16px] p-2 rounded-md"
                disabled={loading}
              >
                {loading ? "pending..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
