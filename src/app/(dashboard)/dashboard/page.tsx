"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth, useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Bot,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Clock,
  LayoutGrid,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Link from "next/link";

const chartData = [
  { name: "Mon", amount: 2400 },
  { name: "Tue", amount: 1398 },
  { name: "Wed", amount: 9800 },
  { name: "Thu", amount: 3908 },
  { name: "Fri", amount: 4800 },
  { name: "Sat", amount: 3800 },
  { name: "Sun", amount: 4300 },
];

export default function DashboardPage() {
  const auth = useAuth();
  const db = useFirestore();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  
  const userProfileRef = useMemo(() => {
    // Crucial: check if db is a real Firestore instance before calling doc()
    if (!auth.currentUser || !db || (db as any).__isMock) return null;
    try {
      return doc(db, "users", auth.currentUser.uid);
    } catch (e) {
      console.warn("Failed to create doc reference:", e);
      return null;
    }
  }, [auth.currentUser, db]);

  const { data: profile, loading } = useDoc<UserProfile>(userProfileRef);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const profileCompleteness = useMemo(() => {
    if (!profile) return 0;
    const fields = ['name', 'state', 'age', 'income', 'occupation', 'casteCategory', 'gender', 'familySize'];
    const filledFields = fields.filter(field => !!(profile as any)[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  }, [profile]);

  const metrics = [
    { title: "Eligible Schemes", value: "14", change: "+2", icon: ShieldCheck, color: "text-accent bg-accent/10" },
    { title: "Monthly Savings", value: "₹4,200", change: "12%", icon: TrendingUp, color: "text-primary bg-primary/10" },
    { title: "AI Insights", value: "8", change: "+1", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    { title: "Pending Claims", value: "2", change: "0", icon: Clock, color: "text-slate-600 bg-slate-100" },
  ];

  if (!mounted) return null;

  if (loading && userProfileRef) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-muted-foreground animate-pulse">Analyzing your financial world...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl indigo-gradient p-8 md:p-12 text-white shadow-2xl transition-all duration-500 hover:shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <Badge className="mb-4 bg-white/20 text-white border-none backdrop-blur-md animate-in slide-in-from-top-4 duration-700">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight animate-in slide-in-from-left-4 duration-700">
            Welcome back, {profile?.name || "User"}
          </h1>
          <p className="mt-2 text-white/80 text-lg animate-in slide-in-from-left-4 duration-700 delay-100">
            {currentDate}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8 transition-transform hover:scale-105 active:scale-95">
              <Link href="/schemes"><Search className="mr-2 h-5 w-5" /> Find Schemes</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-white border border-white/20 backdrop-blur-md transition-transform hover:scale-105 active:scale-95">
              <Link href="/finance"><Plus className="mr-2 h-5 w-5" /> Track Expense</Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
          <Bot className="w-full h-full transform translate-x-1/4 animate-pulse" />
        </div>
      </div>

      {/* Profile & Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 border-none shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center justify-between">
              Profile Score
              <Badge variant="outline" className="text-primary border-primary/20">{profileCompleteness}%</Badge>
            </CardTitle>
            <CardDescription>Complete profile for better accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={profileCompleteness} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Add your <span className="text-foreground font-medium">family details</span> to unlock more eligible schemes.
            </p>
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300" asChild>
              <Link href="/profile">Complete Profile <ChevronRight className="ml-2 h-3 w-3" /></Link>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.slice(0, 3).map((m, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-default animate-in fade-in slide-in-from-right-4" style={{ animationDelay: `${i * 100}ms` }}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{m.title}</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tight">{m.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`text-xs font-bold flex items-center ${m.change.startsWith('+') || m.change.includes('%') ? 'text-accent' : 'text-slate-500'}`}>
                        {m.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : null}
                        {m.change}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">this month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${m.color} transition-transform group-hover:rotate-12`}>
                    <m.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Charts & AI Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Spending Trends</CardTitle>
              <CardDescription>Overview of your daily financial activity.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5" asChild>
              <Link href="/finance">Detailed View</Link>
            </Button>
          </CardHeader>
          <CardContent className="h-[320px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip 
                  cursor={{fill: 'currentColor', opacity: 0.05}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 2 ? '#4F46E5' : '#e2e8f0'} 
                      className="transition-all duration-300 hover:fill-primary"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg accent-gradient text-white flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md transition-transform group-hover:rotate-12">
                <Bot className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">AI Financial Coach</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 animate-in fade-in duration-1000">
              <p className="text-white/90 leading-relaxed font-medium italic">
                "Allocate an extra <span className="text-white font-bold underline decoration-white/50">₹500</span> to your savings to reach your goal 4 months early."
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">Top Suggestion</h4>
              <div className="flex items-center gap-3 bg-black/10 rounded-xl p-3 transition-colors hover:bg-black/20 cursor-pointer">
                <ShieldCheck className="h-5 w-5 text-white/90" />
                <span className="text-sm font-medium">Verify PM Kisan eligibility</span>
              </div>
            </div>
          </CardContent>
          <CardContent className="pt-0 pb-6">
            <Button variant="secondary" className="w-full bg-white text-emerald-600 font-bold hover:bg-white/90 shadow-xl transition-all duration-300 hover:scale-[1.02]" asChild>
              <Link href="/assistant">Chat with AI Assistant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Recommended & Recent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
            <div>
              <CardTitle className="text-lg">Top Recommended Schemes</CardTitle>
              <CardDescription>Tailored matches for your profile</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-semibold" asChild>
              <Link href="/schemes">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y divide-border/30 p-0">
            {[
              { name: "PM Kisan", ministry: "Agriculture", match: "98%", initial: "P" },
              { name: "Ayushman Bharat", ministry: "Health", match: "95%", initial: "A" },
              { name: "Mudra Loan", ministry: "MSME", match: "92%", initial: "M" },
            ].map((scheme, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {scheme.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{scheme.name}</h4>
                    <p className="text-xs text-muted-foreground">Ministry of {scheme.ministry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100">{scheme.match} Match</Badge>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">Auto-Eligible</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border/30">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Your latest financial interactions</CardDescription>
          </CardHeader>
          <CardContent className="p-6 relative">
            <div className="space-y-8">
              {[
                { text: "Viewed eligible schemes", time: "2 hours ago", icon: LayoutGrid, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
                { text: "Checked eligibility for PM Awas Yojana", time: "5 hours ago", icon: Search, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
                { text: "AI Assistant suggested a budget revision", time: "Yesterday", icon: Bot, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
                { text: "Updated profile information", time: "2 days ago", icon: LayoutGrid, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 relative animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                  {i !== 3 && <div className="absolute top-10 left-5 w-px h-6 bg-border/30" />}
                  <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center shrink-0 transition-transform hover:scale-110`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-none mb-1.5">{activity.text}</p>
                    <p className="text-xs text-muted-foreground font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
