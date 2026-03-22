"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, User, Mic, Copy, ThumbsUp, ThumbsDown, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date | null;
};

const suggestedPrompts = [
  "Which schemes am I eligible for?",
  "Summarize my spending this month",
  "Explain PM Kisan Yojana in simple terms",
  "How can I save more money?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: 'assistant',
      content: "Namaste! I am your GovFinAI assistant. How can I help you today with government schemes or your personal finances?",
      timestamp: null,
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    // Initialize first message timestamp after hydration to avoid mismatch
    setMessages(prev => prev.map(m => m.id === "1" ? { ...m, timestamp: new Date() } : m));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulation of AI Response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on your profile, you are highly eligible for the PM Kisan Yojana and Pradhan Mantri Mudra Yojana. Would you like me to explain the application process for these?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard" });
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            GovFinAI Assistant
          </h1>
          <p className="text-sm text-muted-foreground">Your multilingual guide to government & finance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Preferred Language:</span>
          <Select defaultValue="en">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="mr">Marathi</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 border-none shadow-sm bg-slate-50/50">
        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 md:gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className={`h-8 w-8 md:h-10 md:w-10 shadow-sm ${m.role === 'assistant' ? 'bg-primary' : 'bg-slate-200'}`}>
                  {m.role === 'assistant' ? (
                    <AvatarFallback className="bg-primary text-white"><Bot className="h-5 w-5 md:h-6 md:w-6" /></AvatarFallback>
                  ) : (
                    <AvatarFallback><User className="h-5 w-5 md:h-6 md:w-6" /></AvatarFallback>
                  )}
                </Avatar>
                <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${m.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`p-3 md:p-4 rounded-2xl shadow-sm ${
                    m.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-white text-foreground rounded-tl-none'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{m.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 px-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">
                      {isMounted && m.timestamp ? m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                    </span>
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => copyToClipboard(m.content)} className="text-muted-foreground hover:text-primary transition-colors"><Copy className="h-3 w-3" /></button>
                        <button className="text-muted-foreground hover:text-accent transition-colors"><ThumbsUp className="h-3 w-3" /></button>
                        <button className="text-muted-foreground hover:text-destructive transition-colors"><ThumbsDown className="h-3 w-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 bg-primary shadow-sm">
                  <AvatarFallback className="bg-primary text-white"><Bot className="h-6 w-6" /></AvatarFallback>
                </Avatar>
                <div className="p-4 rounded-2xl bg-white shadow-sm rounded-tl-none flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground italic">GovFinAI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button 
                  key={prompt} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 relative">
              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
                <Mic className="h-5 w-5" />
              </Button>
              <Input 
                placeholder="Ask me about schemes or your spending..." 
                className="pr-12 py-6 rounded-xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <Button 
                className="absolute right-1 top-1 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90"
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
