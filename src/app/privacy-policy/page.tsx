import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Butt Karahi — Manchester's Authentic Pakistani Restaurant",
    description:
        "Read Butt Karahi's Privacy Policy. We are committed to protecting your personal data in compliance with UK GDPR and the Data Protection Act 2018.",
    alternates: {
        canonical: "https://www.buttkarahi.co/privacy-policy",
    },
    openGraph: {
        title: "Privacy Policy | Butt Karahi",
        description:
            "Learn how Butt Karahi handles and protects your personal information.",
        url: "https://www.buttkarahi.co/privacy-policy",
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

export default function PrivacyPolicyPage() {
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
                        Privacy <span className="text-primary italic">Policy</span>
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
                            At <strong className="text-white">Butt Karahi</strong> ("we", "us", or "our"), located at 97 Wilmslow Road, Manchester, M14 5AN, we are committed to protecting and respecting your privacy. This policy explains how we collect, use, and safeguard your personal data in accordance with the <strong className="text-white">UK General Data Protection Regulation (UK GDPR)</strong> and the <strong className="text-white">Data Protection Act 2018</strong>.
                        </p>
                    </div>

                    <Section title="1. Information We Collect">
                        <p>We may collect and process the following personal data about you:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong className="text-white">Identity Data</strong>: First name, last name.</li>
                            <li><strong className="text-white">Contact Data</strong>: Phone number, email address.</li>
                            <li><strong className="text-white">Order Data</strong>: Items ordered, quantities, special instructions, and delivery preferences.</li>
                            <li><strong className="text-white">Booking Data</strong>: Table reservation details, number of guests, date and time preferences, and special occasion notes.</li>
                            <li><strong className="text-white">Technical Data</strong>: IP address, browser type, operating system, and website usage data collected via cookies.</li>
                        </ul>
                    </Section>

                    <Section title="2. How We Use Your Information">
                        <p>We use your personal data for the following lawful purposes:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>To process and fulfil your table bookings and food orders.</li>
                            <li>To contact you regarding your reservation or order (e.g., confirmation, updates).</li>
                            <li>To improve our website and services through anonymised analytics.</li>
                            <li>To comply with our legal obligations.</li>
                            <li>To send you marketing communications, only where you have given explicit consent.</li>
                        </ul>
                    </Section>

                    <Section title="3. Legal Basis for Processing">
                        <p>We process your personal data under the following legal bases:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong className="text-white">Contractual necessity</strong>: To fulfil your order or reservation.</li>
                            <li><strong className="text-white">Legitimate interests</strong>: To improve our services and prevent fraud.</li>
                            <li><strong className="text-white">Legal obligation</strong>: To comply with applicable laws and regulations.</li>
                            <li><strong className="text-white">Consent</strong>: For marketing emails or cookies where required.</li>
                        </ul>
                    </Section>

                    <Section title="4. Cookies">
                        <p>
                            Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. We use:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong className="text-white">Essential cookies</strong>: Required for the site to function (e.g., shopping cart, session).</li>
                            <li><strong className="text-white">Analytics cookies</strong>: To understand how visitors use our site (e.g., Google Analytics).</li>
                        </ul>
                        <p className="mt-4">
                            You can control or disable cookies through your browser settings. Disabling essential cookies may affect the functionality of our website.
                        </p>
                    </Section>

                    <Section title="5. Data Sharing & Third Parties">
                        <p>
                            We do not sell or rent your personal data to any third party. We may share your information with trusted service providers who assist us in operating our website and business, subject to confidentiality obligations. These may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>Payment processors (e.g., Stripe, PayPal).</li>
                            <li>Website hosting and technical infrastructure providers.</li>
                            <li>Notification services used to manage order/booking alerts.</li>
                        </ul>
                        <p className="mt-4">
                            We may also disclose your information if required by law or to protect the rights, property, or safety of Butt Karahi, our customers, or others.
                        </p>
                    </Section>

                    <Section title="6. Data Retention">
                        <p>
                            We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements. Booking and order data is typically retained for <strong className="text-white">3 years</strong>. You may request deletion at any time (subject to legal obligations).
                        </p>
                    </Section>

                    <Section title="7. Your Rights">
                        <p>Under UK GDPR, you have the following rights:</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong className="text-white">Right of Access</strong>: Request a copy of the data we hold about you.</li>
                            <li><strong className="text-white">Right to Rectification</strong>: Request correction of inaccurate data.</li>
                            <li><strong className="text-white">Right to Erasure</strong>: Request deletion of your personal data ("right to be forgotten").</li>
                            <li><strong className="text-white">Right to Restriction</strong>: Request limited processing of your data.</li>
                            <li><strong className="text-white">Right to Data Portability</strong>: Request your data in a machine-readable format.</li>
                            <li><strong className="text-white">Right to Object</strong>: Object to processing based on legitimate interests or for direct marketing.</li>
                        </ul>
                        <p className="mt-4">
                            To exercise any of these rights, contact us at{" "}
                            <a href="mailto:privacy@buttkarahi.co" className="text-primary hover:underline">
                                privacy@buttkarahi.co
                            </a>. We will respond within <strong className="text-white">30 days</strong>.
                        </p>
                    </Section>

                    <Section title="8. Data Security">
                        <p>
                            We implement appropriate technical and organisational measures to protect your personal data against accidental loss, unauthorised access, alteration, or disclosure. Our website uses HTTPS encryption. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="9. External Links">
                        <p>
                            Our website may contain links to third-party websites (e.g., Google Maps, social media platforms). We are not responsible for the privacy practices of those sites and encourage you to review their respective privacy policies.
                        </p>
                    </Section>

                    <Section title="10. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
                        </p>
                    </Section>

                    <Section title="11. Contact & Complaints">
                        <p>
                            If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                        </p>
                        <div className="mt-4 space-y-2">
                            <p><strong className="text-white">Butt Karahi</strong></p>
                            <p>97 Wilmslow Road, Manchester, M14 5AN, United Kingdom</p>
                            <p>
                                Email:{" "}
                                <a href="mailto:privacy@buttkarahi.co" className="text-primary hover:underline">
                                    privacy@buttkarahi.co
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <a href="tel:+447438812740" className="text-primary hover:underline">
                                    +44 7438 812740
                                </a>
                            </p>
                        </div>
                        <p className="mt-4">
                            You also have the right to lodge a complaint with the UK's data protection authority, the{" "}
                            <a
                                href="https://ico.org.uk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                Information Commissioner's Office (ICO)
                            </a>{" "}
                            at <strong className="text-white">0303 123 1113</strong> or{" "}
                            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                ico.org.uk
                            </a>.
                        </p>
                    </Section>
                </div>
            </section>

            {/* CTA to Terms */}
            <section className="py-16 bg-[#020202] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">
                        Also review our{" "}
                        <Link href="/terms-and-conditions" className="text-primary hover:underline">
                            Terms & Conditions
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
