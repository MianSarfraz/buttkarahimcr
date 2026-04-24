import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-dark flex flex-col">
            <Navbar />
            
            <div className="flex-grow flex items-center justify-center px-6 py-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 blur-[120px] rounded-full z-0"></div>
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 block animate-fade-in">
                        Error 404
                    </span>
                    
                    <h1 className="font-display text-7xl md:text-9xl text-white mb-8 italic scale-up-anim leading-none">
                        Page <span className="text-primary">Cooked</span> Away
                    </h1>
                    
                    <p className="text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
                        The spices are missing and the flame is out. The page you&apos;re looking for has been whisked away or never existed in our kitchen.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all duration-300 shadow-glow"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/menu"
                            className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            View Menu
                        </Link>
                    </div>
                </div>

                {/* Floating "404" behind text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                    <span className="font-display text-[20rem] md:text-[40rem] text-white italic font-black">
                        404
                    </span>
                </div>
            </div>

            <Footer />
        </main>
    );
}
