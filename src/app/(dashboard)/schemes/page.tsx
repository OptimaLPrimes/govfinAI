
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Sparkles, ArrowRight, Loader2, Building2 } from "lucide-react";
import Link from "next/link";

const categories = ["Agriculture", "Education", "Health", "Housing", "Women & Child", "Employment", "Pension", "Business"];

const realSchemes = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture",
    description: "Direct financial assistance of ₹6,000 per year provided in three equal installments to all landholding farmer families.",
    match: "98%",
    type: "Central Sector"
  },
  {
    id: "pmjay",
    name: "Ayushman Bharat (PM-JAY)",
    ministry: "Ministry of Health & Family Welfare",
    category: "Health",
    description: "Providing health coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor families.",
    match: "95%",
    type: "Health Insurance"
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    ministry: "Ministry of Housing & Urban Affairs",
    category: "Housing",
    description: "Aims to provide 'Housing for All' by providing central assistance to implementing agencies for constructing houses for eligible families.",
    match: "92%",
    type: "Housing Support"
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi Yojana",
    ministry: "Ministry of Finance",
    category: "Women & Child",
    description: "A high-interest savings scheme for the girl child, offering tax benefits and financial security for education and marriage.",
    match: "88%",
    type: "Savings Scheme"
  },
  {
    id: "pmmy",
    name: "PM Mudra Yojana",
    ministry: "Ministry of Finance",
    category: "Business",
    description: "Loans up to ₹10 lakh provided to non-corporate, non-farm small/micro enterprises for generating employment and income.",
    match: "90%",
    type: "Business Loan"
  },
  {
    id: "apy",
    name: "Atal Pension Yojana",
    ministry: "Ministry of Finance",
    category: "Pension",
    description: "Social security scheme for unorganized sector workers, providing a guaranteed minimum pension of ₹1,000 to ₹5,000 after reaching 60.",
    match: "85%",
    type: "Social Security"
  },
  {
    id: "pmjdy",
    name: "PM Jan Dhan Yojana",
    ministry: "Ministry of Finance",
    category: "Pension",
    description: "National Mission for Financial Inclusion to ensure access to financial services like banking, savings, and insurance.",
    match: "100%",
    type: "Financial Inclusion"
  },
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture",
    description: "Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.",
    match: "94%",
    type: "Crop Insurance"
  }
];

export default function SchemesPage() {
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAiMatch = () => {
    setIsAiMatching(true);
    setTimeout(() => setIsAiMatching(false), 2000);
  };

  const filteredSchemes = realSchemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scheme Finder</h1>
          <p className="text-muted-foreground mt-1">Discover 1,200+ central and state government benefits tailored for you.</p>
        </div>
        <Button size="lg" className="indigo-gradient hover:opacity-90 shadow-lg shadow-primary/20" onClick={handleAiMatch} disabled={isAiMatching}>
          {isAiMatching ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Profile...</>
          ) : (
            <><Sparkles className="mr-2 h-5 w-5" /> AI Auto-Match</>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Panel */}
        <aside className="w-full lg:w-72 space-y-6 shrink-0">
          <Card className="border-none shadow-sm sticky top-24">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">Smart Filters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search schemes..." 
                    className="pl-9 bg-muted/50 border-none h-10" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Categories</Label>
                <div className="grid grid-cols-1 gap-2.5">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2.5">
                      <Checkbox id={cat} className="rounded-md" />
                      <label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer hover:text-primary transition-colors">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Annual Income</Label>
                  <span className="text-xs font-bold text-primary">₹5L</span>
                </div>
                <Slider defaultValue={[5]} max={15} step={0.5} className="py-2" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">State</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-muted/50 border-none h-10">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All of India</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="ka">Karnataka</SelectItem>
                    <SelectItem value="tn">Tamil Nadu</SelectItem>
                    <SelectItem value="dl">Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full border-dashed">Reset Filters</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border/40">
            <p className="text-sm font-medium">
              Showing <span className="text-primary font-bold">{filteredSchemes.length}</span> recommended schemes
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase">Sort:</span>
              <Select defaultValue="match">
                <SelectTrigger className="w-[140px] h-9 border-none bg-muted/50 font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="applied">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative border border-border/50">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold px-3 py-1">
                    {scheme.match} Match
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary" className="w-fit bg-primary/5 text-primary border-none text-[10px] font-bold uppercase tracking-wider">
                      {scheme.category}
                    </Badge>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors mt-1 leading-tight">
                      {scheme.name}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium truncate">{scheme.ministry}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {scheme.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200">{scheme.type}</Badge>
                    <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200">Active</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-4 pb-6 px-6 border-t border-border/30 mt-auto bg-slate-50/50 dark:bg-muted/10">
                  <Button asChild className="flex-1 shadow-sm font-bold">
                    <Link href={`/schemes/${scheme.id}`}>View Eligibility</Link>
                  </Button>
                  <Button variant="outline" size="icon" className="group-hover:border-primary group-hover:text-primary transition-all shadow-sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-sm border border-border/40">
              <Button variant="ghost" size="sm" className="w-9 h-9 font-bold" disabled>Prev</Button>
              {[1, 2, 3, "...", 12].map((p, i) => (
                <Button key={i} variant={p === 1 ? "default" : "ghost"} size="sm" className={`w-9 h-9 font-bold ${p === 1 ? 'shadow-md shadow-primary/20' : ''}`}>
                  {p}
                </Button>
              ))}
              <Button variant="ghost" size="sm" className="w-9 h-9 font-bold">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

