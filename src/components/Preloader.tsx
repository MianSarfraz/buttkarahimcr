"use client";

import React, { useEffect, useState } from "react";

const Preloader = () => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade-out after 0.8s (much faster)
        const fadeTimer = setTimeout(() => setFadeOut(true), 800);
        // Fully remove after fade completes (0.8s + 0.4s transition)
        const hideTimer = setTimeout(() => setVisible(false), 1200);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "#050505",
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? "translateY(-8px)" : "translateY(0)",
                pointerEvents: fadeOut ? "none" : "all",
            }}
        >
            <div
                style={{
                    fontSize: "2.8rem",
                    fontStyle: "italic",
                    fontWeight: 900,
                    color: "#E4252B",
                    WebkitTextStroke: "1px white",
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                    fontFamily: "var(--font-manrope), sans-serif",
                }}
            >
                Butt Karahi
            </div>

            {/* CSS-animated progress bar — snappier line animation */}
            <div style={{ width: "16rem", height: "1px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        background: "#E4252B",
                        width: "0%",
                        animation: "preloader-line 0.7s ease-in-out forwards",
                    }}
                />
            </div>

            <style>{`
                @keyframes preloader-line {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
