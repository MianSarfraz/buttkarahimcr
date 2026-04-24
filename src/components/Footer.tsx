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
                            <div className="flex gap-4 mt-6">
                                <a href="https://www.instagram.com/buttkarahimcr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                                <a href="https://www.facebook.com/buttkarahimcr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                            </div>
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
                                    <p className="text-gray-500 text-xs mt-1">+44 7438 812740</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 gap-4">
                    <p>© 2025 Butt Karahi. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="hover:text-primary transition-colors cursor-pointer">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-and-conditions" className="hover:text-primary transition-colors cursor-pointer">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
