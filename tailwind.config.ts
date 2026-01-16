import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                // Define some premium colors here that we will use
                primary: "#6366f1", // Indigo 500
                secondary: "#a855f7", // Purple 500
                accent: "#ec4899", // Pink 500
                dark: "#0f172a", // Slate 900
            }
        },
    },
    plugins: [],
};
export default config;
