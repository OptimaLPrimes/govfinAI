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
  Sun,
  Zap,
  Bot,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white shadow-lg">G</div>
            <span>Gov<span className="text-primary">Fin</span>AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#impact" className="text-sm font-medium hover:text-primary transition-colors">Impact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </Button>
            <Button asChild className="indigo-gradient hover:opacity-90 transition-all hover:scale-105 active:scale-95 px-6 rounded-xl font-bold">
              <Link href="/dashboard">Launch App</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Visual Elements */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Next-Gen Financial Inclusion</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] text-slate-900 dark:text-white">
                Empowering <br />
                <span className="text-transparent bg-clip-text indigo-gradient">Bharat</span> with AI.
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Bridge the gap between complexity and benefits. GovFinAI matches you with 1,200+ schemes and simplifies personal finance in your regional language.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button size="lg" asChild className="indigo-gradient h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:translate-y-[-4px] font-bold group">
                  <Link href="/dashboard">
                    Get Started Free 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-2xl border-border bg-background/50 backdrop-blur-md hover:bg-muted font-bold transition-all" asChild>
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-border/40 max-w-md">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background overflow-hidden">
                      <Image src={`https://picsum.photos/seed/${i + 10}/100/100`} width={40} height={40} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Joined by <span className="text-foreground font-bold">10,000+</span> citizens this month
                </p>
              </div>
            </div>

            {/* Hero Visual Animation */}
            <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
              {/* Main Image Container */}
              <div className="relative z-10 p-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="relative overflow-hidden rounded-[2.5rem]">
                  <Image 
                    src="https://picsum.photos/seed/fintech-hero/1200/900" 
                    width={1200} 
                    height={900} 
                    alt="Hero Visualization" 
                    className="object-cover"
                    data-ai-hint="financial technology"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
                </div>
              </div>

              {/* Floating Insight Cards */}
              <div className="absolute -top-10 -right-10 glass-morphism p-5 rounded-3xl animate-float z-20 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live Match</span>
                </div>
                <p className="text-sm font-bold">PM Kisan Eligible!</p>
                <p className="text-[10px] text-muted-foreground mt-1">Found 14 matching schemes based on your profile.</p>
              </div>

              <div className="absolute top-1/2 -left-16 glass-morphism p-5 rounded-3xl animate-float animation-delay-2000 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-indigo-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Savings AI</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black">₹4.2k</span>
                  <span className="text-[10px] text-emerald-500 font-bold">+12%</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Monthly savings potential identified.</p>
              </div>

              <div className="absolute -bottom-8 right-10 glass-morphism p-4 rounded-[2rem] animate-float animation-delay-4000 z-20 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl indigo-gradient flex items-center justify-center text-white shadow-xl">
                  <Languages className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold">Multilingual AI</p>
                  <p className="text-[10px] text-muted-foreground">Available in 7+ languages</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-slate-50 dark:bg-slate-900/50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Built for Inclusivity.</h2>
              <p className="text-xl text-muted-foreground font-medium">We've combined deep government insights with state-of-the-art AI to serve every citizen.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Scheme Discovery",
                  desc: "Our AI analyzes 1,200+ schemes to find the exact ones you qualify for instantly.",
                  icon: Search,
                  color: "bg-blue-600",
                  delay: "0ms"
                },
                {
                  title: "Vernacular AI Support",
                  desc: "Chat, ask questions, and get policy summaries in Hindi, Marathi, Tamil, and more.",
                  icon: Bot,
                  color: "bg-purple-600",
                  delay: "200ms"
                },
                {
                  title: "Insightful Wallet",
                  desc: "Track every rupee with automated categorization and personalized saving nudges.",
                  icon: TrendingUp,
                  color: "bg-emerald-600",
                  delay: "400ms"
                }
              ].map((f, i) => (
                <div key={i} className="group glass-morphism p-10 rounded-[2.5rem] hover:translate-y-[-10px] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: f.delay }}>
                  <div className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xl`}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="glass-morphism p-12 md:p-20 rounded-[4rem] relative overflow-hidden indigo-gradient text-white">
              <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <Heart className="w-96 h-96 animate-pulse" />
              </div>
              <div className="relative z-10 max-w-3xl space-y-8">
                <h2 className="text-4xl md:text-7xl font-black leading-[0.9]">Real impact on <br />real lives.</h2>
                <p className="text-xl md:text-2xl text-white/80 font-medium">
                  GovFinAI is dedicated to ensuring that no citizen misses out on their entitled benefits due to a language barrier or lack of information.
                </p>
                <div className="flex flex-wrap gap-10 pt-8">
                  <div>
                    <h4 className="text-5xl font-black">₹12Cr+</h4>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mt-2">Benefit Potential Identified</p>
                  </div>
                  <div>
                    <h4 className="text-5xl font-black">1.2k</h4>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mt-2">Verified Schemes</p>
                  </div>
                </div>
                <Button size="lg" variant="secondary" className="h-16 px-10 rounded-2xl bg-white text-indigo-600 font-black hover:bg-white/90 shadow-2xl mt-8" asChild>
                  <Link href="/dashboard">Join the Movement</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t bg-slate-50 dark:bg-black/20 border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-2xl tracking-tighter mb-8">
            <div className="w-10 h-10 rounded-xl indigo-gradient flex items-center justify-center text-white shadow-lg">G</div>
            <span>GovFinAI Assistant</span>
          </div>
          <p className="text-muted-foreground max-w-sm mx-auto mb-10 font-medium">Making financial inclusion a reality for 1.4 billion people, one interaction at a time.</p>
          <div className="pt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] border-t border-border/40">
            © {new Date().getFullYear()} GovFinAI Assistant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}