"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-dark flex flex-col">
            <Navbar />
            
            <div className="flex-grow flex items-center justify-center px-6 py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 blur-[120px] rounded-full z-0"></div>
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 block animate-pulse">
                        System Error
                    </span>
                    
                    <h1 className="font-display text-5xl md:text-8xl text-white mb-8 italic leading-none">
                        Something <span className="text-primary">Went Wrong</span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
                        We encountered an unexpected flavor in our system. Don&apos;t worry, our chefs are looking into it.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => reset()}
                            className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all duration-300 shadow-glow"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
