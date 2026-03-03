"use strict";
import { useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";

interface ResponseViewerProps {
    content: string;
}

export function ResponseViewer({ content }: ResponseViewerProps) {
    const [copied, setCopied] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [content]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!content) return null;

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8 border-cyan-900/40 bg-slate-900/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl shadow-cyan-900/10">
            <div className="flex items-center justify-between p-4 border-b border-cyan-900/30 bg-slate-800/30">
                <span className="text-sm font-medium text-cyan-300">Generated Result</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
                >
                    {copied ? (
                        <Check className="h-4 w-4 mr-2 text-emerald-400" />
                    ) : (
                        <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
            <CardContent className="p-6">
                <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-200">
                    {content}
                    {/* Cursor blink — teal to match the shader glyphs */}
                    <span className="inline-block w-2 h-5 ml-1 align-middle bg-cyan-400 animate-pulse" />
                </div>
                <div ref={bottomRef} />
            </CardContent>
        </Card>
    );
}
