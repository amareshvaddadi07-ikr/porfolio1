"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ParallaxStampProps {
  city?: string;
  department?: string;
  dateStr?: string;
  code?: string;
  className?: string;
}

export function ParallaxStamp({
  city = "VISAKHAPATNAM",
  department = "PRESS BUREAU",
  dateStr = "15 OCT 2026",
  code = "VERIFIED // DISPATCH",
  className = "",
}: ParallaxStampProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["22deg", "-22deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-22deg", "22deg"]);

  // Multi-layer parallax translations
  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], ["-4px", "4px"]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-4px", "4px"]);

  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const layer3X = useTransform(mouseXSpring, [-0.5, 0.5], ["-16px", "16px"]);
  const layer3Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-16px", "16px"]);

  const glintOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.35, 0.05]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="relative w-36 h-20 sm:w-44 sm:h-24 border-2 border-dashed border-[#8B1E1E]/80 rounded p-2 flex items-center justify-center bg-[#FAF4E8]/90 shadow-md backdrop-blur-xs transition-shadow hover:shadow-lg"
      >
        {/* Layer 0: Aged Ink Bleed Shadow (z: 0) */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="absolute inset-0 rounded bg-[#8B1E1E]/5 pointer-events-none"
        />

        {/* Layer 1: Outer Postal Cancellation Lines & Date (z: 20px) */}
        <motion.div
          style={{
            x: layer2X,
            y: layer2Y,
            transform: "translateZ(20px)",
          }}
          className="w-full h-full border border-[#8B1E1E]/60 rounded-xs flex flex-col justify-between p-1.5 pointer-events-none"
        >
          {/* Top Stamp Bar */}
          <div className="flex items-center justify-between text-[7.5px] sm:text-[8.5px] font-mono tracking-widest text-[#8B1E1E] uppercase font-bold border-b border-[#8B1E1E]/40 pb-0.5">
            <span>★ {city} ★</span>
            <span>{department}</span>
          </div>

          {/* Center Postal Ring & Emblem (z: 40px) */}
          <motion.div
            style={{
              x: layer3X,
              y: layer3Y,
              transform: "translateZ(40px)",
            }}
            className="flex items-center justify-center gap-2 my-auto"
          >
            {/* Ink Wavy Cancellation Lines */}
            <svg
              className="w-6 h-4 text-[#8B1E1E]/70 shrink-0"
              viewBox="0 0 40 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 5 Q 10 0, 20 5 T 40 5" />
              <path d="M0 10 Q 10 5, 20 10 T 40 10" />
              <path d="M0 15 Q 10 10, 20 15 T 40 15" />
            </svg>

            {/* Central Stamp Date Badge */}
            <div className="text-center px-1">
              <span className="block text-[8px] sm:text-[9px] font-serif font-black tracking-wider text-[#8B1E1E] uppercase leading-tight">
                {dateStr}
              </span>
              <span className="block text-[7px] font-mono tracking-[0.2em] text-[#8B1E1E]/80 uppercase">
                {code}
              </span>
            </div>

            {/* Ink Wavy Cancellation Lines Right */}
            <svg
              className="w-6 h-4 text-[#8B1E1E]/70 shrink-0"
              viewBox="0 0 40 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M0 5 Q 10 0, 20 5 T 40 5" />
              <path d="M0 10 Q 10 5, 20 10 T 40 10" />
              <path d="M0 15 Q 10 10, 20 15 T 40 15" />
            </svg>
          </motion.div>

          {/* Bottom Stamp Bar */}
          <div className="flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono tracking-widest text-[#8B1E1E]/90 uppercase border-t border-[#8B1E1E]/40 pt-0.5">
            <span>OFFICIAL CANCELLATION</span>
            <span>POSTAGE GUARANTEED</span>
          </div>
        </motion.div>

        {/* Layer 3: Dynamic Ink Sheen / Specular Glint (z: 60px) */}
        <motion.div
          style={{
            opacity: glintOpacity,
            transform: "translateZ(60px)",
          }}
          className="absolute inset-0 rounded bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"
        />

        {/* Rubber Stamp Ink Texture Speckles */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8B1E1E 1px, transparent 1px)`,
            backgroundSize: "4px 4px",
          }}
        />
      </motion.div>
    </div>
  );
}

export default ParallaxStamp;
