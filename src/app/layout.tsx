import type { Metadata } from "next";
import { Playfair_Display, Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const notoUrdu = Noto_Nastaliq_Urdu({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-noto-urdu",
});

import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/context/CartContext";

const SITE_URL = "https://www.buttkarahi.co";

export const metadata: Metadata = {
    // ── Core ──────────────────────────────────────────────────────────────
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Butt Karahi | Authentic Pakistani Restaurant — Manchester Curry Mile",
        template: "%s | Butt Karahi",
    },
    description:
        "Butt Karahi — The Master of Karahi. Authentic Pakistani cuisine in the heart of Manchester's Curry Mile. Dine in, order online, or book a table at 97 Wilmslow Road, Manchester M14 5AN.",
    keywords: [
        "Butt Karahi",
        "Pakistani restaurant Manchester",
        "Karahi Manchester",
        "Curry Mile Manchester",
        "authentic Pakistani food",
        "best karahi Manchester",
        "halal restaurant Manchester",
        "Pakistani cuisine UK",
        "Wilmslow Road restaurant",
        "desi food Manchester",
        "lamb karahi",
        "chicken karahi",
        "Pakistani BBQ",
        "chapli kabab Manchester",
        "mix grill Manchester",
        "book table Manchester restaurant",
    ],
    authors: [{ name: "Butt Karahi", url: SITE_URL }],
    creator: "Butt Karahi",
    publisher: "Butt Karahi",
    category: "restaurant",

    // ── Canonical & Alternates ────────────────────────────────────────────
    alternates: {
        canonical: SITE_URL,
        languages: {
            "en-GB": SITE_URL,
        },
    },

    // ── Open Graph ────────────────────────────────────────────────────────
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: SITE_URL,
        siteName: "Butt Karahi",
        title: "Butt Karahi | Authentic Pakistani Restaurant — Manchester Curry Mile",
        description:
            "The Master of Karahi. Authentic desi flavours, high-flame iron woks, and a legacy forged in Manchester's famous Curry Mile. Dine in or order online.",
        images: [
            {
                url: `${SITE_URL}/gallary4.jpg`,
                width: 1200,
                height: 630,
                alt: "Butt Karahi Restaurant — Manchester Curry Mile",
            },
        ],
    },

    // ── Twitter / X Card ─────────────────────────────────────────────────
    twitter: {
        card: "summary_large_image",
        site: "@ButtKarahi",
        creator: "@ButtKarahi",
        title: "Butt Karahi | Authentic Pakistani Restaurant — Manchester",
        description:
            "The Master of Karahi. Dine in or order online from Manchester's iconic Curry Mile restaurant.",
        images: [`${SITE_URL}/gallary4.jpg`],
    },

    // ── Robots ────────────────────────────────────────────────────────────
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // ── Favicon / Icons ───────────────────────────────────────────────────
    icons: {
        icon: [
            { url: "/favicon-256 (1).png", sizes: "256x256", type: "image/png" },
        ],
        apple: "/favicon-256 (1).png",
    },

    // ── Verification (add your Search Console token here) ─────────────────
    // verification: {
    //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    //   yandex: "YOUR_YANDEX_VERIFICATION_TOKEN",
    // },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Butt Karahi",
    alternateName: "Butt Karahi MCR",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-256 (1).png`,
    image: [
        `${SITE_URL}/gallary4.jpg`,
        `${SITE_URL}/Gallery1.jpg`,
        `${SITE_URL}/gallery2.jpg`,
    ],
    description:
        "Butt Karahi is Manchester's authentic Pakistani restaurant, serving traditional karahi, BBQ, and desi cuisine at 97 Wilmslow Road on the famous Curry Mile.",
    address: {
        "@type": "PostalAddress",
        streetAddress: "97 Wilmslow Road",
        addressLocality: "Manchester",
        postalCode: "M14 5AN",
        addressCountry: "GB",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 53.4444,
        longitude: -2.2216,
    },
    telephone: "+447438812740",
    email: "info@buttkarahi.co",
    servesCuisine: ["Pakistani", "Halal", "BBQ", "South Asian"],
    priceRange: "££",
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: "True",
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday", "Sunday",
            ],
            opens: "12:00",
            closes: "23:30",
        },
    ],
    sameAs: [
        "https://www.instagram.com/buttkarahimcr",
        "https://www.facebook.com/buttkarahimcr",
    ],
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: "Butt Karahi",
    image: `${SITE_URL}/gallary4.jpg`,
    url: SITE_URL,
    telephone: "+447438812740",
    address: {
        "@type": "PostalAddress",
        streetAddress: "97 Wilmslow Road",
        addressLocality: "Manchester",
        postalCode: "M14 5AN",
        addressRegion: "Greater Manchester",
        addressCountry: "GB",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 53.4444,
        longitude: -2.2216,
    },
    areaServed: {
        "@type": "City",
        name: "Manchester",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-GB" className="scroll-smooth">
            <head>
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://www.youtube.com" />
            </head>
            <body
                className={`${playfair.variable} ${manrope.variable} ${notoUrdu.variable} font-sans bg-dark text-white antialiased selection:bg-primary selection:text-white`}
            >
                <CartProvider>
                    <Preloader />
                    <CustomCursor />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
