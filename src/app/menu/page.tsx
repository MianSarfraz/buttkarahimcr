"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ChevronDown } from "lucide-react";

type MenuItem = {
    name: string;
    desc: string;
    image: string;
    variants: { size: string; price: string }[];
};

const categories = [
    "Karahi",
    "BBQ",
    "Butt Special Platter",
    "Naan Special",
    "Rice Special",
    "Veg Special",
    "Takatuk",
    "Chapli Kabab",
    "Beverages",
    "Fish",
];

// Verified, stable local image URLs
const IMG = {
    karahi: "/Desi Chicken Karahi-100.jpg.jpeg",
    karahiButter: "/Desi Chicken Karahi Butter-100.jpg.jpeg",
    charsiChicken: "/xharsi chicken karahi.jpg",
    charsiChickenButter: "/xharsi chicken karahi.jpg",
    lambKarahiButt: "/Lamb Karahi Butt Special -100.jpg.jpeg",
    charsiLamb: "/Charsi Lamb Karahi-100.jpg.jpeg",
    tikka: "/Charsi TikkaCharsi Tikka-100.jpg.jpeg",
    chops: "/Charsi Chops LambCharsi Chops Lamb-100.jpg.jpeg",
    mixGrill: "/Mix Grill Platter-100.jpg.jpeg",
    chickenLeg: "/chicken pulao-100.jpg.jpeg",
    malaiBotti: "/Chicken Malai Botti -100.jpg.jpeg",
    seekhKabab: "/Chicken Cheese Seekh Kabab-100.jpg.jpeg",
    fries: "/French Fries-100.jpg.jpeg",
    nuggets: "/Chicken Nuggets (8 Pcs) & Fries-100.jpg.jpeg",
    fish: "/finger fish-100.jpg.jpeg",
    platter: "/bbq platter -100.jpg.jpeg",
    grandPlatter: "/Grand BBQ Platter (Serves 4–6)-100.jpg.jpeg",
    biryani: "/chicken biryani-100.jpg.jpeg",
    matkaBiryani: "/matka biryani-100.jpg.jpeg",
    chapliKabab: "/Chapli kabab-100.jpg.jpeg",
    naan: "/peshawri naan-100.jpg.jpeg",
    roghniNaan: "/roghni naan-100.jpg.jpeg",
    garlicNaan: "/Garlic Naan-100.jpg.jpeg",
    kalwangiNaan: "/Kalwangi NaanKalwangi Naan-100.jpg.jpeg",
    roti: "/peshawri roti-100.jpg.jpeg",
    pulao: "/chicken pulao-100.jpg.jpeg",
    kabuliPulao: "/kabuli pulao-100.jpg.jpeg",
    kabuliMahecha: "/Kabuli Mahecha Pulao-100.jpg.jpeg",
    rice: "/plane rice-100.jpg.jpeg",
    daal: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=800",
    salad: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800",
    vegMix: "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=800",
    lassi: "/Lassi.jpg",
    lemonSoda: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    mintSoda: "/Mint Soda.jpg",
    jugSoda: "/Jug Of Soda.jpg",
    mangoLassi: "/Mango Lassi.jpg",
    jugLassi: "/Lassi.jpg",
    softDrink: "/soft drink 350 ml.png",
    softDrinkCan: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    sajji: "https://images.pexels.com/photos/2491275/pexels-photo-2491275.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const menuItems: Record<string, MenuItem[]> = {
    "Karahi": [
        { name: "Desi Chicken Karahi", desc: "Butt Special Organic Chicken cooked in traditional spices.", image: IMG.karahi, variants: [{ size: "½ Kg", price: "£19.99" }, { size: "1 Kg", price: "£39.99" }] },
        { name: "Desi Chicken Karahi Butter", desc: "Butt Special Organic Chicken cooked in rich desi butter.", image: IMG.karahiButter, variants: [{ size: "½ Kg", price: "£21.99" }, { size: "1 Kg", price: "£41.99" }] },
        { name: "Charsi Chicken Karahi", desc: "Authentic Peshawari style chicken karahi with minimal spices.", image: IMG.charsiChicken, variants: [{ size: "½ Kg", price: "£15.99" }, { size: "1 Kg", price: "£29.99" }] },
        { name: "Charsi Chicken Karahi Butter", desc: "Charsi style chicken karahi cooked in fresh butter.", image: IMG.charsiChickenButter, variants: [{ size: "½ Kg", price: "£16.99" }, { size: "1 Kg", price: "£31.99" }] },
        { name: "Lamb Karahi Butt Special", desc: "Premium Butt Special Lamb Karahi cooked to perfection.", image: IMG.lambKarahiButt, variants: [{ size: "½ Kg", price: "£19.99" }, { size: "1 Kg", price: "£39.99" }] },
        { name: "Lamb Karahi", desc: "Slow-cooked tender lamb in rich aromatic spices.", image: IMG.lambKarahiButt, variants: [{ size: "½ Kg", price: "£21.99" }, { size: "1 Kg", price: "£41.99" }] },
        { name: "Charsi Lamb Karahi", desc: "Classic Charsi lamb karahi from the streets of Peshawar.", image: IMG.charsiLamb, variants: [{ size: "½ Kg", price: "£17.99" }, { size: "1 Kg", price: "£35.99" }] },
    ],
    "BBQ": [
        { name: "Charsi Tikka (Lamb / Chicken)", desc: "Succulent charsi-style tikka skewers.", image: IMG.tikka, variants: [{ size: "½ Kg", price: "£8.99" }, { size: "1 Kg", price: "£33.99" }] },
        { name: "Charsi Chops Lamb", desc: "Tender lamb chops marinated in charsi spices.", image: IMG.chops, variants: [{ size: "½ Kg", price: "£16.99" }, { size: "1 Kg", price: "£33.99" }] },
        { name: "Mix Grill", desc: "Served with Fresh Salad & Afghan Naan. Assorted grilled meats.", image: IMG.mixGrill, variants: [{ size: "Large", price: "£29.99" }] },
        { name: "Chicken Tikka Leg (Butt Special)", desc: "Juicy chicken leg marinated and grilled to perfection.", image: IMG.chickenLeg, variants: [{ size: "Large", price: "£3.49" }] },
        { name: "Chicken Malai Botti", desc: "Creamy, melt-in-your-mouth chicken skewers.", image: IMG.malaiBotti, variants: [{ size: "½ Kg", price: "£14.99" }, { size: "1 Kg", price: "£29.99" }] },
        { name: "Seekh Kabab Portion (Lamb / Chicken)", desc: "Classic minced meat skewers.", image: IMG.seekhKabab, variants: [{ size: "Large", price: "£3.99" }] },
        { name: "Chicken Cheese Seekh Kabab", desc: "Succulent chicken seekh kabab filled with melted cheese.", image: IMG.seekhKabab, variants: [{ size: "Large", price: "£3.99" }] },
        { name: "French Fries", desc: "Crispy golden fries.", image: IMG.fries, variants: [{ size: "Large", price: "£2.99" }] },
        { name: "Chicken Nuggets (08 Pcs) & Fries", desc: "Crispy nuggets served with french fries.", image: IMG.nuggets, variants: [{ size: "Large", price: "£5.99" }] },
    ],
    "Butt Special Platter": [
        { name: "Butt Special BBQ Platter", desc: "1 Seekh Charsi Tikka • 3 PCs Chops • 2 PCs Chicken Leg • 2 PCs Small Chapli Kabab • 1 Seekh Kabab. With Kabuli Pulao & 1 Large Naan.", image: IMG.platter, variants: [{ size: "Serves 2–4", price: "£41.99" }, { size: "Serves 4–6", price: "£69.99" }] },
    ],
    "Naan Special": [
        { name: "Peshawari Naan", desc: "Traditional fluffy Peshawari heart-baked naan.", image: IMG.naan, variants: [{ size: "Small", price: "£1.49" }, { size: "Large", price: "£2.99" }] },
        { name: "Peshawari Roti", desc: "Classic whole-wheat roti.", image: IMG.roti, variants: [{ size: "Small", price: "£1.49" }, { size: "Large", price: "£2.49" }] },
        { name: "Roghni Naan", desc: "Buttery, sesame-topped Roghni Naan.", image: IMG.roghniNaan, variants: [{ size: "Large", price: "£2.49" }] },
        { name: "Garlic Naan", desc: "Naan topped with fresh garlic and butter.", image: IMG.garlicNaan, variants: [{ size: "Large", price: "£2.49" }] },
        { name: "Kalwangi Naan", desc: "Naan topped with nigella seeds.", image: IMG.kalwangiNaan, variants: [{ size: "Large", price: "£2.49" }] },
    ],
    "Rice Special": [
        { name: "Kabuli Pulao", desc: "Traditional Afghan rice with carrots and raisins.", image: IMG.kabuliPulao, variants: [{ size: "Small", price: "£9.99" }, { size: "Large", price: "£11.99" }] },
        { name: "Kabuli Mahecha Pulao", desc: "Aromatic pulao with a special Mahecha blend.", image: IMG.kabuliMahecha, variants: [{ size: "Small", price: "£7.99" }, { size: "Large", price: "£9.99" }] },
        { name: "Chicken Pulao", desc: "Fragrant rice slow-cooked with tender chicken pieces.", image: IMG.pulao, variants: [{ size: "Large", price: "£6.99" }] },
        { name: "Chicken Biryani", desc: "Classic spiced chicken biryani layered with aromatic basmati rice.", image: IMG.biryani, variants: [{ size: "Large", price: "£6.99" }] },
        { name: "Plain Rice", desc: "Fluffy steamed basmati rice, a perfect accompaniment.", image: IMG.rice, variants: [{ size: "Large", price: "£4.99" }] },
    ],
    "Veg Special": [
        { name: "Special Daal Masha Fry", desc: "Lentils tempered with spices.", image: IMG.daal, variants: [{ size: "Small", price: "£5.99" }, { size: "Large", price: "£7.99" }] },
        { name: "Lobiya Dall", desc: "Black-eyed peas in spiced gravy.", image: IMG.daal, variants: [{ size: "Small", price: "£5.99" }, { size: "Large", price: "£7.99" }] },
        { name: "Mix Vegetable", desc: "Seasonal vegetables in desi spices.", image: IMG.vegMix, variants: [{ size: "Small", price: "£5.99" }, { size: "Large", price: "£7.99" }] },
        { name: "Greek Salad", desc: "Fresh cucumber, tomato, olives, and feta with a light dressing.", image: IMG.salad, variants: [{ size: "Large", price: "£3.99" }] },
        { name: "Fresh Salad", desc: "Crisp, fresh garden salad served with a wedge of lemon.", image: IMG.salad, variants: [{ size: "Large", price: "£1.99" }] },
    ],
    "Takatuk": [
        { name: "Maghaz Karahi", desc: "Brain cooked on a sizzling tawa with spicy masala.", image: IMG.charsiChicken, variants: [{ size: "Large", price: "£14.99" }] },
        { name: "Qeema Fry", desc: "Spiced minced meat dry-fried.", image: IMG.charsiLamb, variants: [{ size: "Small", price: "£12.99" }, { size: "Large", price: "£25.99" }] },
        { name: "Seekh Kabab Karahi (Lamb / Chicken)", desc: "Seekh kabab cooked in karahi masala.", image: IMG.seekhKabab, variants: [{ size: "Small", price: "£13.99" }, { size: "Large", price: "£21.99" }] },
        { name: "Special Daal Ghost Karahi", desc: "Meat slow-cooked with lentils in a karahi.", image: IMG.daal, variants: [{ size: "Small", price: "£11.99" }, { size: "Large", price: "£19.99" }] },
    ],
    "Chapli Kabab": [
        { name: "Peshawari Chapli Kabab", desc: "Famous flat minced beef kabab with pomegranate seeds and special spices.", image: IMG.chapliKabab, variants: [{ size: "Large", price: "£7.99" }] },
        { name: "Peshawari Chapli Kabab (Egg)", desc: "Peshawari chapli kabab enriched with egg for extra richness.", image: IMG.chapliKabab, variants: [{ size: "Large", price: "£7.99" }] },
        { name: "Chapli Kabab Special", desc: "Famous Peshawari Chapli Kabab. 3 Chapli Kababs + 2 Naan, served with fresh salad & sauce.", image: IMG.chapliKabab, variants: [{ size: "Large", price: "£21.99" }] },
    ],
    "Beverages": [
        { name: "Lemon Soda", desc: "Refreshing chilled lemon soda.", image: IMG.lemonSoda, variants: [{ size: "Large", price: "£3.49" }] },
        { name: "Mint Soda", desc: "Cooling mint-infused sparkling soda.", image: IMG.mintSoda, variants: [{ size: "Large", price: "£3.49" }] },
        { name: "Jug of Soda (Lemon / Mint)", desc: "A large jug of refreshing lemon or mint soda.", image: IMG.jugSoda, variants: [{ size: "Lemon", price: "£7.99" }, { size: "Mint", price: "£7.99" }] },
        { name: "Lassi", desc: "Thick, creamy yogurt drink available in Sweet, Saltish, or Mango flavour.", image: IMG.lassi, variants: [{ size: "Sweet", price: "£3.49" }, { size: "Saltish", price: "£3.49" }, { size: "Mango", price: "£3.49" }] },
        { name: "Jug of Lassi", desc: "A large jug of refreshing creamy lassi.", image: IMG.jugLassi, variants: [{ size: "Sweet", price: "£7.99" }, { size: "Saltish", price: "£7.99" }] },
        { name: "Soft Drinks (Bottle 350ml)", desc: "Chilled bottled soft drink. Select your flavour.", image: IMG.softDrink, variants: [{ size: "Coke", price: "£2.49" }, { size: "Sprite", price: "£2.49" }, { size: "Fanta", price: "£2.49" }, { size: "7up", price: "£2.49" }] },
        { name: "Soft Drinks (Can)", desc: "Chilled canned soft drink. Select your flavour.", image: IMG.softDrinkCan, variants: [{ size: "Coke", price: "£1.49" }, { size: "Diet Coke", price: "£1.49" }, { size: "Sprite", price: "£1.49" }, { size: "7up", price: "£1.49" }, { size: "Fanta", price: "£1.49" }] },
    ],
    "Fish": [
        { name: "Finger Fish", desc: "Crispy fried fresh fish fingers.", image: IMG.fish, variants: [{ size: "½ Kg", price: "£11.99" }, { size: "1 Kg", price: "£21.99" }] },
    ],
};

const MenuItemCard = ({ item }: { item: MenuItem }) => {
    const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
    const { addToCart } = useCart();

    return (
        <div className="menu-item flex flex-col md:flex-row gap-6 group hover:bg-white/[0.02] p-4 rounded-xl transition-colors duration-500">
            <div className="w-full md:w-32 h-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-2 gap-2">
                    <h3 className="font-display text-xl md:text-2xl text-white italic group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.name}
                    </h3>
                    <div className="flex flex-col items-end">
                        <span className="text-primary font-bold text-base whitespace-nowrap">
                            {selectedVariant.price}
                        </span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-2 mb-4">
                    {item.desc}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Size Selector */}
                    {item.variants.length > 1 && (
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/10">
                            {item.variants.map((v) => (
                                <button
                                    key={v.size}
                                    onClick={() => setSelectedVariant(v)}
                                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${selectedVariant.size === v.size
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
                        onClick={() =>
                            addToCart({
                                id: `${item.name}-${selectedVariant.size}`,
                                name: `${item.name} (${selectedVariant.size})`,
                                price: selectedVariant.price,
                                image: item.image,
                            })
                        }
                        className="flex-1 min-w-[140px] bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function MenuPage() {
    const [activeTab, setActiveTab] = useState("Karahi");

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.fromTo(
                ".menu-item",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", clearProps: "all" }
            );
        }
    }, [activeTab]);

    return (
        <main className="min-h-screen bg-dark">
            <Navbar />

            {/* Hero */}
            <header className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src={IMG.karahi}
                        className="w-full h-full object-cover opacity-40 scale-110 grayscale"
                        alt="Menu Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-primary text-xs font-bold tracking-[0.5em] uppercase mb-4 block animate-pulse">
                        Authentic Taste
                    </span>
                    <h1 className="font-display text-6xl md:text-9xl text-white leading-none mb-8">
                        The <span className="text-primary italic">Menu.</span>
                    </h1>
                    <p className="text-gray-400 text-sm tracking-[0.15em] uppercase">
                        Preparation Time: Approx. 25 Minutes &nbsp;·&nbsp; We Do Not Guarantee Dishes Are Nut-Free
                    </p>
                </div>
            </header>

            {/* Category Tabs */}
            <div className="sticky top-[72px] z-40 bg-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1400px] mx-auto overflow-x-auto no-scrollbar py-6 flex justify-start gap-6 md:gap-10 px-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`whitespace-nowrap text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${activeTab === cat
                                ? "text-primary border-primary"
                                : "text-gray-500 border-transparent hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <section className="py-20 md:py-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {menuItems[activeTab]?.map((item, idx) => (
                            <MenuItemCard key={`${activeTab}-${idx}`} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
