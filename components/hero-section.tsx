"use strict";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative flex flex-col items-center justify-center py-20 text-center z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-sm font-medium text-slate-300 mb-6">
                    <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                    AI-Powered Creative Engine
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                    Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Viral Content</span>
                    <br /> in Seconds.
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8">
                    Generate premium tweets, blog posts, and slogans with our advanced AI.
                    Streamlined, futuristic, and efficient.
                </p>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />
        </div>
    );
}
