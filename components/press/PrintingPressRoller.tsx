"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function PrintingPressRoller() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the roller transition zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Roller physical dynamics
  const rollerX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  const gearRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const inkOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0.85]);
  const textClip = useTransform(scrollYProgress, [0.2, 0.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  // Self-drawing line path lengths
  const lineDraw1 = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const lineDraw2 = useTransform(scrollYProgress, [0.25, 0.85], [0, 1]);
  const lineDraw3 = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-10 py-6 select-none overflow-hidden"
    >
      {/* Top Press Status Wire */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-ink-muted border-b border-ink/30 pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
          <span className="font-bold text-ink">ROTARY CYLINDER PRESS // VISAKHAPATNAM FOUNDRY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">INK VISCOSITY: HIGH SPEC</span>
          <span className="font-semibold text-ink">PRESSURE: 42 PSI</span>
        </div>
      </div>

      {/* Mechanical Roller Assembly Track */}
      <div className="relative py-8 bg-[#F2ECE0]/60 border-y-2 border-ink rounded-sm shadow-inner overflow-hidden">
        
        {/* Paper Background Grid Being Inked */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Self-Drawing SVG Printing Lines Layer */}
        <div className="relative w-full h-32 flex flex-col justify-between px-4 z-10 pointer-events-none">
          
          {/* Top Self-Drawing Hairline Rule */}
          <svg className="w-full h-3 overflow-visible" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="#111111"
              strokeWidth="2.5"
              style={{ pathLength: lineDraw1 }}
            />
          </svg>

          {/* Central Self-Drawing Column Guides & Ornate Diamonds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-auto">
            
            {/* Column Guide 1 */}
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#111111"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                style={{ pathLength: lineDraw2 }}
              />
            </svg>

            {/* Central Guilloche Press Seal (Self-drawing) */}
            <div className="flex items-center justify-center gap-3">
              <svg className="w-16 h-8 overflow-visible" viewBox="0 0 60 30">
                <motion.polygon
                  points="30,2 58,15 30,28 2,15"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  style={{ pathLength: lineDraw2 }}
                />
                <motion.circle
                  cx="30"
                  cy="15"
                  r="6"
                  fill="none"
                  stroke="#8B1E1E"
                  strokeWidth="1.5"
                  style={{ pathLength: lineDraw2 }}
                />
              </svg>
              <motion.div
                style={{ clipPath: textClip }}
                className="font-playfair font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-ink whitespace-nowrap"
              >
                PRINTING FRONT PAGE DISPATCHES
              </motion.div>
              <svg className="w-16 h-8 overflow-visible" viewBox="0 0 60 30">
                <motion.polygon
                  points="30,2 58,15 30,28 2,15"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.5"
                  style={{ pathLength: lineDraw2 }}
                />
                <motion.circle
                  cx="30"
                  cy="15"
                  r="6"
                  fill="none"
                  stroke="#8B1E1E"
                  strokeWidth="1.5"
                  style={{ pathLength: lineDraw2 }}
                />
              </svg>
            </div>

            {/* Column Guide 2 */}
            <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#111111"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                style={{ pathLength: lineDraw2 }}
              />
            </svg>
          </div>

          {/* Bottom Self-Drawing Thick-Thin Newspaper Rule */}
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="30%"
              x2="100%"
              y2="30%"
              stroke="#111111"
              strokeWidth="3"
              style={{ pathLength: lineDraw3 }}
            />
            <motion.line
              x1="0"
              y1="80%"
              x2="100%"
              y2="80%"
              stroke="#111111"
              strokeWidth="1"
              style={{ pathLength: lineDraw3 }}
            />
          </svg>
        </div>

        {/* Physical Mechanical Roller Cylinder (Traversing across the paper) */}
        <motion.div
          style={{
            left: rollerX,
            opacity: inkOpacity,
          }}
          className="absolute top-0 bottom-0 w-12 sm:w-16 -translate-x-1/2 z-20 flex flex-col justify-between items-center pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
        >
          {/* Top Gear Teeth Wheel */}
          <motion.div
            style={{ rotate: gearRotation }}
            className="w-10 h-10 -mt-3 rounded-full bg-gradient-to-tr from-[#241F1A] via-[#5C534A] to-[#141210] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-[#111111] border border-[#D4AF37]" />
          </motion.div>

          {/* The Inking Steel Roller Cylinder */}
          <div className="w-6 sm:w-8 h-full bg-gradient-to-r from-[#171412] via-[#5E564D] to-[#12100E] border-x border-[#8A7D6F] shadow-[inset_0_0_8px_rgba(0,0,0,0.8),0_0_12px_rgba(0,0,0,0.4)] relative flex items-center justify-center">
            {/* Fresh Wet Ink Sheen Reflection */}
            <div className="w-1.5 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            
            {/* Ink Contact Bleed Line */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-ink shadow-[0_0_6px_#111111]" />
          </div>

          {/* Bottom Gear Teeth Wheel */}
          <motion.div
            style={{ rotate: gearRotation }}
            className="w-10 h-10 -mb-3 rounded-full bg-gradient-to-tr from-[#241F1A] via-[#5C534A] to-[#141210] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-[#111111] border border-[#D4AF37]" />
          </motion.div>
        </motion.div>

        {/* Freshly Rolled Ink Trail Glow */}
        <motion.div
          style={{ width: rollerX }}
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-[#111111]/[0.03] pointer-events-none"
        />
      </div>

      {/* Press Roller Telemetry Footer */}
      <div className="flex items-center justify-between text-[9.5px] font-mono tracking-wider text-ink-muted pt-2 border-b border-ink/20">
        <span>BROADSHEET INKING: CYLINDER ACTIVE</span>
        <span className="hidden sm:inline">MECHANICAL SPEED: 140 ROTATIONS / MINUTE</span>
        <span>LINE STATUS: DETERMINISTIC</span>
      </div>
    </div>
  );
}

export default PrintingPressRoller;
