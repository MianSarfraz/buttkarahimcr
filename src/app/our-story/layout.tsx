import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Story | A Legacy of Taste from Lahore to Manchester",
    description: "Discover the heritage of Butt Karahi. From our roots in Lakshmi Chowk, Lahore, to 97 Wilmslow Road, Manchester, learn about our secret spice blends and three generations of culinary excellence.",
    alternates: {
        canonical: "https://www.buttkarahi.co/our-story",
    },
    openGraph: {
        title: "Our Story | Butt Karahi — The Master of Karahi",
        description: "Learn about the heritage and tradition behind Manchester's most authentic Pakistani dining experience.",
        url: "https://www.buttkarahi.co/our-story",
        images: [{ url: "/Gallery1.jpg" }],
    },
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
