import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Visual Chronicle of Authentic Dining",
    description: "A visual journey through Butt Karahi. Explore our authentic interiors, live cooking action, and the vibrant atmosphere of our Manchester restaurant on the Curry Mile.",
    alternates: {
        canonical: "https://www.buttkarahi.co/gallery",
    },
    openGraph: {
        title: "Gallery | Butt Karahi Manchester",
        description: "Experience the atmosphere and authentic dishes of Butt Karahi through our visual gallery.",
        url: "https://www.buttkarahi.co/gallery",
        images: [{ url: "/gallary4.jpg" }],
    },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
