import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-dark z-50 flex flex-col items-center justify-center">
            <div className="relative">
                <div className="font-display text-4xl md:text-6xl text-primary italic font-black mb-4 select-none animate-pulse" style={{ WebkitTextStroke: "1px white" }}>
                    Butt Karahi
                </div>
                
                <div className="w-48 h-px bg-white/10 relative overflow-hidden mx-auto">
                    <div className="absolute inset-0 bg-primary w-full origin-left animate-loading-bar"></div>
                </div>
            </div>
        </div>
    );
}
