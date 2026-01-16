"use strict";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
        <Card className="w-full max-w-2xl mx-auto border-slate-700/50 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            {/* Decorative top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">What do you want to create?</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {TYPES.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-md transition-all duration-200 border",
                                        type === t
                                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                            : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:text-slate-200"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

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
                                            ? "bg-purple-600/20 border-purple-500 text-purple-300"
                                            : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Topic or Keywords</label>
                        <Textarea
                            placeholder="e.g., The future of AI in marketing..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="resize-none min-h-[100px] text-lg bg-slate-950/50 focus-visible:ring-purple-500"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/10"
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
