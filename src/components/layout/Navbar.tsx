
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Search, 
  BookMarked, 
  BarChart3, 
  Bot, 
  User, 
  Settings,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Schemes", href: "/schemes", icon: Search },
  { name: "My Wallet", href: "/finance", icon: BarChart3 },
  { name: "AI Assistant", href: "/assistant", icon: Bot },
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "mr", name: "मराठी" },
  { code: "ta", name: "தமிழ்" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const userProfileRef = useMemo(() => {
    if (!auth.currentUser) return null;
    return doc(db, "users", auth.currentUser.uid);
  }, [auth.currentUser, db]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const handleLogout = async () => {
    localStorage.removeItem("demo_mode");
    await auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tighter shrink-0">
            <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white shadow-lg">G</div>
            <span className="hidden sm:inline">Gov<span className="text-primary">Fin</span>AI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Button key={item.href} variant="ghost" asChild className={cn(
                  "h-10 px-4 rounded-xl transition-all",
                  active ? "bg-primary/5 text-primary font-bold" : "text-muted-foreground hover:bg-slate-50"
                )}>
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className={cn("h-4 w-4", active ? "text-primary" : "text-slate-400")} />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 gap-2 rounded-full border border-slate-200">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <span className="text-xs font-bold">{languages.find(l => l.code === selectedLang)?.name}</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setSelectedLang(lang.code)}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="h-9 w-9 relative rounded-full border border-slate-200">
              <Bell className="h-4 w-4 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 shadow-sm border border-slate-200">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://picsum.photos/seed/${userProfile?.uid || 'user'}/100/100`} />
                  <AvatarFallback className="bg-primary text-white font-bold">{userProfile?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 rounded-2xl" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold">{userProfile?.name || "Gov User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{userProfile?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive font-bold rounded-lg">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-full border border-slate-200">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="h-16 flex items-center px-6 border-b">
                  <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white">G</div>
                    <span>GovFinAI</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {mainNavItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Button key={item.href} variant="ghost" asChild className={cn(
                        "w-full justify-start h-12 rounded-xl transition-all",
                        active ? "bg-primary/5 text-primary font-bold" : "text-slate-600"
                      )} onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href={item.href} className="flex items-center gap-3">
                          <item.icon className={cn("h-5 w-5", active ? "text-primary" : "text-slate-400")} />
                          {item.name}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
                <div className="p-4 border-t space-y-2">
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <Globe className="mr-3 h-5 w-5" /> Language
                  </Button>
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-destructive hover:bg-destructive/5 rounded-xl">
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
