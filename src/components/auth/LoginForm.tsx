import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  agency: z.string({
    required_error: "Please select a government agency",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit?: (values: FormValues) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm = ({
  onSubmit = () => {},
  isLoading = false,
  error = null,
}: LoginFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agency: "",
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    // In a real app, this would authenticate with a backend
    console.log("Login attempt:", values);
    onSubmit(values);
  };

  return (
    <div>
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex justify-center mb-4">
          <img
            src="/ghana-road-watch-logo.svg"
            alt="Ghana Road Watch Logo"
            className="h-24 w-24"
            style={{ objectFit: "contain" }}
          />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Ghana Road Watch App
        </CardTitle>
        <CardDescription className="text-center">
          Government Stakeholder Portal Login
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="agency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Government Agency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your agency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dvla">
                        Driver and Vehicle Licensing Authority (DVLA)
                      </SelectItem>
                      <SelectItem value="mttd">
                        Motor Traffic and Transport Department (MTTD)
                      </SelectItem>
                      <SelectItem value="rsc">
                        Road Safety Commission
                      </SelectItem>
                      <SelectItem value="mrt">
                        Ministry of Roads and Transport
                      </SelectItem>
                      <SelectItem value="whistleblower">
                        Whistleblower Portal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 px-0">
        <div className="text-sm text-center text-gray-500">
          Secure government access only. Unauthorized access is prohibited.
        </div>
        <div className="text-xs text-center text-gray-400">
          For demo: username "admin" and password "password123"
        </div>
        {error && (
          <div className="mt-2 text-sm text-center text-red-500">{error}</div>
        )}
      </CardFooter>
    </div>
  );
};

export default LoginForm;
