"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface WaxSealProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export function WaxSeal({
  label = "VERIFIED BUILDER",
  sublabel = "AMARESH VADDADI",
  className = "",
}: WaxSealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);
  const shineOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.35, 0.05]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const words = label.split(" ");
  const topWord = words[0] || "VERIFIED";
  const bottomWord = words.slice(1).join(" ") || "BUILDER";

  return (
    <div
      style={{ perspective: 900 }}
      className={`inline-block select-none cursor-pointer ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center filter drop-shadow-xl transition-shadow"
      >
        {/* Organic melted wax outer shape */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#A8251D] via-[#851812] to-[#540C07] shadow-wax"
          style={{
            clipPath:
              "polygon(50% 0%, 63% 3%, 75% 7%, 86% 15%, 94% 26%, 98% 38%, 100% 50%, 97% 64%, 93% 76%, 84% 86%, 73% 94%, 60% 98%, 50% 100%, 39% 98%, 26% 94%, 15% 85%, 6% 74%, 2% 62%, 0% 50%, 3% 36%, 8% 24%, 17% 14%, 28% 6%, 40% 1%)",
          }}
        />

        {/* Outer wax rim with melted ripple effect */}
        <div className="absolute inset-1.5 rounded-full border-[2.5px] border-[#C53A30]/60 opacity-80 pointer-events-none" />

        {/* Debossed inner chamber */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#660E08] via-[#801610] to-[#99221A] flex flex-col items-center justify-center p-2 text-center shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.2)] border border-[#C53A30]/40">
          
          {/* Subtle curved ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/50 pointer-events-none" />

          {/* Top Arch Label */}
          <span className="text-[7.5px] md:text-[8.5px] font-black tracking-[0.18em] text-[#E5B555] uppercase font-serif drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-tight">
            {topWord}
          </span>

          {/* Central Heraldic / Builder Emblem */}
          <div className="my-0.5 flex items-center justify-center text-[#F2C94C] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 3.99-2.55 7.73-6 8.8-3.45-1.07-6-4.81-6-8.8V6.43l6-2.25zM12 7a2 2 0 00-2 2c0 .74.4 1.39 1 1.73V15h2v-4.27c.6-.34 1-.99 1-1.73a2 2 0 00-2-2z" />
            </svg>
          </div>

          {/* Bottom Arch Label */}
          <span className="text-[7.5px] md:text-[8.5px] font-black tracking-[0.2em] text-[#E5B555] uppercase font-serif drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] leading-tight">
            {bottomWord}
          </span>

          {/* Star insignia */}
          <span className="text-[6px] tracking-widest text-[#F2C94C]/70 mt-0.5 font-mono">
            ★ EST. 2025 ★
          </span>
        </div>

        {/* Dynamic Light/Shine Glint overlay */}
        <motion.div
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"
        />

        {/* Hover Tooltip Ribbon */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -bottom-9 whitespace-nowrap bg-ink-black text-paper-light text-[9px] font-mono tracking-wider py-1 px-2.5 rounded shadow-xl border border-ink/40 pointer-events-none z-30"
          >
            ATTESTED: {sublabel} · {label}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default WaxSeal;
