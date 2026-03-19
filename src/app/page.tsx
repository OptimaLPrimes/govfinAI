
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
  CheckCircle2,
  Bot
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white shadow-lg">G</div>
            <span>Gov<span className="text-primary">Fin</span>AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#schemes" className="text-sm font-medium hover:text-primary transition-colors">Schemes</Link>
            <Link href="#security" className="text-sm font-medium hover:text-primary transition-colors">Security</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="indigo-gradient hover:opacity-90">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[100px] hidden lg:block"></div>
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary/10 text-primary border-none py-1.5 px-4 rounded-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Empowering 1.4 Billion Citizens
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Financial Freedom for <span className="text-primary">Every Indian.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                GovFinAI uses advanced AI to bridge the gap between government benefits and you. Discover schemes, track finances, and get expert advice in your language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="indigo-gradient h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20">
                  <Link href="/login">Start Your Journey <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-slate-200">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <Image src={`https://picsum.photos/seed/${i+10}/100/100`} width={40} height={40} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Joined by <span className="font-bold text-slate-900">50,000+</span> citizens this month
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
              <Image 
                src="https://picsum.photos/seed/fintech/1200/800" 
                width={1200} 
                height={800} 
                alt="Hero" 
                className="rounded-3xl shadow-2xl relative z-10"
                data-ai-hint="financial technology"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Average Savings</p>
                    <p className="text-xl font-bold text-slate-900">₹4,500/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
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
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group border border-slate-100">
                  <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <Image 
                src="https://picsum.photos/seed/benefits/600/400" 
                width={600} 
                height={400} 
                alt="Security" 
                className="rounded-3xl shadow-2xl"
                data-ai-hint="social welfare"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="bg-emerald-50 text-emerald-600 w-fit px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Trusted Security
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Your data is safe, secure, and private.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We use bank-grade encryption and strictly adhere to Indian data privacy norms. Your financial data is only used to provide you with better insights and never shared without consent.
              </p>
              <ul className="space-y-4">
                {["AES-256 Encryption", "Biometric Authentication Ready", "GDPR & Indian DPDP Compliant", "Zero-Knowledge Data Processing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="indigo-gradient rounded-[40px] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ready to transform your financial future?</h2>
                <p className="text-xl text-white/80">Join thousands of Indians who are already using AI to unlock their full financial potential.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild className="h-16 px-10 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform">
                    <Link href="/login">Create Free Account</Link>
                  </Button>
                  <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20">
                    <Link href="/assistant">Talk to Assistant</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="w-8 h-8 rounded-lg indigo-gradient flex items-center justify-center text-white">G</div>
                <span>GovFinAI</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bridging the gap between technology and financial inclusion for the next billion users in India.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/schemes" className="hover:text-primary transition-colors">Scheme Matching</Link></li>
                <li><Link href="/finance" className="hover:text-primary transition-colors">Expense Tracking</Link></li>
                <li><Link href="/assistant" className="hover:text-primary transition-colors">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>support@govfin.ai</li>
                <li>Bengaluru, India</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} GovFinAI Assistant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
