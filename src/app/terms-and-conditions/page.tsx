import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms & Conditions | Butt Karahi — Manchester's Authentic Pakistani Restaurant",
    description:
        "Read Butt Karahi's Terms and Conditions governing the use of our website, online ordering system, and table reservation service.",
    alternates: {
        canonical: "https://www.buttkarahi.co/terms-and-conditions",
    },
    openGraph: {
        title: "Terms & Conditions | Butt Karahi",
        description:
            "Terms governing the use of Butt Karahi's website, ordering, and booking services.",
        url: "https://www.buttkarahi.co/terms-and-conditions",
        siteName: "Butt Karahi",
        locale: "en_GB",
        type: "website",
    },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-12 pb-12 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
        <h2 className="font-display text-2xl md:text-3xl text-white italic mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-primary flex-shrink-0"></span>
            {title}
        </h2>
        <div className="space-y-4 text-gray-400 text-sm leading-relaxed pl-9">
            {children}
        </div>
    </div>
);

export default function TermsAndConditionsPage() {
    return (
        <main className="min-h-screen bg-dark overflow-x-hidden">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-40 pb-20 bg-[#020202] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <span className="inline-block text-primary font-bold tracking-[0.35em] text-xs uppercase mb-6">
                        Legal
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
                        Terms &amp; <span className="text-primary italic">Conditions</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Last updated: <time dateTime="2025-04-22">22 April 2025</time>
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-[#050505]">
                <div className="max-w-4xl mx-auto px-6 md:px-12">

                    {/* Intro */}
                    <div className="mb-14 p-8 rounded-2xl border border-primary/20 bg-primary/5">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            These Terms and Conditions ("Terms") govern your use of the <strong className="text-white">Butt Karahi</strong> website at{" "}
                            our website at{" "}
                            <strong className="text-white">www.buttkarahi.co</strong> and all services offered through it, including online ordering and table reservations. By accessing or using our site, you agree to these Terms in full. If you do not agree, please discontinue use immediately.
                        </p>
                    </div>

                    <Section title="1. About Us">
                        <p>
                            Butt Karahi is an independent restaurant located at <strong className="text-white">97 Wilmslow Road, Manchester, M14 5AN, United Kingdom</strong>. We serve authentic Pakistani cuisine and accept online orders and table reservations through this website.
                        </p>
                        <p>
                            For enquiries, contact us at:{" "}
                            <a href="tel:+447438812740" className="text-primary hover:underline">+44 7438 812740</a> or{" "}
                            <a href="mailto:info@buttkarahi.co" className="text-primary hover:underline">info@buttkarahi.co</a>.
                        </p>
                    </Section>

                    <Section title="2. Use of Our Website">
                        <p>By using this website, you agree that you will not:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>Use the site for any unlawful purpose or in violation of any applicable regulations.</li>
                            <li>Submit false, misleading, or fraudulent information in orders or booking requests.</li>
                            <li>Attempt to gain unauthorised access to any part of our website or servers.</li>
                            <li>Copy, reproduce, or redistribute any content from the site without our written permission.</li>
                            <li>Engage in any conduct that may disrupt or impair the performance of the website.</li>
                        </ul>
                        <p className="mt-4">
                            We reserve the right to suspend or terminate access to any user who breaches these Terms.
                        </p>
                    </Section>

                    <Section title="3. Online Ordering">
                        <p>When you place an order through our website:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>Your order constitutes an offer to purchase items from our menu.</li>
                            <li>We reserve the right to accept or decline any order at our discretion (e.g., if items are unavailable).</li>
                            <li>Prices displayed are inclusive of applicable taxes unless otherwise stated, and may be updated without notice.</li>
                            <li>Order confirmation does not guarantee availability; we will contact you promptly if your order cannot be fulfilled.</li>
                            <li>Typical preparation time is approximately <strong className="text-white">25 minutes</strong>. This may vary during peak periods.</li>
                        </ul>
                    </Section>

                    <Section title="4. Table Reservations">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Reservation requests submitted online are subject to availability and staff confirmation.</li>
                            <li>We ask that you arrive within <strong className="text-white">10 minutes</strong> of your booked time. We cannot guarantee your table will be held beyond this period during busy service.</li>
                            <li>For group bookings of 8 or more, please contact us directly by phone to confirm arrangements.</li>
                            <li>We reserve the right to refuse or cancel reservations at our discretion, with reasonable notice provided where possible.</li>
                        </ul>
                    </Section>

                    <Section title="5. Pricing & Payment">
                        <p>
                            All prices listed on our menu are in <strong className="text-white">Pounds Sterling (GBP)</strong> and are subject to change without notice. Payment is accepted via the methods displayed at checkout. In-restaurant payment is accepted in cash and by card.
                        </p>
                        <p className="mt-4">
                            We are not responsible for charges imposed by your bank or payment provider (e.g., foreign transaction fees).
                        </p>
                    </Section>

                    <Section title="6. Cancellations & Refunds">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Orders that have already been prepared cannot be cancelled or refunded.</li>
                            <li>If you believe you have received an incorrect or unsatisfactory item, please contact us within <strong className="text-white">24 hours</strong> of your visit or order.</li>
                            <li>Refunds or replacements are offered at the sole discretion of Butt Karahi management.</li>
                            <li>Table reservations may be cancelled without charge by contacting us at least <strong className="text-white">2 hours</strong> before the booking time.</li>
                        </ul>
                    </Section>

                    <Section title="7. Allergen & Dietary Information">
                        <p>
                            Our food is prepared in a kitchen where allergens, including <strong className="text-white">nuts, gluten, dairy, eggs, and shellfish</strong>, are regularly used. We cannot guarantee that any dish is completely free from allergens.
                        </p>
                        <p className="mt-4">
                            Customers with allergies or dietary requirements must inform us <strong className="text-white">before placing an order</strong>. We cannot accept liability for adverse reactions where this information has not been disclosed.
                        </p>
                    </Section>

                    <Section title="8. Intellectual Property">
                        <p>
                            All content on this website — including text, images, logos, videos, and brand identity — is the intellectual property of Butt Karahi or its licensors and is protected by UK and international copyright law.
                        </p>
                        <p className="mt-4">
                            You may not reproduce, copy, modify, distribute, or create derivative works from any content without our prior written consent.
                        </p>
                    </Section>

                    <Section title="9. Limitation of Liability">
                        <p>
                            To the fullest extent permitted by law, Butt Karahi shall not be liable for any indirect, incidental, or consequential losses arising from your use of our website or services. Our total liability to you shall not exceed the value of the transaction giving rise to the claim.
                        </p>
                        <p className="mt-4">
                            We do not warrant that the website will be uninterrupted, error-free, or free from viruses.
                        </p>
                    </Section>

                    <Section title="10. Third-Party Links">
                        <p>
                            Our website may contain links to third-party services such as Google Maps or social media platforms. We have no control over their content and accept no responsibility for any loss or damage arising from your use of those sites.
                        </p>
                    </Section>

                    <Section title="11. Governing Law">
                        <p>
                            These Terms and Conditions are governed by and construed in accordance with the laws of <strong className="text-white">England and Wales</strong>. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                        </p>
                    </Section>

                    <Section title="12. Changes to These Terms">
                        <p>
                            We reserve the right to update these Terms and Conditions at any time. Continued use of the website after any changes constitutes your acceptance of the updated Terms. The "Last updated" date at the top of this page reflects when changes were last made.
                        </p>
                    </Section>

                    <Section title="13. Contact Us">
                        <p>If you have any questions about these Terms, please contact us:</p>
                        <div className="mt-4 space-y-2">
                            <p><strong className="text-white">Butt Karahi</strong></p>
                            <p>97 Wilmslow Road, Manchester, M14 5AN, United Kingdom</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:info@buttkarahi.co" className="text-primary hover:underline">
                                    info@buttkarahi.co
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <a href="tel:+447438812740" className="text-primary hover:underline">
                                    +44 7438 812740
                                </a>
                            </p>
                        </div>
                    </Section>
                </div>
            </section>

            {/* CTA to Privacy */}
            <section className="py-16 bg-[#020202] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">
                        Also review our{" "}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-4 px-8 py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-500"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
