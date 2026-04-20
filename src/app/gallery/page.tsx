"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { Flip } from "gsap/all";

const categories = ["All", "Interior", "Food", "Street", "Videos"];

const galleryItems = [
    { id: 1, category: "Interior", image: "/gallary4.jpg", size: "large" },
    { id: 2, category: "Interior", image: "/gallary5.jpg", size: "medium" },
    { id: 3, category: "Street", image: "/Gallery1.jpg", size: "medium" },
    { id: 4, category: "Food", image: "/gallary6.jpg", size: "small" },
    { id: 5, category: "Interior", image: "/Gallery.jpg", size: "medium" },
    { id: 6, category: "Interior", image: "/gallery2.jpg", size: "large" },
    { id: 7, category: "Food", image: "/10.jpg", size: "medium" },
    { id: 8, category: "Food", image: "/gallary7.jpg", size: "small" },
    { id: 9, category: "Food", image: "/gallary8.jpg", size: "medium" },
    { id: 10, category: "Food", image: "/gallary49.jpg", size: "small" },
];

const videos = [
    { id: "258WGh1iBEA", title: "Fresh Lamb Karahi", desc: "Signature Preparation" },
    { id: "J2o0Y3iFgk8", title: "Atmosphere & Vibe", desc: "Our Dining Experience" },
    { id: "AHdNn-YuGk0", title: "The High Heat", desc: "Live Cooking Action" },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeVideo, setActiveVideo] = useState(videos[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(Flip);
    }, []);

    const handleCategoryChange = (category: string) => {
        if (!containerRef.current) return;
        const state = Flip.getState(".gallery-item");
        setActiveCategory(category);
        requestAnimationFrame(() => {
            Flip.from(state, {
                duration: 0.6,
                scale: true,
                ease: "power2.inOut",
                stagger: 0.05,
                onEnter: (elements: Element[]) => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6 }),
                onLeave: (elements: Element[]) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.6 }),
            });
        });
    };

    const filteredItems = activeCategory === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />

            {/* Hero */}
            <header className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/gallary5.jpg"
                        className="w-full h-full object-cover opacity-40 scale-110 grayscale"
                        alt="Gallery Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                    <span className="text-primary text-xs font-bold tracking-[0.5em] uppercase mb-4 block animate-pulse">
                        Through the Lens
                    </span>
                    <h1 className="font-display text-5xl sm:text-7xl md:text-9xl text-white leading-none">
                        Our <span className="text-primary italic">Gallery</span>
                    </h1>
                </div>
            </header>

            {/* Filter Tabs */}
            <div className="sticky top-[62px] md:top-[72px] z-40 bg-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar py-5 md:py-8 flex justify-start md:justify-center gap-6 md:gap-12 px-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`whitespace-nowrap text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 pb-2 border-b-2 ${activeCategory === cat
                                ? "text-primary border-primary"
                                : "text-gray-500 border-transparent hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <section className="py-12 md:py-32">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                    <div
                        ref={containerRef}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[160px] md:auto-rows-[280px]"
                    >
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`gallery-item group relative overflow-hidden rounded-xl bg-card-bg border border-white/5 ${item.size === "large" ? "col-span-2 row-span-2" :
                                    item.size === "medium" ? "row-span-2" : ""
                                    }`}
                            >
                                <img
                                    src={item.image}
                                    alt={`Gallery ${item.id}`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</span>
                                    <h4 className="text-white font-display italic text-base md:text-xl">Butt Karahi Moments</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 md:py-32 bg-[#020202] border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                    <div className="mb-8 md:mb-12">
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-4">Live Action</span>
                        <h2 className="font-display text-3xl md:text-6xl text-white">
                            Motion <span className="text-primary italic">Series</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                        <div className="lg:col-span-8">
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&controls=1&rel=0`}
                                    title="Main Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-white font-display text-2xl md:text-3xl italic mb-2">{activeVideo.title}</h3>
                                <p className="text-gray-500 font-light">{activeVideo.desc} — Experience the high-heat theater of Pakistan&apos;s most legendary food street.</p>
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-primary"></span> More Reels
                            </h4>
                            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto no-scrollbar lg:overflow-visible">
                                {videos.map((vid) => (
                                    <div
                                        key={vid.id}
                                        onClick={() => setActiveVideo(vid)}
                                        className={`flex gap-4 group cursor-pointer p-3 md:p-4 rounded-xl border transition-all duration-300 flex-shrink-0 w-64 lg:w-auto ${activeVideo.id === vid.id
                                            ? "bg-primary/5 border-primary/50"
                                            : "bg-[#080808] border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className="w-24 md:w-32 h-16 md:h-20 bg-black rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
                                            <img src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={vid.title} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-white text-2xl">▶</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h5 className={`text-xs md:text-sm font-bold transition-colors ${activeVideo.id === vid.id ? "text-primary" : "text-white group-hover:text-primary"}`}>{vid.title}</h5>
                                            <p className="text-gray-600 text-xs mt-1">Short Clip</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
