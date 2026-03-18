"use client";

import { Bell, Globe, Search as SearchIcon, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useMemo, useEffect } from "react";
import { useAuth, useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";
import { useRouter } from "next/navigation";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "mr", name: "मराठी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "gu", name: "ગુજરાતી" },
];

export function DashboardHeader() {
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`h-16 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 transition-all ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="flex items-center gap-6">
        <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors" />
        <div className="hidden lg:flex relative max-w-sm">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search schemes or transactions..." 
            className="pl-10 w-[320px] bg-slate-100/50 border-none focus-visible:ring-primary/30 h-10 rounded-full" 
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-full p-1 border border-slate-200/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-2 px-3 hover:bg-white rounded-full transition-all">
                <Globe className="h-4 w-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-700">
                  {languages.find(l => l.code === selectedLang)?.name || "English"}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setSelectedLang(lang.code)} className="rounded-lg">
                  <span className={`text-sm ${selectedLang === lang.code ? "font-bold text-primary" : "text-slate-600"}`}>
                    {lang.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="ghost" size="icon" className="h-10 w-10 relative rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background animate-pulse"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-primary/20 transition-all shadow-sm">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://picsum.photos/seed/${userProfile?.uid || 'user'}/100/100`} alt={userProfile?.name || "User"} />
                <AvatarFallback className="bg-primary text-white font-bold">{userProfile?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2 rounded-2xl shadow-xl" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold leading-none">{userProfile?.name || "Gov User"}</p>
                  <Badge variant="secondary" className="text-[8px] h-4 py-0 bg-primary/10 text-primary border-none">PREMIUM</Badge>
                </div>
                <p className="text-xs leading-none text-muted-foreground font-medium">{userProfile?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <DropdownMenuItem className="rounded-lg p-2.5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">Account Settings</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg p-2.5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="font-medium text-sm">Help & Support</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <DropdownMenuItem className="text-destructive rounded-lg p-2.5 cursor-pointer hover:bg-destructive/10" onClick={handleLogout}>
                <span className="font-bold text-sm">Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}