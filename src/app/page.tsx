"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Languages, 
  Search, 
  ArrowRight,
  Moon,
  Sun
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white shadow-lg">G</div>
            <span>Gov<span className="text-primary">Fin</span>AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#schemes" className="text-sm font-medium hover:text-primary transition-colors">Schemes</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button asChild className="indigo-gradient hover:opacity-90 transition-all hover:scale-105 active:scale-95 px-6">
              <Link href="/dashboard">Enter App</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -z-10 rounded-l-[100px] hidden lg:block dark:bg-primary/10"></div>
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <Badge className="bg-primary/10 text-primary border-none py-1.5 px-4 rounded-full dark:bg-primary/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Empowering 1.4 Billion Citizens
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Financial Freedom for <span className="text-primary">Every Indian.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                GovFinAI uses advanced AI to bridge the gap between government benefits and you. Discover schemes, track finances, and get expert advice in your language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="indigo-gradient h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px]">
                  <Link href="/dashboard">Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-border bg-background hover:bg-muted" asChild>
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30 dark:opacity-20"></div>
              <div className="relative z-10 p-2 bg-background/50 backdrop-blur-md border border-border/50 rounded-[2.5rem] shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/fintech/1200/800" 
                  width={1200} 
                  height={800} 
                  alt="Hero" 
                  className="rounded-[2rem] shadow-2xl"
                  data-ai-hint="financial technology"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-border animate-bounce-slow dark:bg-card/90">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Average Savings</p>
                    <p className="text-xl font-bold">₹4,500/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-muted/30 dark:bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need for financial inclusion</h2>
              <p className="text-lg text-muted-foreground">We combine government data with cutting-edge AI to make complex financial systems simple for everyone.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Scheme Matching",
                  desc: "Instantly find government welfare schemes you're eligible for based on your unique profile.",
                  icon: Search,
                  color: "bg-blue-500"
                },
                {
                  title: "Multilingual Assistant",
                  desc: "Get financial advice and policy explanations in Hindi, Marathi, Tamil, and 7 other regional languages.",
                  icon: Languages,
                  color: "bg-purple-500"
                },
                {
                  title: "Smart Finance Tracker",
                  desc: "Automated categorization and AI insights to help you save more and spend wiser.",
                  icon: TrendingUp,
                  color: "bg-emerald-500"
                }
              ].map((f, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group border border-border hover:translate-y-[-4px] duration-300 animate-in fade-in slide-in-from-bottom-8 dark:bg-card/20 dark:hover:border-primary/30" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-muted/50 dark:bg-muted/5 border-border/50">
        <div className="container mx-auto px-4">
          <div className="pt-8 text-center text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} GovFinAI Assistant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
