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
        <Card className="w-full max-w-2xl mx-auto mt-8 border-slate-700/50 bg-slate-900/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/30">
                <span className="text-sm font-medium text-slate-300">Generated Result</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white"
                >
                    {copied ? (
                        <Check className="h-4 w-4 mr-2 text-green-400" />
                    ) : (
                        <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied" : "Copy"}
                </Button>
            </div>
            <CardContent className="p-6">
                <div className="prose prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-slate-200">
                    {content}
                    <span className="inline-block w-2 h-5 ml-1 align-middle bg-purple-500 animate-pulse" />
                </div>
                <div ref={bottomRef} />
            </CardContent>
        </Card>
    );
}
