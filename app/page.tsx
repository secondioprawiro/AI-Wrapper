"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { GeneratorForm } from "@/components/generator-form";
import { ResponseViewer } from "@/components/response-viewer";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [credits, setCredits] = useState<{ remaining: number; limit: number } | null>(null);
    const { toast } = useToast();

    const fetchCredits = async () => {
        try {
            const res = await fetch("/api/generate");
            const data = await res.json();
            setCredits(data);
        } catch (error) {
            console.error("Failed to fetch credits", error);
        }
    };

    useEffect(() => {
        fetchCredits();
    }, [isLoading]); // Refetch after generation

    const handleGenerate = async (data: { topic: string; tone: string; type: string }) => {
        if (credits && credits.remaining <= 0) {
            toast({
                title: "Limit Reached",
                description: "You have used all your free generations for today.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setContent("");

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                if (response.status === 429) {
                    toast({
                        title: "Limit Reached",
                        description: "You have used all your free generations for today.",
                        variant: "destructive",
                    });
                } else {
                    throw new Error("Generation failed");
                }
                setIsLoading(false);
                return;
            }

            const reader = response.body?.getReader();
            if (!reader) return;

            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                setContent((prev) => prev + chunk);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent -z-10" />

            <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
                <nav className="w-full flex justify-between items-center mb-12">
                    <div className="font-bold text-xl tracking-tighter">
                        AI<span className="text-purple-500">Wrapper</span>
                    </div>
                    {credits && (
                        <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                            <span className={credits.remaining > 0 ? "text-green-400" : "text-red-400"}>
                                {credits.remaining}
                            </span>
                            /{credits.limit} Credits Left
                        </div>
                    )}
                </nav>

                <HeroSection />

                <div className="w-full max-w-4xl relative z-10 -mt-10 mb-20">
                    <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
                    <ResponseViewer content={content} />
                </div>
            </div>

            <footer className="w-full py-6 text-center text-slate-600 text-sm">
                Built with Next.js 14, Tailwind, and Google Gemini
            </footer>
        </main>
    );
}
