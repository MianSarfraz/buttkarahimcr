import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#020202] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <div>
                            <div className="logo-text-mimic text-3xl mb-2">Butt Karahi</div>
                            <p className="text-gray-500 text-sm leading-relaxed mt-4">
                                The gold standard of Pakistani cuisine. Experience the authentic
                                flavor of the wok, mastered over generations.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-display text-lg italic mb-8 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-primary"></span> Quick Links
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-primary transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300"></span>{" "}
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/menu"
                                    className="text-gray-400 hover:text-primary transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300"></span>{" "}
                                    The Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className="text-gray-400 hover:text-primary transition-colors text-sm uppercase tracking-widest flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300"></span>{" "}
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-display text-lg italic mb-8 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-primary"></span> Services
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <span className="text-gray-400 text-sm uppercase tracking-widest">
                                    Private Dining
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-400 text-sm uppercase tracking-widest">
                                    Catering
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-display text-lg italic mb-8 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-primary"></span> Contact
                        </h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="text-primary text-sm mt-1">📍</span>
                                <div>
                                    <p className="text-white text-sm font-bold uppercase tracking-wide">
                                        Manchester
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        97 Wilmslow Road, M14 5AN
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-primary text-sm mt-1">📞</span>
                                <div>
                                    <p className="text-white text-sm font-bold uppercase tracking-wide">
                                        Reservations
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">+44 161 123 4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 gap-4">
                    <p>© 2024 Butt Karahi. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-primary transition-colors">
                            Privacy Policy
                        </span>
                        <span className="hover:text-primary transition-colors">
                            Terms of Service
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
