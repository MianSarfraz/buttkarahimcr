"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { useCart } from "@/context/CartContext";
import { Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeaturedItemContent = ({ name, desc, image, variants }: { name: string, desc: string, image: string, variants: { size: string, price: string }[] }) => {
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);
    const { addToCart } = useCart();

    return (
        <>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-display text-2xl text-white italic transition-colors duration-300 group-hover:text-primary">
                    {name}
                </h3>
                <span className="text-primary font-bold">{selectedVariant.price}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {desc}
            </p>

            <div className="flex flex-col gap-4">
                {/* Size Selector */}
                {variants.length > 1 && (
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10 self-start">
                        {variants.map((v) => (
                            <button
                                key={v.size}
                                onClick={() => setSelectedVariant(v)}
                                className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${selectedVariant.size === v.size
                                    ? "bg-primary text-white shadow-lg"
                                    : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                {v.size}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => addToCart({
                        id: `${name}-${selectedVariant.size}`,
                        name: `${name} (${selectedVariant.size})`,
                        price: selectedVariant.price,
                        image: image
                    })}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300 shadow-lg"
                >
                    <ShoppingBag className="w-3 h-3" /> Add to Order
                </button>
            </div>
        </>
    );
};

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
                            <Link
                                href="/menu"
                                className="group relative inline-flex items-center justify-center px-8 py-3 md:px-12 md:py-4 overflow-hidden rounded-full bg-primary text-white transition-all duration-300 hover:scale-105 hover:shadow-glow shadow-xl shadow-black/50 border border-white/20"
                            >
                                <span className="relative text-xs md:text-sm font-bold tracking-[0.2em] uppercase z-10">
                                    Order Now
                                </span>
                            </Link>
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
            <section className="relative pt-0 pb-32 bg-dark">
                <div className="relative w-full py-52 md:py-64 min-h-[100vh] lg:min-h-[1100px] flex items-center justify-center overflow-visible">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] overflow-hidden"></div>
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
                        <img src="/gallary4.jpg"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Restaurant Interior" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="/gallary5.jpg"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Crowd Vibe" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="/Gallery1.jpg"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Street View" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="/gallary6.jpg"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Food Prep" />
                    </div>
                    <div className="relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="/gallary8.jpg"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Dining Experience" />
                    </div>
                    <div className="col-span-2 relative group overflow-hidden rounded-xl border border-white/5">
                        <img src="/gallery2.jpg"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1: Desi Chicken Karahi */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="/Desi Chicken Karahi-100.jpg.jpeg"
                                    alt="Desi Chicken Karahi"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <FeaturedItemContent
                                name="Desi Chicken Karahi"
                                desc="Butt Special Organic Chicken cooked in traditional spices."
                                image="/Desi Chicken Karahi-100.jpg.jpeg"
                                variants={[{ size: "½ Kg", price: "£19.99" }, { size: "1 Kg", price: "£39.99" }]}
                            />
                        </div>
                        {/* Card 2: Lamb Karahi */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="/Lamb Karahi Butt Special -100.jpg.jpeg"
                                    alt="Lamb Karahi"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <FeaturedItemContent
                                name="Lamb Karahi"
                                desc="Slow-cooked tender lamb in rich aromatic spices."
                                image="/Lamb Karahi Butt Special -100.jpg.jpeg"
                                variants={[{ size: "½ Kg", price: "£21.99" }, { size: "1 Kg", price: "£41.99" }]}
                            />
                        </div>
                        {/* Card 3: Mix Grill */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="/Mix Grill Platter-100.jpg.jpeg"
                                    alt="Mix Grill"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <FeaturedItemContent
                                name="Mix Grill"
                                desc="Assorted grilled meats served with salad & Afghan naan."
                                image="/Mix Grill Platter-100.jpg.jpeg"
                                variants={[{ size: "Large", price: "£29.99" }]}
                            />
                        </div>
                        {/* Card 4: Chapli Kabab Special */}
                        <div className="group relative bg-card-bg p-6 rounded-2xl hover:bg-[#151515] transition-colors duration-500 border border-white/5 hover:border-primary/30">
                            <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl mb-6 relative">
                                <img
                                    src="/Chapli kabab-100.jpg.jpeg"
                                    alt="Chapli Kabab Special"
                                    className="w-full h-full object-cover img-zoom transform scale-100 group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <FeaturedItemContent
                                name="Chapli Kabab Special"
                                desc="3 Chapli Kababs + 2 Naan. Served with fresh salad & sauce."
                                image="/Chapli kabab-100.jpg.jpeg"
                                variants={[{ size: "Large", price: "£21.99" }]}
                            />
                        </div>
                    </div>
                    <div className="mt-20 text-center">
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-4 px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-black transition-all duration-500 group"
                        >
                            Explore Full Menu
                            <span className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-500"></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA: Taste the Legacy */}
            <section className="relative py-40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://instagram.flyp2-1.fna.fbcdn.net/v/t51.82787-15/603041618_17844074406656141_3772029273287348375_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc5MjQxNjc5Njg2Nzk2MDY2MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=Nk842tWqlogQ7kNvwGTddlh&_nc_oc=AdnihPozlRV6Njb2Y5PQvx76jgUFJL2Jwsl-IUvWyKmmM0rD44-1_ld4oLHrBE17t1n56nkC_iHjZC5qGd2_DVN8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.flyp2-1.fna&_nc_gid=ki6G3Snq77n6zDBHLmnS6w&_nc_ss=8&oh=00_AfyKWEK0XY-d7XCkVOHMlBvUHZ8qeCjXt6v7pWFOWf9TXg&oe=69B4A4A6"
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


            <Footer />
        </main>
    );
}
