"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const OrderForm = ({ onClose }: { onClose?: () => void }) => {
    const { cartItems, totalAmount, clearCart, isDiscountActive } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        items: "",
        address: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
        "idle"
    );

    // Auto-populate items from cart
    useEffect(() => {
        if (cartItems.length > 0) {
            const itemString = cartItems
                .map((item) => `${item.quantity}x ${item.name}`)
                .join(", ");
            setFormData(prev => ({ ...prev, items: itemString }));
        }
    }, [cartItems]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        const orderNumber = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
        const discordWebhookUrl = "https://discord.com/api/webhooks/1474688928660459539/W692Zh8vYJFDdN127bLurgXGkw7XfIpcEJtWjRgA7xv7MUEaP445-i4hsz0jW6nMQuUK";
        const targetEmail = "sarfraznawaz266@gmail.com";

        // 1. Send to Discord
        const discordMessage = {
            embeds: [
                {
                    title: "🚀 New Food Order Received!",
                    color: 0xe4252b,
                    fields: [
                        { name: "🆔 Order Number", value: orderNumber, inline: true },
                        { name: "👤 Name", value: formData.name, inline: true },
                        { name: "📞 Phone", value: formData.phone, inline: true },
                        { name: "🍔 Items", value: formData.items },
                        { name: "💰 Total", value: `£${totalAmount.toFixed(2)}`, inline: true },
                        { name: "🎁 Discount", value: isDiscountActive ? "10% OFF Applied" : "None", inline: true },
                        { name: "📍 Address", value: formData.address },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: "Butt Karahi Ordering System" },
                },
            ],
        };

        // 2. FormSubmit payload for Email
        const formSubmitData = {
            _subject: `New Order #${orderNumber} from ${formData.name}`,
            order_number: orderNumber,
            name: formData.name,
            phone: formData.phone,
            items: formData.items,
            total: `£${totalAmount.toFixed(2)}`,
            discount_applied: isDiscountActive ? "10% OFF" : "No",
            address: formData.address,
            _captcha: "false",
            _template: "table"
        };

        try {
            // Simultaneous delivery
            const [discordRes, emailRes] = await Promise.all([
                fetch(discordWebhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(discordMessage),
                }),
                fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formSubmitData),
                })
            ]);

            if (discordRes.ok || emailRes.ok) {
                setStatus("success");
                clearCart();
                setFormData({ name: "", phone: "", items: "", address: "" });
                // Optional: redirect or close after delay
                setTimeout(() => {
                    if (onClose) onClose();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error sending order:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-card-bg p-8 rounded-2xl border border-primary/30 text-center space-y-4 animate-scale-up">
                <div className="text-primary text-5xl">✅</div>
                <h3 className="text-2xl font-display italic text-white">Order Received!</h3>
                <p className="text-gray-400 text-sm">
                    Thank you, {formData.name.split(' ')[0]}. We've received your order and are preparing it now.
                    Expect a call at {formData.phone} shortly.
                </p>
                <div className="pt-4">
                    <button
                        onClick={() => {
                            if (onClose) onClose();
                            setStatus("idle");
                        }}
                        className="text-primary hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form
            id="order-form"
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                        Full Name
                    </label>
                    <input
                        required
                        type="text"
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:border-primary outline-none transition-all"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                        Phone Number
                    </label>
                    <input
                        required
                        type="tel"
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:border-primary outline-none transition-all"
                        placeholder="+44 7700 900XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                        Delivery Address
                    </label>
                    <textarea
                        required
                        rows={2}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:border-primary outline-none transition-all resize-none"
                        placeholder="Enter your full street address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold block mb-2">
                        Order Summary
                    </label>
                    <div className="text-xs text-gray-300 font-medium">
                        {formData.items || "No items in cart"}
                    </div>
                </div>
            </div>

            <button
                disabled={status === "sending" || cartItems.length === 0}
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "sending" ? "Processing..." : `Send Order (Total: £${totalAmount.toFixed(2)})`}
            </button>

            {status === "error" && (
                <p className="text-primary text-[10px] text-center uppercase tracking-widest font-bold animate-shake">
                    Something went wrong. Please check your connection.
                </p>
            )}
        </form>
    );
};

export default OrderForm;
