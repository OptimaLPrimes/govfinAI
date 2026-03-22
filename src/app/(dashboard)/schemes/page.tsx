"use client";

import { useState, useMemo, useEffect } from "react";
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
import { useAuth, useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";
import { schemeEligibility, SchemeEligibilityOutput } from "@/genkit-flows/schemeEligibility";
import { useToast } from "@/hooks/use-toast";

const categories = ["Agriculture", "Education", "Health", "Housing", "Women & Child", "Employment", "Pension", "Business"];

const realSchemes = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture",
    description: "Direct financial assistance of ₹6,000 per year provided in three equal installments to all landholding farmer families.",
    type: "Central Sector",
    eligibilityCriteria: {
      occupation: "Farmer",
      income: "Small/Marginal farmers",
    }
  },
  {
    id: "pmjay",
    name: "Ayushman Bharat (PM-JAY)",
    ministry: "Ministry of Health & Family Welfare",
    category: "Health",
    description: "Providing health coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 12 crore poor families.",
    type: "Health Insurance",
    eligibilityCriteria: {
      income: "Low income families",
    }
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    ministry: "Ministry of Housing & Urban Affairs",
    category: "Housing",
    description: "Aims to provide 'Housing for All' by providing central assistance to implementing agencies for constructing houses for eligible families.",
    type: "Housing Support",
    eligibilityCriteria: {
      income: "EWS/LIG categories",
    }
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi Yojana",
    ministry: "Ministry of Finance",
    category: "Women & Child",
    description: "A high-interest savings scheme for the girl child, offering tax benefits and financial security for education and marriage.",
    type: "Savings Scheme",
    eligibilityCriteria: {
      gender: "Female (child)",
    }
  },
  {
    id: "pmmy",
    name: "PM Mudra Yojana",
    ministry: "Ministry of Finance",
    category: "Business",
    description: "Loans up to ₹10 lakh provided to non-corporate, non-farm small/micro enterprises for generating employment and income.",
    type: "Business Loan",
    eligibilityCriteria: {
      occupation: "Small business owner/Entrepreneur",
    }
  },
  {
    id: "apy",
    name: "Atal Pension Yojana",
    ministry: "Ministry of Finance",
    category: "Pension",
    description: "Social security scheme for unorganized sector workers, providing a guaranteed minimum pension of ₹1,000 to ₹5,000 after reaching 60.",
    type: "Social Security",
    eligibilityCriteria: {
      age: "18-40 years",
    }
  },
  {
    id: "pmjdy",
    name: "PM Jan Dhan Yojana",
    ministry: "Ministry of Finance",
    category: "Financial Inclusion",
    description: "National Mission for Financial Inclusion to ensure access to financial services like banking, savings, and insurance.",
    type: "Financial Inclusion",
    eligibilityCriteria: {}
  },
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    category: "Agriculture",
    description: "Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.",
    type: "Crop Insurance",
    eligibilityCriteria: {
      occupation: "Farmer",
    }
  }
];

export default function SchemesPage() {
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResults, setAiResults] = useState<SchemeEligibilityOutput | null>(null);

  const userProfileRef = useMemo(() => {
    if (!auth.currentUser) return null;
    return doc(db, "users", auth.currentUser.uid);
  }, [auth.currentUser, db]);

  const { data: profile } = useDoc<UserProfile>(userProfileRef);

  const handleAiMatch = async () => {
    if (!profile) {
      toast({
        variant: "destructive",
        title: "Profile required",
        description: "Please complete your profile to use AI Auto-Match.",
      });
      return;
    }

    setIsAiMatching(true);
    try {
      const results = await schemeEligibility({
        userProfile: {
          age: profile.age || 25,
          income: profile.income || 3,
          state: profile.state || "Maharashtra",
          gender: profile.gender || "All",
          occupation: profile.occupation || "Service",
          casteCategory: profile.casteCategory || "General",
          disabilityStatus: profile.disabilityStatus || false,
          familySize: profile.familySize || 4,
        },
        schemes: realSchemes.map(s => ({
          id: s.id,
          name: s.name,
          ministry: s.ministry,
          category: s.category,
          description: s.description,
          eligibilityCriteria: s.eligibilityCriteria,
        })),
      });
      setAiResults(results);
      toast({
        title: "AI Analysis Complete",
        description: `Found ${results.length} highly relevant schemes for you.`,
      });
    } catch (error) {
      console.error("AI Match Error:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not perform auto-matching at this time.",
      });
    } finally {
      setIsAiMatching(false);
    }
  };

  const filteredSchemes = useMemo(() => {
    if (aiResults && aiResults.length > 0) {
      return aiResults
        .map(res => {
          const original = realSchemes.find(s => s.id === res.schemeId);
          if (!original) return null;
          return {
            ...original,
            match: `${res.matchScore}%`,
            aiReason: res.matchReason,
            missing: res.missingCriteria,
          };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null);
    }

    return realSchemes
      .filter(scheme => 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(s => ({ ...s, match: "N/A" }));
  }, [searchQuery, aiResults]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scheme Finder</h1>
          <p className="text-muted-foreground mt-1">Discover 1,200+ central and state government benefits tailored for you.</p>
        </div>
        <div className="flex gap-2">
          {aiResults && (
            <Button variant="outline" onClick={() => setAiResults(null)}>
              Clear AI Results
            </Button>
          )}
          <Button size="lg" className="indigo-gradient hover:opacity-90 shadow-lg shadow-primary/20" onClick={handleAiMatch} disabled={isAiMatching}>
            {isAiMatching ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Profile...</>
            ) : (
              <><Sparkles className="mr-2 h-5 w-5" /> AI Auto-Match</>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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
                  <span className="text-xs font-bold text-primary">₹{profile?.income || 5}L</span>
                </div>
                <Slider defaultValue={[profile?.income || 5]} max={15} step={0.5} className="py-2" />
              </div>

              <Button variant="outline" className="w-full border-dashed" onClick={() => { setSearchQuery(""); setAiResults(null); }}>Reset Filters</Button>
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-border/40">
            <p className="text-sm font-medium">
              Showing <span className="text-primary font-bold">{filteredSchemes.length}</span> {aiResults ? "AI-Matched" : "recommended"} schemes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden relative border border-border/50">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`font-bold px-3 py-1 ${scheme.match !== "N/A" ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500'}`}>
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
                <CardContent className="flex-1 pt-2 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {scheme.description}
                  </p>
                  
                  {scheme.aiReason && (
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI Insight</span>
                      </div>
                      <p className="text-xs font-medium italic text-slate-700 dark:text-slate-300">
                        "{scheme.aiReason}"
                      </p>
                    </div>
                  )}
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

          {filteredSchemes.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No schemes found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}