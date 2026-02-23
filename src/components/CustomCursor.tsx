"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(outline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const onMouseEnter = () => {
            gsap.to(outline, {
                width: 60,
                height: 60,
                backgroundColor: "rgba(228, 37, 43, 0.1)",
                borderColor: "transparent",
                duration: 0.3,
            });
        };

        const onMouseLeave = () => {
            gsap.to(outline, {
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 255, 255, 0.5)",
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        const hoverTriggers = document.querySelectorAll(".hover-trigger, a, button, .cursor-pointer");
        hoverTriggers.forEach((trigger) => {
            trigger.addEventListener("mouseenter", onMouseEnter);
            trigger.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            hoverTriggers.forEach((trigger) => {
                trigger.removeEventListener("mouseenter", onMouseEnter);
                trigger.removeEventListener("mouseleave", onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
            <div
                ref={outlineRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[width,height,background-color,border-color]"
            />
        </>
    );
};

export default CustomCursor;
