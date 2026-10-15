"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { FrontPageStack } from "./FrontPageStack";

// Web Audio API Paper Rustle Synthesizer (Zero external dependencies)
function playPaperRustleSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Generate brown/pink noise burst resembling crisp broadsheet paper
    const bufferSize = ctx.sampleRate * 0.45; // 450ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise filter for soft paper rustle
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 2.5; // Gain
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to match paper friction frequency (1200Hz - 3400Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2200;
    filter.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch {
    // Audio context silently fails if user hasn't interacted yet
  }
}

interface FoldedNewspaper3DProps {
  children?: React.ReactNode;
}

export function FoldedNewspaper3D({ children }: FoldedNewspaper3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const newspaperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasPlayedSound, setHasPlayedSound] = useState(false);

  // Scroll tracking across the scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Timeline Scroll Transforms:
  // 1. Initial State (0 - 0.20): Off-screen right, rotated Y -30deg, folded, scale 0.8, opacity 0
  // 2. Enter (0.20 - 0.40): Slides in to center with spring, rotates Y 0deg, X 10deg, slight bounce
  // 3. Unfold (0.40 - 0.65): Top half rotates on X from 180deg to 0deg, crease fades
  // 4. Landed (0.65 - 1.00): Flat, interactive FrontPageStack, hover parallax

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 1],
    ["380px", "380px", "0px", "0px"]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.38, 1],
    ["-80px", "-80px", "35px", "0px", "0px"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.65, 1],
    [0.8, 0.8, 0.92, 1, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 1],
    [0, 0, 1, 1]
  );

  const tossRotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 1],
    [-30, -30, 0, 0]
  );

  const tossRotateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.42, 0.65, 1],
    [18, 18, 14, 10, 0, 0]
  );

  // Top half unfolding on X axis (180deg folded -> 0deg flat)
  const foldRotateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.65, 1],
    [180, 180, 0, 0]
  );

  // Crease highlight & fold seam shadow
  const creaseOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.62, 0.7],
    [1, 0.85, 0.15, 0]
  );

  // Trigger optional sound on scroll unfold threshold
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.42 && latest < 0.65 && !hasPlayedSound) {
        setHasPlayedSound(true);
        playPaperRustleSound();
      } else if (latest < 0.35) {
        setHasPlayedSound(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasPlayedSound]);

  // Cyze.dev Hover Parallax Mouse Tilt Physics (Active when flat)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22 };
  const tiltXSpring = useSpring(mouseX, springConfig);
  const tiltYSpring = useSpring(mouseY, springConfig);

  const hoverTiltRotateX = useTransform(tiltYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const hoverTiltRotateY = useTransform(tiltXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!newspaperRef.current) return;
    const rect = newspaperRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // If prefers-reduced-motion is enabled, render flat and calm
  if (shouldReduceMotion) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-8">
        <div className="bg-[#FAF7F0] border-2 border-ink p-6 rounded shadow-newspaper-frame">
          {children || <FrontPageStack />}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] -mt-10 mb-8"
      style={{ perspective: 1200 }}
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-6 sm:top-10 w-full min-h-[92vh] flex items-center justify-center overflow-visible pointer-events-none">
        
        {/* Newspaper 3D Container (with Hover Tilt Parallax) */}
        <motion.div
          ref={newspaperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: translateX,
            y: translateY,
            scale,
            opacity,
            rotateX: tossRotateX,
            rotateY: tossRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-5xl mx-4 sm:mx-auto pointer-events-auto select-none"
        >
          {/* Mouse Tilt Parallax Wrapper */}
          <motion.div
            style={{
              rotateX: hoverTiltRotateX,
              rotateY: hoverTiltRotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full"
          >
            {/* Broadsheet Desk Cast Shadow (Multi-tier paper depth) */}
            <div
              className="absolute -inset-4 rounded-sm bg-black/15 blur-2xl transform-gpu pointer-events-none -z-20"
              style={{ transform: "translateZ(-40px)" }}
            />

            {/* Paper Multi-Layer Thickness (Edge Pages Stack) */}
            <div
              className="absolute inset-0 bg-[#E8E2D4] rounded-xs -z-10 border border-ink/40 shadow-[0_2px_0_#DED6C3,0_4px_0_#C4BDB0,0_12px_24px_rgba(0,0,0,0.18)]"
              style={{ transform: "translateZ(-3px)" }}
            />

            {/* The Main Broadsheet Paper Body */}
            <div
              className="relative w-full bg-[#FAF7F0] border-2 border-ink rounded-xs shadow-newspaper-frame overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                backgroundImage: `radial-gradient(rgba(17,17,17,0.035) 1px, transparent 1px)`,
                backgroundSize: "8px 8px",
              }}
            >
              {/* TOP HALF (The Foldable Upper Flap) */}
              <motion.div
                style={{
                  rotateX: foldRotateX,
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full z-30"
              >
                {/* INNER FACE (Visible when unfolded: Masthead Banner & Peeking Story) */}
                <div
                  className="w-full bg-[#FAF7F0] p-6 sm:p-8 border-b border-ink/30"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Top Gazette Small Wire */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-ink-muted border-b border-ink/30 pb-2 mb-3">
                    <span>THE KRYPTON GAZETTE · VOL. I · NO. 001</span>
                    <span className="font-bold text-ink">BROADSHEET UNFOLDED</span>
                  </div>

                  {/* Peeking Headline Banner */}
                  <div className="text-center py-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-800 font-bold bg-red-100/80 px-2 py-0.5 rounded-xs">
                      ★ LEAD INVESTIGATION DISPATCH ★
                    </span>
                    <h2 className="font-playfair font-black text-2xl sm:text-4xl text-ink uppercase tracking-tight mt-1.5">
                      KRYPTON TRACE-AND-FREEZE PROTOCOL
                    </h2>
                    <p className="font-serif italic text-xs sm:text-sm text-ink-muted mt-0.5">
                      Deterministic on-chain forensics locking malicious flows before escrow exit
                    </p>
                  </div>
                </div>

                {/* OUTER/BACK FACE (Visible when folded in half) */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#F5EFE0] p-6 sm:p-8 flex flex-col justify-between border-2 border-ink rounded-t-xs shadow-md"
                  style={{
                    transform: "rotateX(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Folded Front Page Masthead Header */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-ink uppercase border-b border-ink/40 pb-1.5">
                      <span>THE KRYPTON GAZETTE · VISAKHAPATNAM</span>
                      <span className="font-bold">FOLDED EDITION</span>
                    </div>

                    <div className="mt-4 pt-2">
                      <span className="text-[9.5px] font-mono font-bold text-red-800 tracking-widest uppercase">
                        ★ FRONT PAGE PREVIEW:
                      </span>
                      <h3 className="font-playfair font-black text-xl sm:text-3xl text-ink uppercase tracking-tight mt-1">
                        KRYPTON TRACE-AND-FREEZE
                      </h3>
                      <p className="font-serif italic text-xs text-ink/80 mt-1 line-clamp-2">
                        Illicit cryptocurrency laundering trail frozen in real-time. Continuous cryptographic traversal of multi-hop mixer vaults.
                      </p>
                    </div>
                  </div>

                  {/* Fold Seam Teaser Wire */}
                  <div className="pt-3 border-t border-dashed border-ink/30 flex items-center justify-between text-[10px] font-mono text-ink-muted">
                    <span className="animate-pulse">↓ SCROLL TO UNFOLD BROADSHEET ↓</span>
                    <span className="font-bold text-ink">PRICE: FREE</span>
                  </div>
                </div>
              </motion.div>

              {/* HORIZONTAL FOLD CREASE LINE (Seam & shadow that fades as it unfolds) */}
              <motion.div
                style={{ opacity: creaseOpacity }}
                className="relative w-full h-3 -my-1.5 z-40 pointer-events-none flex flex-col justify-center"
              >
                {/* Dark crease shadow */}
                <div className="w-full h-1 bg-gradient-to-b from-black/40 via-black/20 to-transparent shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                {/* White paper paper ridge highlight */}
                <div className="w-full h-0.5 bg-white/50" />
              </motion.div>

              {/* BOTTOM HALF (The Flat Broadsheet Bed: Contains Full FrontPageStack) */}
              <div className="relative w-full z-20">
                {children || <FrontPageStack />}
              </div>

              {/* Newspaper Colophon Line */}
              <div className="py-3 px-6 bg-paper-aged/50 border-t border-ink/30 flex items-center justify-between text-[10px] font-mono text-ink-muted tracking-wider">
                <span>AUTHENTIC 3D BROADSHEET ARCHIVE</span>
                <span className="hidden sm:inline">SWIPE CARDS TO INSPECT EDITIONS</span>
                <span>CYZE TILT PARALLAX ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default FoldedNewspaper3D;
