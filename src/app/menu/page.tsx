"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

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
    "Special Offers",
];

// Verified, stable image URLs
const IMG = {
    karahi: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=800",
    karahi2: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=800",
    lambKarahi: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    tikka: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800",
    chops: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=800",
    mixGrill: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
    chickenLeg: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800",
    seekhKabab: "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800",
    fries: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800",
    nuggets: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800",
    fish: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800",
    platter: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
    biryani: "https://images.pexels.com/photos/12737547/pexels-photo-12737547.jpeg?auto=compress&cs=tinysrgb&w=800",
    chapliKabab: "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=800",
    naan: "https://images.pexels.com/photos/1117194/pexels-photo-1117194.jpeg?auto=compress&cs=tinysrgb&w=800",
    rice: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    pulao: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800",
    daal: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=800",
    salad: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800",
    vegMix: "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=800",
    lassi: "https://images.pexels.com/photos/5765/food-milk-foam-drink.jpg?auto=compress&cs=tinysrgb&w=800",
    soda: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800",
    softDrink: "https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&w=800",
    sajji: "https://images.pexels.com/photos/2491275/pexels-photo-2491275.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const menuItems: Record<string, { name: string; price: string; desc: string; image: string }[]> = {
    "Karahi": [
        {
            name: "Desi Chicken Karahi (Small - ½ Kg)",
            price: "£19.99",
            desc: "Butt Special Organic Chicken cooked in traditional spices. Serves 1-2.",
            image: IMG.karahi,
        },
        {
            name: "Desi Chicken Karahi (Large - 1 Kg)",
            price: "£39.99",
            desc: "Butt Special Organic Chicken cooked in traditional spices. Serves 3-4.",
            image: IMG.karahi,
        },
        {
            name: "Desi Chicken Karahi Butter (Small - ½ Kg)",
            price: "£21.99",
            desc: "Butt Special Organic Chicken cooked in rich desi butter.",
            image: IMG.karahi2,
        },
        {
            name: "Desi Chicken Karahi Butter (Large - 1 Kg)",
            price: "£41.99",
            desc: "Butt Special Organic Chicken cooked in rich desi butter.",
            image: IMG.karahi2,
        },
        {
            name: "Charsi Chicken Karahi (Small - ½ Kg)",
            price: "£15.99",
            desc: "Authentic Peshawari style chicken karahi with minimal spices.",
            image: IMG.karahi,
        },
        {
            name: "Charsi Chicken Karahi (Large - 1 Kg)",
            price: "£29.99",
            desc: "Authentic Peshawari style chicken karahi with minimal spices.",
            image: IMG.karahi,
        },
        {
            name: "Charsi Chicken Karahi Butter (Small - ½ Kg)",
            price: "£16.99",
            desc: "Charsi style chicken karahi cooked in fresh butter.",
            image: IMG.karahi2,
        },
        {
            name: "Charsi Chicken Karahi Butter (Large - 1 Kg)",
            price: "£31.99",
            desc: "Charsi style chicken karahi cooked in fresh butter.",
            image: IMG.karahi2,
        },
        {
            name: "Lamb Karahi Butt Special (Small - ½ Kg)",
            price: "£19.99",
            desc: "Premium Butt Special Lamb Karahi cooked to perfection.",
            image: IMG.lambKarahi,
        },
        {
            name: "Lamb Karahi Butt Special (Large - 1 Kg)",
            price: "£39.99",
            desc: "Premium Butt Special Lamb Karahi cooked to perfection.",
            image: IMG.lambKarahi,
        },
        {
            name: "Lamb Karahi (Small - ½ Kg)",
            price: "£21.99",
            desc: "Slow-cooked tender lamb in rich aromatic spices.",
            image: IMG.lambKarahi,
        },
        {
            name: "Lamb Karahi (Large - 1 Kg)",
            price: "£41.99",
            desc: "Slow-cooked tender lamb in rich aromatic spices.",
            image: IMG.lambKarahi,
        },
        {
            name: "Charsi Lamb Karahi (Small - ½ Kg)",
            price: "£17.99",
            desc: "Classic Charsi lamb karahi from the streets of Peshawar.",
            image: IMG.karahi,
        },
        {
            name: "Charsi Lamb Karahi (Large - 1 Kg)",
            price: "£35.99",
            desc: "Classic Charsi lamb karahi from the streets of Peshawar.",
            image: IMG.karahi,
        },
    ],
    "BBQ": [
        {
            name: "Charsi Tikka (Small - ½ Kg)",
            price: "£8.99",
            desc: "Succulent charsi-style tikka skewers.",
            image: IMG.tikka,
        },
        {
            name: "Charsi Tikka (Large - 1 Kg)",
            price: "£33.99",
            desc: "Succulent charsi-style tikka skewers.",
            image: IMG.tikka,
        },
        {
            name: "Charsi Chops Lamb (Small - ½ Kg)",
            price: "£16.99",
            desc: "Tender lamb chops marinated in charsi spices.",
            image: IMG.chops,
        },
        {
            name: "Charsi Chops Lamb (Large - 1 Kg)",
            price: "£33.99",
            desc: "Tender lamb chops marinated in charsi spices.",
            image: IMG.chops,
        },
        {
            name: "Mix Grill Platter",
            price: "£29.99",
            desc: "Served with Fresh Salad & Afghan Naan. Assorted grilled meats.",
            image: IMG.mixGrill,
        },
        {
            name: "Chicken Tikka Leg (Butt Special)",
            price: "£3.49",
            desc: "Juicy chicken leg marinated and grilled to perfection.",
            image: IMG.chickenLeg,
        },
        {
            name: "Chicken Malai Botti (Small - ½ Kg)",
            price: "£14.99",
            desc: "Creamy, melt-in-your-mouth chicken skewers.",
            image: IMG.tikka,
        },
        {
            name: "Chicken Malai Botti (Large - 1 Kg)",
            price: "£29.99",
            desc: "Creamy, melt-in-your-mouth chicken skewers.",
            image: IMG.tikka,
        },
        {
            name: "Seekh Kabab Portion (Lamb / Chicken)",
            price: "£3.99",
            desc: "Classic minced meat skewers.",
            image: IMG.seekhKabab,
        },
        {
            name: "Chicken Cheese Seekh Kabab",
            price: "£3.99",
            desc: "Succulent chicken seekh kabab filled with melted cheese.",
            image: IMG.seekhKabab,
        },
        {
            name: "French Fries",
            price: "£2.99",
            desc: "Crispy golden fries.",
            image: IMG.fries,
        },
        {
            name: "Chicken Nuggets (8 Pcs) & Fries",
            price: "£5.99",
            desc: "Crispy nuggets served with french fries.",
            image: IMG.nuggets,
        },
        {
            name: "Finger Fish (Small - ½ Kg)",
            price: "£11.99",
            desc: "Crispy fried fresh fish fingers.",
            image: IMG.fish,
        },
        {
            name: "Finger Fish (Large - 1 Kg)",
            price: "£21.99",
            desc: "Crispy fried fresh fish fingers.",
            image: IMG.fish,
        },
    ],
    "Butt Special Platter": [
        {
            name: "Butt Special BBQ Platter (Serves 2–4)",
            price: "£41.99",
            desc: "1 Seekh Charsi Tikka • 3 PCs Chops • 2 PCs Chicken Leg • 2 PCs Small Chapli Kabab • 1 Seekh Kabab. With Kabuli Pulao & 1 Large Naan.",
            image: IMG.platter,
        },
        {
            name: "Grand BBQ Platter (Serves 4–6)",
            price: "£69.99",
            desc: "2 Seekh Charsi Tikka • 6 PCs Chops • 4 PCs Chicken Leg • 3 PCs Small Chapli Kabab • 2 PCs Seekh Kabab. With Kabuli Pulao & Jug Lemon Soda.",
            image: IMG.mixGrill,
        },
        {
            name: "Chapli Kabab Special",
            price: "£21.99",
            desc: "Famous Peshawari Chapli Kabab. 3 Chapli Kababs + 2 Naan, served with fresh salad & sauce.",
            image: IMG.chapliKabab,
        },
        {
            name: "Matka Biryani",
            price: "£7.99",
            desc: "Fragrant, slow-cooked biryani served in a traditional clay pot (matka).",
            image: IMG.biryani,
        },
    ],
    "Naan Special": [
        {
            name: "Peshawari Naan (Small)",
            price: "£1.49",
            desc: "Traditional fluffy Peshawari heart-baked naan.",
            image: IMG.naan,
        },
        {
            name: "Peshawari Naan (Large)",
            price: "£2.99",
            desc: "Traditional fluffy Peshawari heart-baked naan.",
            image: IMG.naan,
        },
        {
            name: "Peshawari Roti (Small)",
            price: "£1.49",
            desc: "Classic whole-wheat roti.",
            image: IMG.naan,
        },
        {
            name: "Peshawari Roti (Large)",
            price: "£2.49",
            desc: "Classic whole-wheat roti.",
            image: IMG.naan,
        },
        {
            name: "Roghni Naan",
            price: "£2.49",
            desc: "Buttery, sesame-topped Roghni Naan.",
            image: IMG.naan,
        },
        {
            name: "Garlic Naan",
            price: "£2.49",
            desc: "Naan topped with fresh garlic and butter.",
            image: IMG.naan,
        },
        {
            name: "Kalwangi Naan",
            price: "£2.49",
            desc: "Naan topped with nigella seeds.",
            image: IMG.naan,
        },
    ],
    "Rice Special": [
        {
            name: "Kabuli Pulao (Small)",
            price: "£9.99",
            desc: "Traditional Afghan rice with carrots and raisins.",
            image: IMG.pulao,
        },
        {
            name: "Kabuli Pulao (Large)",
            price: "£11.99",
            desc: "Traditional Afghan rice with carrots and raisins.",
            image: IMG.pulao,
        },
        {
            name: "Kabuli Mahecha Pulao (Small)",
            price: "£7.99",
            desc: "Aromatic pulao with a special Mahecha blend.",
            image: IMG.pulao,
        },
        {
            name: "Kabuli Mahecha Pulao (Large)",
            price: "£9.99",
            desc: "Aromatic pulao with a special Mahecha blend.",
            image: IMG.pulao,
        },
        {
            name: "Chicken Pulao",
            price: "£6.99",
            desc: "Fragrant rice slow-cooked with tender chicken pieces.",
            image: IMG.rice,
        },
        {
            name: "Chicken Biryani",
            price: "£6.99",
            desc: "Classic spiced chicken biryani layered with aromatic basmati rice.",
            image: IMG.biryani,
        },
        {
            name: "Plain Rice",
            price: "£4.99",
            desc: "Fluffy steamed basmati rice, a perfect accompaniment.",
            image: IMG.rice,
        },
    ],
    "Veg Special": [
        {
            name: "Special Daal Masha Fry (Small)",
            price: "£5.99",
            desc: "Lentils tempered with spices.",
            image: IMG.daal,
        },
        {
            name: "Special Daal Masha Fry (Large)",
            price: "£7.99",
            desc: "Lentils tempered with spices.",
            image: IMG.daal,
        },
        {
            name: "Lobiya Dall (Small)",
            price: "£5.99",
            desc: "Black-eyed peas in spiced gravy.",
            image: IMG.daal,
        },
        {
            name: "Lobiya Dall (Large)",
            price: "£7.99",
            desc: "Black-eyed peas in spiced gravy.",
            image: IMG.daal,
        },
        {
            name: "Mix Vegetable (Small)",
            price: "£5.99",
            desc: "Seasonal vegetables in desi spices.",
            image: IMG.vegMix,
        },
        {
            name: "Mix Vegetable (Large)",
            price: "£7.99",
            desc: "Seasonal vegetables in desi spices.",
            image: IMG.vegMix,
        },
        {
            name: "Greek Salad",
            price: "£3.99",
            desc: "Fresh cucumber, tomato, olives, and feta with a light dressing.",
            image: IMG.salad,
        },
        {
            name: "Fresh Salad",
            price: "£1.99",
            desc: "Crisp, fresh garden salad served with a wedge of lemon.",
            image: IMG.salad,
        },
    ],
    "Takatuk": [
        {
            name: "Maghaz Karahi",
            price: "£14.99",
            desc: "Brain cooked on a sizzling tawa with spicy masala.",
            image: IMG.karahi,
        },
        {
            name: "Qeema Fry (Small)",
            price: "£12.99",
            desc: "Spiced minced meat dry-fried.",
            image: IMG.lambKarahi,
        },
        {
            name: "Qeema Fry (Large)",
            price: "£25.99",
            desc: "Spiced minced meat dry-fried.",
            image: IMG.lambKarahi,
        },
        {
            name: "Seekh Kabab Karahi (Small)",
            price: "£13.99",
            desc: "Seekh kabab cooked in karahi masala.",
            image: IMG.seekhKabab,
        },
        {
            name: "Seekh Kabab Karahi (Large)",
            price: "£21.99",
            desc: "Seekh kabab cooked in karahi masala.",
            image: IMG.seekhKabab,
        },
        {
            name: "Special Daal Ghost Karahi (Small)",
            price: "£11.99",
            desc: "Meat slow-cooked with lentils in a karahi.",
            image: IMG.daal,
        },
        {
            name: "Special Daal Ghost Karahi (Large)",
            price: "£19.99",
            desc: "Meat slow-cooked with lentils in a karahi.",
            image: IMG.daal,
        },
    ],
    "Chapli Kabab": [
        {
            name: "Peshawari Chapli Kabab",
            price: "£7.99",
            desc: "Famous flat minced beef kabab with pomegranate seeds and special spices.",
            image: IMG.chapliKabab,
        },
        {
            name: "Peshawari Chapli Kabab (Egg)",
            price: "£7.99",
            desc: "Peshawari chapli kabab enriched with egg for extra richness.",
            image: IMG.chapliKabab,
        },
    ],
    "Beverages": [
        {
            name: "Lemon Soda",
            price: "£3.49",
            desc: "Refreshing chilled lemon soda.",
            image: IMG.soda,
        },
        {
            name: "Mint Soda",
            price: "£3.49",
            desc: "Cooling mint-infused sparkling soda.",
            image: IMG.soda,
        },
        {
            name: "Jug of Soda (Lemon / Mint)",
            price: "£7.99",
            desc: "A large jug of refreshing lemon or mint soda.",
            image: IMG.soda,
        },
        {
            name: "Lassi (Sweet / Mango / Saltish)",
            price: "£3.49",
            desc: "Thick, creamy yogurt drink available in Sweet, Mango, or Saltish flavour.",
            image: IMG.lassi,
        },
        {
            name: "Jug of Lassi",
            price: "£7.99",
            desc: "A large jug of refreshing creamy lassi.",
            image: IMG.lassi,
        },
        {
            name: "Soft Drinks (Bottle 350ml)",
            price: "£2.49",
            desc: "Chilled bottled soft drink.",
            image: IMG.softDrink,
        },
        {
            name: "Soft Drinks (Can)",
            price: "£1.49",
            desc: "Chilled canned soft drink.",
            image: IMG.softDrink,
        },
    ],
    "Special Offers": [
        {
            name: "Lamb Sajji — Full Sajji (On Demand)",
            price: "£260.00",
            desc: "Whole slow-roasted lamb. Full Sajji £260 (Serves 8–10). Must be ordered in advance.",
            image: IMG.sajji,
        },
        {
            name: "Lamb Sajji — Half Sajji (On Demand)",
            price: "£140.00",
            desc: "Half slow-roasted lamb. Half Sajji £140 (Serves 4–6). Must be ordered in advance.",
            image: IMG.sajji,
        },
    ],
};

export default function MenuPage() {
    const [activeTab, setActiveTab] = useState("Karahi");
    const { addToCart } = useCart();

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
                            <div
                                key={`${activeTab}-${idx}`}
                                className="menu-item flex flex-col md:flex-row gap-6 group hover:bg-white/[0.02] p-4 rounded-xl transition-colors duration-500"
                            >
                                <div className="w-full md:w-32 h-48 md:h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = IMG.karahi;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-baseline mb-2 gap-2">
                                        <h3 className="font-display text-xl md:text-2xl text-white italic group-hover:text-primary transition-colors duration-300 leading-tight">
                                            {item.name}
                                        </h3>
                                        <span className="text-primary font-bold text-base whitespace-nowrap">
                                            {item.price}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3">
                                        {item.desc}
                                    </p>
                                    <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                        <button
                                            onClick={() =>
                                                addToCart({
                                                    id: item.name,
                                                    name: item.name,
                                                    price: item.price,
                                                    image: item.image,
                                                })
                                            }
                                            className="flex-1 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-[10px] font-bold uppercase tracking-[0.2em] py-3 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                        >
                                            <ShoppingBag className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
