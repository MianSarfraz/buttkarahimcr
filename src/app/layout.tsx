import type { Metadata } from "next";
import { Playfair_Display, Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const notoUrdu = Noto_Nastaliq_Urdu({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-noto-urdu",
});

import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
    title: "Butt Karahi | Authentic Dining",
    description: "The Master of Karahi - Authentic Pakistani Dining in Manchester",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${playfair.variable} ${manrope.variable} ${notoUrdu.variable} font-sans bg-dark text-white antialiased selection:bg-primary selection:text-white`}>
                <CartProvider>
                    <Preloader />
                    <CustomCursor />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
