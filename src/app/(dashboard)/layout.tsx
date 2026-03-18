
"use client";

import { SidebarNav } from "@/components/layout/SidebarNav";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <SidebarNav />
        <SidebarInset className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
