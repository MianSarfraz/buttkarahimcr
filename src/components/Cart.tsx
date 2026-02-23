"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import OrderForm from "./OrderForm";

const Cart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount, cartCount, isDiscountActive } = useCart();
    const [showOrderForm, setShowOrderForm] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-dark border-l border-white/10 shadow-huge animate-slide-in">
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between bg-dark/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary w-5 h-5" />
                                <h2 className="font-display text-2xl italic text-white flex items-center gap-2">
                                    Your <span className="text-primary">Order</span>
                                    <span className="text-[10px] not-italic font-bold bg-white/10 px-2 py-1 rounded-full text-gray-400">
                                        {cartCount} items
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                            {showOrderForm ? (
                                <div className="space-y-6 animate-fade-in">
                                    <button
                                        onClick={() => setShowOrderForm(false)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary flex items-center gap-2"
                                    >
                                        ← Back to Cart
                                    </button>
                                    <OrderForm onClose={onClose} />
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                        <ShoppingBag className="w-10 h-10 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-display text-xl mb-2">Empty Cart</h3>
                                        <p className="text-gray-500 text-sm max-w-[200px]">Looks like you haven't added anything to your order yet.</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] border border-primary/20 hover:border-primary px-8 py-3 rounded-full transition-all"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-fade-in">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-white font-medium text-sm truncate uppercase tracking-wider">{item.name}</h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-600 hover:text-primary transition-colors p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="text-primary font-bold text-sm mb-3">
                                                    {item.price}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center bg-white/5 rounded-full px-3 py-1 border border-white/5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="text-gray-400 hover:text-white p-1"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-xs text-white font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="text-gray-400 hover:text-white p-1"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && !showOrderForm && (
                            <div className="p-6 bg-card-bg/50 backdrop-blur-xl border-t border-white/5 space-y-4">
                                {isDiscountActive && (
                                    <div className="flex items-center justify-between py-2 px-4 bg-primary/10 border border-primary/20 rounded-lg animate-pulse-subtle">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">🌙</span>
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Ramadan Offer Applied</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-primary">-10%</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <div className="flex flex-col items-end">
                                        {isDiscountActive && (
                                            <span className="text-gray-500 line-through text-xs mb-1">
                                                £{(totalAmount / 0.9).toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-white font-bold text-lg">£{totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowOrderForm(true)}
                                    className="w-full bg-primary text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-glow"
                                >
                                    Proceed to Checkout
                                </button>
                                <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest font-medium">
                                    Delivery and taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
