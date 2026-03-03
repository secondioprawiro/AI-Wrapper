"use strict";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface GeneratorFormProps {
    onSubmit: (data: { topic: string; tone: string; type: string }) => void;
    isLoading: boolean;
}

const TONES = ["Professional", "Witty", "Inspirational", "Casual", "Urgent"];
const TYPES = ["Tweet", "Blog Post", "Slogan", "LinkedIn Post"];

export function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState(TONES[0]);
    const [type, setType] = useState(TYPES[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;
        onSubmit({ topic, tone, type });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto border-cyan-900/40 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-cyan-900/10 overflow-hidden relative">
            {/* Top border — the shader's blue-to-teal gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Content type selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            What do you want to create?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {TYPES.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-md transition-all duration-200 border",
                                        type === t
                                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10"
                                            : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-cyan-700 hover:text-slate-200"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tone selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Select Tone</label>
                        <div className="flex flex-wrap gap-2">
                            {TONES.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTone(t)}
                                    className={cn(
                                        "px-4 py-1.5 text-xs rounded-full transition-all duration-200 border",
                                        tone === t
                                            ? "bg-emerald-500/15 border-emerald-400 text-emerald-300"
                                            : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-cyan-700 hover:text-slate-200"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Topic textarea */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Topic or Keywords</label>
                        <Textarea
                            placeholder="e.g., The future of AI in marketing..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="resize-none min-h-[100px] text-lg bg-slate-950/50 border-slate-700 focus-visible:ring-cyan-500 focus-visible:border-cyan-600"
                        />
                    </div>

                    {/* Generate button */}
                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:via-cyan-400 hover:to-emerald-400 shadow-xl shadow-cyan-900/20 border-0 text-white transition-all duration-300"
                        disabled={isLoading || !topic.trim()}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Zap className="mr-2 h-5 w-5 fill-current" />
                                Generate Content
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
