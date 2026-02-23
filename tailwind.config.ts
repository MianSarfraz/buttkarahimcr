import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#E4252B",
                dark: "#050505",
                "card-bg": "#121212",
            },
            fontFamily: {
                display: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-manrope)", "sans-serif"],
                urdu: ["var(--font-noto-urdu)", "serif"],
            },
            boxShadow: {
                glow: "0 0 30px rgba(228, 37, 43, 0.4)",
                "glow-sm": "0 0 10px rgba(228, 37, 43, 0.3)",
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
