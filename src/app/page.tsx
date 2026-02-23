"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";
import BookingForm from "@/components/BookingForm";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
    const { addToCart } = useCart();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Rotating Plates Animation
        gsap.to("#orbit-ring", {
            rotation: 360,
            duration: 50,
            repeat: -1,
            ease: "none",
        });

        const plates = document.querySelectorAll(".orbit-plate");
        plates.forEach((plate) => {
            gsap.to(plate, {
                rotation: -360,
                duration: 50,
                repeat: -1,
                ease: "none",
            });
        });

        // Parallax and Reveal Animations
        const revealSections = document.querySelectorAll(".reveal-trigger");
        revealSections.forEach((section) => {
            gsap.from(section.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
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

            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
                {/* Video Container */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <iframe
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-[177.77vh] min-h-[56.25vw] object-cover opacity-60"
                        src="https://www.youtube.com/embed/6vQJyOY6tX8?autoplay=1&mute=1&controls=0&loop=1&playlist=6vQJyOY6tX8&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
                        title="Hero Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                </div>

                <div className="relative z-20 text-center px-4 w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-6 md:gap-10 mt-10">
                        <h1 className="font-display text-white leading-[0.9] drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] scale-up-anim">
                            <span className="block text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-2">
                                THE MASTER
                            </span>
                            <div className="flex items-center justify-center gap-3 md:gap-6 text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                                <span className="font-light italic text-xl sm:text-3xl md:text-5xl self-center pt-2">
                                    OF
                                </span>
                                <span className="font-urdu text-3xl sm:text-5xl md:text-7xl leading-none">
                                    کڑاہی
                                </span>
                            </div>
                        </h1>

                        <div className="pt-4">
                            <a
                                href="#order"
                                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-12 md:py-4 overflow-hidden rounded-full bg-primary text-white transition-all duration-300 hover:scale-105 hover:shadow-glow shadow-xl shadow-black/50 border border-white/20"
                            >
                                <span className="relative text-xs md:text-sm font-bold tracking-[0.2em] uppercase z-10">
                                    Order Now
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Our Story Section */}
            <section id="story" className="relative pt-32 pb-0 bg-dark overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20 items-center mb-10 relative z-10">
                    <div className="order-2 md:order-1 space-y-8">
                        <div>
                            <span className="block text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4">
                                Our Heritage
                            </span>
                            <h2 className="font-display text-4xl md:text-6xl text-white leading-tight mb-6">
                                97 Wilmslow Road. <br />{" "}
                                <span className="text-white/40 italic">A Legend is Born.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-primary/50 pl-6">
                                In the heart of Manchester&apos;s Curry Mile, Butt Karahi stands
                                as a testament to authentic Pakistani culinary tradition. We
                                don&apos;t just cook food; we craft an experience using the same
                                iron woks and high flames that have defined our legacy.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative">
                        <div className="relative z-10 img-zoom-container rounded-sm overflow-hidden border-b-4 border-primary shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Chef"
                                className="w-full h-[300px] md:h-[500px] object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section (Rotating Plates) */}
            <section className="relative pt-0 pb-32 bg-dark overflow-hidden">
                <div className="relative w-full py-52 md:py-64 min-h-[80vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 blur-[120px] rounded-full z-0"></div>

                    <div className="relative z-20 text-center mix-blend-screen pointer-events-none mb-4 md:mb-0">
                        <p className="text-primary text-xs font-bold uppercase tracking-[0.5em] mb-2 opacity-80">Experience</p>
                        <h2 className="font-display text-5xl md:text-9xl text-white leading-none tracking-tight">
                            THE ART<br />
                            <div className="flex items-center justify-center gap-2 md:gap-4 text-primary mt-2">
                                <span className="font-light italic text-2xl md:text-5xl">OF</span>
                                <span className="font-urdu text-4xl md:text-7xl leading-normal mt-1 md:mt-2">کڑاہی</span>
                            </div>
                        </h2>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
                        <div id="orbit-ring" className="relative w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] md:w-[800px] md:h-[800px] rounded-full border border-white/5 flex items-center justify-center">
                            {/* Plate 1 */}
                            <div className="orbit-plate absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-56 md:h-56">
                                <div className="w-full h-full rounded-full overflow-hidden border-[2px] md:border-[4px] border-[#151515] shadow-glow relative bg-black">
                                    <img src="https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover transform scale-110" alt="Special 1" />
                                </div>
                            </div>
                            {/* Plate 2 */}
                            <div className="orbit-plate absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-56 md:h-56">
                                <div className="w-full h-full rounded-full overflow-hidden border-[2px] md:border-[4px] border-[#151515] shadow-glow relative bg-black">
                                    <img src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover transform scale-110" alt="Special 2" />
                                </div>
                            </div>
                            {/* Plate 3 */}
                            <div className="orbit-plate absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-56 md:h-56">
                                <div className="w-full h-full rounded-full overflow-hidden border-[2px] md:border-[4px] border-[#151515] shadow-glow relative bg-black">
                                    <img src="https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover transform scale-110" alt="Special 3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Chronicle Gallery */}
            <section id="gallery-images" className="bg-[#050505] relative py-20 md:py-32 border-b border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-16">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Visual Chronicle</span>
                    <h2 className="font-display text-4xl md:text-7xl text-white mt-4">The Atmosphere</h2>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[180px] md:auto-rows-[300px]">
                    <div className="col-span-2 relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Restaurant Interior" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Karahi" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Street Food" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Spiced Dish" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Grilled Meat" />
                    </div>
                    <div className="col-span-2 relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Dining Ambience" />
                    </div>
                </div>
            </section>

            {/* Motion Series Section */}
            <section id="gallery-videos" className="bg-[#020202] relative py-20 md:py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-16">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Live Action</span>
                    <h2 className="font-display text-4xl md:text-7xl text-white mt-4">Motion Series</h2>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="relative group overflow-hidden rounded-2xl aspect-[9/16] border border-white/10 hover:border-primary/50 transition-colors duration-500 bg-black">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/258WGh1iBEA?rel=0&controls=1&showinfo=0&loop=1" title="Short 1" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl aspect-[9/16] border border-white/10 hover:border-primary/50 transition-colors duration-500 bg-black">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/J2o0Y3iFgk8?rel=0&controls=1&showinfo=0&loop=1" title="Short 2" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="relative group overflow-hidden rounded-2xl aspect-[9/16] border border-white/10 hover:border-primary/50 transition-colors duration-500 bg-black">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/AHdNn-YuGk0?rel=0&controls=1&showinfo=0&loop=1" title="Short 3" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
            </section>

            {/* ── Ramadan / Iftar Offer Section ── */}
            <section className="relative py-24 md:py-40 bg-[#050505] overflow-hidden border-y border-white/5">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-0" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-0" />

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

                        {/* Content Side */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                            <span className="inline-block text-primary font-bold tracking-[0.6em] uppercase text-[10px] md:text-xs mb-8 py-2.5 px-6 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                                🌙 Ramadan Mubarak 2026
                            </span>

                            <div className="relative mb-6">
                                <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter leading-[0.9] drop-shadow-[0_0_30px_rgba(228,37,43,0.3)]">
                                    FLAT 10% OFF
                                </span>
                            </div>

                            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.8] mb-10 uppercase tracking-tighter">
                                ON IFTAR<br />
                                <span className="text-white/30 italic font-light tracking-normal lowercase">orders.</span>
                            </h2>

                            <p className="text-gray-400 text-base md:text-xl font-light max-w-lg mb-12 leading-relaxed tracking-wide">
                                Join us this holy month for an authentic Iftar experience.
                                Savor the legacy of Lahore with our signature recipes and a special Ramadan blessing.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                                <a
                                    href="/menu"
                                    className="w-full sm:w-auto px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
                                >
                                    🍽️ Order Now
                                </a>
                                <a
                                    href="tel:+447438812740"
                                    className="w-full sm:w-auto px-12 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md active:scale-95"
                                >
                                    📞 +44 7438 812740
                                </a>
                            </div>

                            <div className="mt-16 flex items-center gap-6 group">
                                <div className="flex flex-col">
                                    <span className="text-primary font-bold text-xs tracking-widest uppercase mb-1">Authentic Taste</span>
                                    <span className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">Lakshmi Chowk, Lahore</span>
                                </div>
                                <div className="w-10 h-px bg-white/10 group-hover:w-16 transition-all duration-500" />
                                <div className="flex flex-col">
                                    <span className="text-primary font-bold text-xs tracking-widest uppercase mb-1">Pre-Booking</span>
                                    <span className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">Open 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative group order-1 lg:order-2">
                            <div className="relative z-10 w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-[#111]">
                                <img
                                    src="/10%25%20off%20iftar%20o.jpg"
                                    alt="Iftar Special Offer"
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                                {/* Label overlay */}
                                <div className="absolute bottom-10 left-10">
                                    <span className="text-white text-xs font-bold tracking-[0.4em] uppercase opacity-60">Ramadan 2026</span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -inset-6 border border-primary/20 rounded-[2.5rem] -z-10 group-hover:border-primary/40 transition-all duration-700 -rotate-2 group-hover:rotate-0" />
                            <div className="absolute -inset-6 border border-white/5 rounded-[2.5rem] -z-20 group-hover:scale-95 transition-all duration-700 rotate-2 group-hover:rotate-0" />

                            {/* Accent Lights */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -z-10 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-32 bg-[#080808]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-24">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
                            The Taste
                        </span>
                        <h2 className="font-display text-5xl md:text-7xl mb-4 text-white mt-2">
                            Signatures
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Chicken Karahi"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-2xl text-white italic">
                                    Chicken Karahi
                                </h3>
                                <span className="text-primary font-bold">£16.50</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Cooked in fresh tomatoes, ginger & green chillies.
                            </p>
                            <button
                                onClick={() => addToCart({ id: 'chicken-karahi', name: 'Chicken Karahi', price: '£16.50', image: 'https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=400' })}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <Plus className="w-3 h-3" /> Add to Cart
                            </button>
                        </div>
                        {/* Card 2 */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30 mt-0 md:mt-12">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Mutton Karahi"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-2xl text-white italic">
                                    Mutton Karahi
                                </h3>
                                <span className="text-primary font-bold">£18.90</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Tender mutton slow-cooked in our secret spices.
                            </p>
                            <button
                                onClick={() => addToCart({ id: 'mutton-karahi', name: 'Mutton Karahi', price: '£18.90', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400' })}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <Plus className="w-3 h-3" /> Add to Cart
                            </button>
                        </div>
                        {/* Card 3 */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Royal Grill"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-2xl text-white italic">
                                    Royal Grill
                                </h3>
                                <span className="text-primary font-bold">£24.00</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Lamb Chops, Seekh Kebabs & Malai Tikka.
                            </p>
                            <button
                                onClick={() => addToCart({ id: 'royal-grill', name: 'Royal Grill', price: '£24.00', image: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=400' })}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300"
                            >
                                <Plus className="w-3 h-3" /> Add to Cart
                            </button>
                        </div>
                    </div>
                    <div className="mt-20 text-center">
                        <a
                            href="/menu"
                            className="inline-flex items-center gap-4 px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-black transition-all duration-500 group"
                        >
                            Explore Full Menu
                            <span className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-500"></span>
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA: Taste the Legacy */}
            <section className="relative py-40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        className="w-full h-full object-cover grayscale brightness-[0.4]" alt="Spices" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
                    <div className="w-16 h-16 border border-primary/50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <span className="text-primary text-2xl">🍽️</span>
                    </div>
                    <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-white mb-6 leading-tight">
                        Taste the <br /><span className="text-primary italic">Legacy.</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-light">
                        Join us for an unforgettable evening of high-heat cooking, rich aromas, and the finest company.
                    </p>
                    <a href="#booking" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(228,37,43,0.6)]">
                        Book a Table
                    </a>
                </div>
            </section>

            {/* Book a Table Section */}
            <section id="booking" className="py-32 bg-[#080808] border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
                                Book a Table
                            </span>
                            <h2 className="font-display text-5xl md:text-7xl text-white mt-4 mb-8">
                                Reserve <br /> <span className="text-primary italic">Your Seat.</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light mb-12">
                                Gather your family, bring your friends — we&apos;ll have the table ready.
                                We cater for all group sizes and can accommodate special occasions.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">📍</div>
                                    <p className="text-white text-sm tracking-widest uppercase">97 Wilmslow Road, Manchester</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">📞</div>
                                    <p className="text-white text-sm tracking-widest uppercase">+44 7438 812740</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">🕐</div>
                                    <p className="text-white text-sm tracking-widest uppercase">Open Daily · Preparation ~25 Min</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <BookingForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Form Section */}
            <section id="order" className="py-32 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
                                Reservations
                            </span>
                            <h2 className="font-display text-5xl md:text-7xl text-white mt-4 mb-8">
                                Ready to <br /> <span className="text-primary italic">Taste?</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light mb-12">
                                Order your favorite Karahi online or reserve a table and
                                experience the legacy of fire and spice in person.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">
                                        📍
                                    </div>
                                    <p className="text-white text-sm tracking-widest uppercase">
                                        97 Wilmslow Road, Manchester
                                    </p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">
                                        📞
                                    </div>
                                    <p className="text-white text-sm tracking-widest uppercase">
                                        +44 161 123 4567
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <OrderForm />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
