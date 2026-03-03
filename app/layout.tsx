import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"; // We will create this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Content Marketing Generator",
    description: "Generate premium marketing content with AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
