"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount, isCartOpen, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    const handleNavClick = () => setMobileOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || mobileOpen
                        ? "bg-black/90 backdrop-blur-md border-white/10 py-3"
                        : "bg-transparent border-transparent py-5"
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex flex-col items-start relative z-50" onClick={handleNavClick}>
                        <div className="flex flex-col items-center drop-shadow-md">
                            <h1 className="logo-text-mimic text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none">
                                Butt Karahi
                            </h1>
                            <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-wide text-white mt-1 shadow-black drop-shadow-md">
                                97 Wilmslow Road - Manchester
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10 text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-md">
                        <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
                        <Link href="/our-story" className="hover:text-primary transition-colors">Our Story</Link>
                        <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>

                        <div className="flex items-center gap-6">
                            <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
                                <ShoppingBag className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce-subtle shadow-glow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <Link
                                href="/#booking"
                                className="border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 bg-black/20 backdrop-blur-sm"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Right Side */}
                    <div className="md:hidden flex items-center gap-3">
                        <button onClick={() => setIsCartOpen(true)} className="relative text-white p-2">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-glow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileOpen(prev => !prev)}
                            className="text-white p-2"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileOpen && (
                    <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-6 text-[11px] font-bold tracking-[0.25em] uppercase">
                        <Link href="/menu" onClick={handleNavClick} className="hover:text-primary transition-colors py-2 border-b border-white/5">Menu</Link>
                        <Link href="/our-story" onClick={handleNavClick} className="hover:text-primary transition-colors py-2 border-b border-white/5">Our Story</Link>
                        <Link href="/gallery" onClick={handleNavClick} className="hover:text-primary transition-colors py-2 border-b border-white/5">Gallery</Link>
                        <Link
                            href="/#booking"
                            onClick={handleNavClick}
                            className="mt-2 w-full text-center border border-primary/60 text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            Book a Table
                        </Link>
                    </div>
                )}
            </nav>

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
