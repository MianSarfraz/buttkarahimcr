"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    totalAmount: number;
    cartCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    isDiscountActive: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isDiscountActive, setIsDiscountActive] = useState(false);

    // Check for UK discount time (6 PM - 8 PM)
    useEffect(() => {
        const checkDiscount = () => {
            const now = new Date();
            // Get UK time string: "HH"
            const ukHour = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Europe/London",
                hour: "numeric",
                hour12: false,
            }).format(now);

            const hour = parseInt(ukHour);
            // 6 PM to 8 PM (18:00 - 19:59)
            setIsDiscountActive(hour >= 18 && hour < 20);
        };

        checkDiscount();
        const interval = setInterval(checkDiscount, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem("bk_cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("bk_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        // Auto open cart
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((i) => {
                if (i.id === id) {
                    const newQty = Math.max(1, i.quantity + delta);
                    return { ...i, quantity: newQty };
                }
                return i;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const rawTotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return sum + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    const totalAmount = isDiscountActive ? rawTotal * 0.9 : rawTotal;

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalAmount,
                cartCount,
                isCartOpen,
                setIsCartOpen,
                isDiscountActive,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
