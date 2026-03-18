
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    try {
      // Using a standard demo account
      await signInWithEmailAndPassword(auth, "demo@govfin.ai", "password123");
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Demo login failed",
        description: "Please try regular login or register.",
      });
    } finally {
      setIsDemoLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-background">
      <div className="hidden md:flex flex-1 flex-col items-center justify-center indigo-gradient p-12 text-white relative">
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        <div className="max-w-md text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-8 mx-auto backdrop-blur shadow-xl border border-white/20">
            <span className="text-3xl font-bold">G</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Welcome back to GovFinAI</h1>
          <p className="text-lg opacity-90 mb-12">
            Manage your personal finances and discover government benefits tailored just for you.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur border border-white/10 shadow-lg">
              <h3 className="font-semibold text-white">1200+ Schemes</h3>
              <p className="text-sm opacity-70">Always up to date</p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur border border-white/10 shadow-lg">
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <p className="text-sm opacity-70">7 Regional languages</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
            <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
          </div>

          <div className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Button variant="link" size="sm" className="px-0 font-normal">Forgot password?</Button>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full shadow-md" disabled={isLoading || isDemoLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>

            <Button 
              variant="outline" 
              className="w-full border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-semibold"
              onClick={handleDemoLogin}
              disabled={isLoading || isDemoLoading}
            >
              {isDemoLoading ? "Setting up demo..." : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try Demo Login
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full" onClick={loginWithGoogle} disabled={isLoading || isDemoLoading}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
