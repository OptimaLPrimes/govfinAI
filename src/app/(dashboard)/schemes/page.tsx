
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
import { Search, Filter, Sparkles, ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

const categories = ["Agriculture", "Education", "Health", "Housing", "Women & Child", "Employment", "Pension", "Business"];

export default function SchemesPage() {
  const [isAiMatching, setIsAiMatching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAiMatch = () => {
    setIsAiMatching(true);
    setTimeout(() => setIsAiMatching(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Scheme Finder</h1>
          <p className="text-muted-foreground">Discover government benefits you are eligible for</p>
        </div>
        <Button size="lg" className="indigo-gradient hover:opacity-90" onClick={handleAiMatch} disabled={isAiMatching}>
          {isAiMatching ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> AI Matching...</>
          ) : (
            <><Sparkles className="mr-2 h-5 w-5" /> AI Auto-Match</>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Panel */}
        <aside className="w-full lg:w-72 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <CardTitle className="text-lg">Filters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search schemes..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox id={cat} />
                      <label htmlFor={cat} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Annual Income</Label>
                  <span className="text-xs text-muted-foreground">Max ₹10L</span>
                </div>
                <Slider defaultValue={[2.5]} max={10} step={0.5} />
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All India</SelectItem>
                    <SelectItem value="mh">Maharashtra</SelectItem>
                    <SelectItem value="ka">Karnataka</SelectItem>
                    <SelectItem value="tn">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full">Clear All</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-none mb-4">
            <p className="text-sm text-muted-foreground">Showing 24 of 1,248 schemes</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select defaultValue="match">
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="applied">Most Applied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="group border-none shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-accent/10 text-accent border-accent/20">98% Match</Badge>
                </div>
                <CardHeader>
                  <div className="flex flex-col gap-1">
                    <Badge variant="secondary" className="w-fit">{categories[i % categories.length]}</Badge>
                    <CardTitle className="group-hover:text-primary transition-colors mt-2">
                      {i === 1 ? "PM Kisan Samman Nidhi" : i === 2 ? "Ayushman Bharat PMJAY" : "PM Awas Yojana"}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Ministry of Rural Development</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    Provides direct financial assistance to small and marginal farmers across the country to support their agricultural needs and ensure a basic income.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2 pt-0 pb-6 px-6">
                  <Button asChild className="flex-1">
                    <Link href={`/schemes/${i}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="icon" className="group-hover:border-primary group-hover:text-primary">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <div className="flex gap-1">
              {[1, 2, 3, "...", 12].map((p, i) => (
                <Button key={i} variant={p === 1 ? "default" : "outline"} size="sm" className="w-10">
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
