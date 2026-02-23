"use client";

import React, { useState } from "react";

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1474688928660459539/W692Zh8vYJFDdN127bLurgXGkw7XfIpcEJtWjRgA7xv7MUEaP445-i4hsz0jW6nMQuUK";
const TARGET_EMAIL = "sarfraznawaz266@gmail.com";

const BookingForm = ({ onClose }: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
        persons: "2",
        requests: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        const bookingRef = `BKT-${Math.floor(1000 + Math.random() * 9000)}`;

        // Discord embed
        const discordPayload = {
            embeds: [
                {
                    title: "🍽️ New Table Booking!",
                    color: 0xe4252b,
                    fields: [
                        { name: "🆔 Ref", value: bookingRef, inline: true },
                        { name: "👤 Name", value: formData.name, inline: true },
                        { name: "📞 Phone", value: formData.phone, inline: true },
                        { name: "📅 Date", value: formData.date, inline: true },
                        { name: "🕐 Time", value: formData.time, inline: true },
                        { name: "👥 Persons", value: formData.persons, inline: true },
                        {
                            name: "📝 Special Requests",
                            value: formData.requests || "None",
                        },
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: "Butt Karahi — Table Booking System" },
                },
            ],
        };

        // FormSubmit payload
        const emailPayload = {
            _subject: `New Table Booking #${bookingRef} — ${formData.name} (${formData.persons} persons)`,
            _captcha: "false",
            _template: "table",
            booking_ref: bookingRef,
            name: formData.name,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            persons: formData.persons,
            special_requests: formData.requests || "None",
        };

        try {
            const [discordRes, emailRes] = await Promise.all([
                fetch(DISCORD_WEBHOOK, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(discordPayload),
                }),
                fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(emailPayload),
                }),
            ]);

            if (discordRes.ok || emailRes.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error("Booking submission failed:", err);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-[#0d0d0d] p-8 rounded-2xl border border-primary/30 text-center space-y-4 animate-scale-up">
                <div className="text-5xl">✅</div>
                <h3 className="text-2xl font-display italic text-white">Booking Confirmed!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Thank you, <span className="text-white">{formData.name.split(" ")[0]}</span>. Your table for{" "}
                    <span className="text-primary font-bold">{formData.persons} persons</span> on{" "}
                    <span className="text-white">{formData.date} at {formData.time}</span> has been received.
                    We&apos;ll confirm shortly on <span className="text-white">{formData.phone}</span>.
                </p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setFormData({ name: "", phone: "", date: "", time: "", persons: "2", requests: "" });
                        if (onClose) onClose();
                    }}
                    className="mt-4 text-primary hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors"
                >
                    Close
                </button>
            </div>
        );
    }

    const inputClass =
        "w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:border-primary focus:outline-none transition-all duration-300 text-sm";
    const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2";

    // Min date = today
    const today = new Date().toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label className={labelClass}>Full Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="e.g. Ahmed Khan"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            {/* Phone */}
            <div>
                <label className={labelClass}>Phone Number</label>
                <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+44 7700 900XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Date</label>
                    <input
                        required
                        type="date"
                        name="date"
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className={inputClass + " [color-scheme:dark]"}
                    />
                </div>
                <div>
                    <label className={labelClass}>Time</label>
                    <input
                        required
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={inputClass + " [color-scheme:dark]"}
                    />
                </div>
            </div>

            {/* Number of Persons */}
            <div>
                <label className={labelClass}>Number of Persons</label>
                <select
                    name="persons"
                    required
                    value={formData.persons}
                    onChange={handleChange}
                    className={inputClass + " cursor-pointer"}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={String(n)} className="bg-black">
                            {n} {n === 1 ? "Person" : "Persons"}
                        </option>
                    ))}
                    <option value="10+" className="bg-black">10+ (Large Group)</option>
                </select>
            </div>

            {/* Special Requests */}
            <div>
                <label className={labelClass}>Special Requests <span className="text-gray-600">(optional)</span></label>
                <textarea
                    name="requests"
                    rows={2}
                    placeholder="Allergies, high chair, occasion, etc."
                    value={formData.requests}
                    onChange={handleChange}
                    className={inputClass + " resize-none"}
                />
            </div>

            <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-primary text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(228,37,43,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "sending" ? "Confirming Booking..." : "Book My Table"}
            </button>

            {status === "error" && (
                <p className="text-primary text-[10px] text-center uppercase tracking-widest font-bold">
                    Something went wrong. Please try again or call us directly.
                </p>
            )}
        </form>
    );
};

export default BookingForm;
