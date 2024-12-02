"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { ResetPasswordType, resetPasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit = async (resetPasswordData: ResetPasswordType) => {
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      toast.error("Password does not match");
      return;
    } else {
      setLoading(true);
      await authClient.resetPassword(
        {
          newPassword: resetPasswordData.newPassword,
        },
        {
          onError: ({ error }) => {
            toast.error(error.message);
          },
          onSuccess: () => {
            toast.success("Password reset successfully");
            router.replace("/agency/sign-in");
          },
        }
      );
      setLoading(false);
    }
  };
  return (
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
              <Input label="New Password" name="newPassword" type="password" />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
            </FormProvider>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 w-full text-white text-[16px] p-2 rounded-md"
              disabled={loading}
            >
              {loading ? "pending..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
