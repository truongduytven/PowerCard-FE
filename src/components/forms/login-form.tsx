"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../ui/password-input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/authStore";
import { useContext } from "react";
import { GlobalState } from "@/contexts/globalState";
import Spinner from "../ui/spinner";

// 1. Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải ít nhất 6 ký tự" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn, loading, error } = useAuthStore();
  const { NextPageReplace } = useContext(GlobalState);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    await signIn(email, password);
    if (!error) {
      form.reset();
      NextPageReplace("/home");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col items-center">
          <img src='/Logo.png' alt="Logo" className="w-20 h-20" />
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Chào mừng bạn trở lại! Vui lòng đăng nhập.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Nhập mật khẩu" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                className="relative group bg-linear-to-r from-primary-radiant-start to-primary-radiant-end text-white shadow-radiant-lg transition-all hover:shadow-radiant-md focus:outline-none focus:ring-4 focus:ring-primary/50"
                disabled={loading}
                type="submit"
              >
                Đăng nhập {loading && (<Spinner className="size-4"/>)}
              </Button>
              <div className="text-center text-sm">
                Bạn chưa có tài khoản?{" "}
                <div className="underline inline cursor-pointer" onClick={() => 
                  NextPageReplace("/sign-up")
                }>
                  Đăng ký
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
