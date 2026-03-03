"use strict";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeroSection() {
    return (
        <div className="relative flex flex-col items-center justify-center py-20 text-center z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Badge — matches the teal/blue of the shader glyphs */}
                <span className="inline-flex items-center rounded-full bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 text-sm font-medium text-cyan-300 mb-6 backdrop-blur-sm">
                    <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                    AI-Powered Creative Engine
                </span>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                    Craft{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                        Viral Content
                    </span>
                    <br /> in Seconds.
                </h1>

                <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8">
                    Generate premium tweets, blog posts, and slogans with our advanced AI.
                    Streamlined, futuristic, and efficient.
                </p>
            </motion.div>
        </div>
    );
}
