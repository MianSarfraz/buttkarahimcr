import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Menu | Authentic Karahi & Pakistani BBQ",
    description: "Explore the legendary Butt Karahi menu. From our signature Desi Chicken Karahi to Charsi Lamb and sizzling BBQ platters, experience the true taste of Lahore in Manchester's Curry Mile.",
    alternates: {
        canonical: "https://www.buttkarahi.co/menu",
    },
    openGraph: {
        title: "The Menu | Butt Karahi Manchester",
        description: "View our full menu of authentic Pakistani dishes, signature karahis, and sizzling BBQ.",
        url: "https://www.buttkarahi.co/menu",
        images: [{ url: "/Desi Chicken Karahi-100.jpg.jpeg" }],
    },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
