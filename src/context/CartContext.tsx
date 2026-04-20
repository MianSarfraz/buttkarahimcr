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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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

    const totalAmount = rawTotal;

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
