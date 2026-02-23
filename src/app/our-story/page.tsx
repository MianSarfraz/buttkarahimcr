"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurStoryPage() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline Animation
        gsap.to(".timeline-progress", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: "#timeline-section",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });

        const timelineRows = document.querySelectorAll(".timeline-row");
        timelineRows.forEach((row, index) => {
            const card = row.querySelector(".timeline-card");
            const dot = row.querySelector(".timeline-dot");

            gsap.fromTo(
                card,
                { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 70%",
                    },
                }
            );

            gsap.to(dot, {
                backgroundColor: "#E4252B",
                borderColor: "#E4252B",
                boxShadow: "0 0 15px #E4252B",
                duration: 0.3,
                scrollTrigger: {
                    trigger: row,
                    start: "top 55%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        // Other Reveal Animations
        const revealTriggers = document.querySelectorAll(".reveal-trigger");
        revealTriggers.forEach((section) => {
            gsap.from(section.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            });
        });
    }, []);

    return (
        <main className="min-h-screen bg-dark overflow-x-hidden">
            <Navbar />

            {/* Hero */}
            <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        className="w-full h-full object-cover opacity-60 scale-110 grayscale"
                        alt="Lahore Street"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <span className="text-primary text-xs font-bold tracking-[0.5em] uppercase mb-6 block">
                        A Legacy Etched in Fire
                    </span>
                    <h1 className="font-display text-5xl sm:text-7xl md:text-9xl text-white leading-none mb-6 md:mb-8">
                        Our Heritage <br />
                        <span className="text-primary italic">Story</span>
                    </h1>
                    <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto mb-8 md:mb-12">
                        A legacy of taste spanning generations, rooted in the heart of
                        Lakshmi Chowk, Lahore. Discover the soul of the Karahi.
                    </p>
                </div>
            </header>

            {/* Secret Blend Section */}
            <section className="relative py-32 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 relative reveal-trigger">
                            <div className="relative aspect-video overflow-hidden rounded-sm">
                                <img
                                    src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Spices"
                                    className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-6 md:-right-12 bg-card-bg p-8 border border-white/10 max-w-xs shadow-xl hidden md:block">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Heritage Masala</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">Our blend contains 14 secret spices, aged and roasted in small batches every morning before sunrise.</p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 lg:pl-12 reveal-trigger">
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
                                Craft
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-6 italic">
                                The Secret Blend
                            </h2>
                            <p className="text-gray-400 leading-relaxed font-light mb-6">
                                It isn&apos;t just about heat; it&apos;s about the depth of
                                flavor. Our butter and tomato base is slow-cooked until the oils
                                separate, a technique passed down from father to son for over
                                six decades.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline-section" className="py-40 bg-dark relative overflow-hidden">
                <div className="max-w-[1000px] mx-auto px-6 relative">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
                        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-transparent timeline-progress h-0"></div>
                    </div>

                    {/* Item 1 */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 timeline-row">
                        <div className="md:text-right timeline-card opacity-0">
                            <div className="inline-block p-6 border border-white/10 bg-[#080808] hover:border-primary/50 transition-colors duration-300 relative">
                                <span className="text-5xl md:text-7xl font-display font-black text-white/10 absolute -top-10 md:-top-12 right-6 md:right-auto md:left-auto select-none">1985</span>
                                <h3 className="text-white font-bold text-2xl mb-2 mt-4">The Second Hearth</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Expansion into the broader districts of Lahore, becoming a household name for Sunday family feasts.</p>
                            </div>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-dark border-2 border-white/20 rounded-full -translate-x-1/2 mt-10 z-10 timeline-dot transition-colors duration-500"></div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 timeline-row">
                        <div className="hidden md:block"></div>
                        <div className="timeline-card opacity-0">
                            <div className="inline-block p-6 border border-white/10 bg-[#080808] hover:border-primary/50 transition-colors duration-300 relative">
                                <span className="text-5xl md:text-7xl font-display font-black text-white/10 absolute -top-10 md:-top-12 left-6 select-none">2010</span>
                                <h3 className="text-white font-bold text-2xl mb-2 mt-4">National Footprint</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Opening flagship locations in Islamabad and Karachi, bringing the authentic Lahori taste to the entire nation.</p>
                            </div>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-dark border-2 border-white/20 rounded-full -translate-x-1/2 mt-10 z-10 timeline-dot transition-colors duration-500"></div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 timeline-row">
                        <div className="md:text-right timeline-card opacity-0">
                            <div className="inline-block p-6 border border-white/10 bg-[#080808] hover:border-primary/50 transition-colors duration-300 relative">
                                <span className="text-5xl md:text-7xl font-display font-black text-white/10 absolute -top-10 md:-top-12 right-6 md:right-auto md:left-auto select-none">2023</span>
                                <h3 className="text-white font-bold text-2xl mb-2 mt-4">Modern Rebirth</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Redefining the dining experience with premium interiors while keeping the original 1960 recipe unchanged.</p>
                            </div>
                        </div>
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-dark border-2 border-white/20 rounded-full -translate-x-1/2 mt-10 z-10 timeline-dot transition-colors duration-500"></div>
                    </div>
                </div>
            </section>

            {/* Sizzling Karahi Section */}
            <section className="relative py-32 overflow-hidden bg-[#050505]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 reveal-trigger">
                            <h2 className="font-display text-6xl md:text-8xl text-white leading-none mb-8">
                                The <br /><span className="italic">Sizzling</span><br /><span className="text-primary font-black">Karahi</span>
                            </h2>
                            <div className="space-y-8 mt-12">
                                <div className="flex gap-6">
                                    <span className="text-primary text-3xl">🍲</span>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Fresh Meat Only</h4>
                                        <p className="text-gray-500 text-sm max-w-sm">We never freeze. Our meat is sourced daily from local farmers who meet our strict quality standards.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <span className="text-primary text-3xl">🔥</span>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Open Flame Cooking</h4>
                                        <p className="text-gray-500 text-sm max-w-sm">Each dish is cooked on high-intensity open flames to achieve that signature smoky char.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative reveal-trigger">
                            <div className="relative rounded-full aspect-square w-full max-w-sm md:max-w-lg mx-auto overflow-hidden border-4 border-white/5 shadow-glow">
                                <img src="https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Sizzling Karahi" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-[20%] right-[20%] group">
                                <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute"></div>
                                <div className="w-4 h-4 bg-primary rounded-full relative cursor-pointer"></div>
                                <div className="absolute right-6 top-0 w-48 bg-white text-black p-3 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    Fresh Ginger & Chillies
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
