
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { UserProfile, Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Bot,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Clock,
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const metrics = [
    { title: "Eligible Schemes", value: "14", change: "+2", icon: ShieldCheck, color: "text-accent bg-accent/10" },
    { title: "Monthly Savings", value: "₹4,200", change: "12%", icon: TrendingUp, color: "text-primary bg-primary/10" },
    { title: "AI Insights", value: "8", change: "+1", icon: Zap, color: "text-warning bg-warning/10" },
    { title: "Pending Claims", value: "2", change: "0", icon: Clock, color: "text-slate-600 bg-slate-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning, {profile?.name || "User"}</h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/finance/transactions"><Plus className="mr-2 h-4 w-4" /> Add Expense</Link>
          </Button>
          <Button asChild>
            <Link href="/schemes"><Search className="mr-2 h-4 w-4" /> Find Schemes</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{m.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{m.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {m.change.startsWith('+') || m.change.includes('%') ? (
                      <ArrowUpRight className="h-4 w-4 text-accent" />
                    ) : (
                      <Clock className="h-4 w-4 text-slate-400" />
                    )}
                    <span className="text-xs font-medium">{m.change} this month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${m.color}`}>
                  <m.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Visualizing your daily expenses across the current week.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#4F46E5' : '#E2E8F0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm indigo-gradient text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg">AI Tip of the Day</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/90 leading-relaxed italic">
              "Based on your recent savings trend, if you allocate an extra ₹500 to your Sukanya Samriddhi account this month, you could reach your education goal 4 months earlier."
            </p>
            <Button variant="secondary" className="w-full bg-white text-primary font-bold hover:bg-white/90">
              Check Schemes
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended Schemes</CardTitle>
              <CardDescription>Top matches based on your profile</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild><Link href="/schemes">View All</Link></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                    {i === 0 ? "P" : i === 1 ? "A" : "M"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{i === 0 ? "PM Kisan" : i === 1 ? "Ayushman Bharat" : "Mudra Loan"}</h4>
                    <p className="text-xs text-muted-foreground">Ministry of Agriculture</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">98% Match</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with GovFinAI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { text: "Added transaction: ₹450 at Grocery", time: "2 hours ago" },
              { text: "Checked eligibility for PM Awas Yojana", time: "5 hours ago" },
              { text: "AI Assistant suggested a budget revision", time: "Yesterday" },
              { text: "Updated profile information", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {i !== 3 && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-muted" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
