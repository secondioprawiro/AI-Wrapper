"use client"

import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`
              p-4 rounded-lg shadow-lg border text-sm max-w-sm
              ${toast.variant === "destructive"
                                ? "bg-red-900/90 border-red-800 text-white"
                                : "bg-slate-800/90 border-slate-700 text-slate-100"
                            }
              backdrop-blur-md
            `}
                    >
                        {toast.title && <div className="font-semibold">{toast.title}</div>}
                        {toast.description && <div className="text-slate-300 mt-1">{toast.description}</div>}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
