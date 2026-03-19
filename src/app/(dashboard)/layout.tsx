
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);
  const [checkFinished, setCheckFinished] = useState(false);

  useEffect(() => {
    // Check if we are in demo mode
    const demoMode = localStorage.getItem("demo_mode") === "true";
    setIsDemo(demoMode);
    
    if (!loading) {
      if (!user && !demoMode) {
        router.push("/login");
      }
      setCheckFinished(true);
    }
  }, [user, loading, router]);

  if (loading || !checkFinished) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading GovFinAI...</p>
      </div>
    );
  }

  // Allow access if user is logged in OR demo mode is active
  if (!user && !isDemo) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
      <footer className="py-8 border-t bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground font-medium">
          © {new Date().getFullYear()} GovFinAI Assistant. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
