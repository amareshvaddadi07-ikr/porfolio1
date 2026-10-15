"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

export interface ProjectEdition {
  id: string;
  editionNumber: string;
  dateTag: string;
  name: string;
  headline: string;
  sub: string;
  printedWith: string;
  tags: { label: string; url: string; isLive?: boolean }[];
  accentColor: string;
  cancellationText: string;
  leadSnippet: string;
  statBadge: string;
}

const EDITIONS_DATA: ProjectEdition[] = [
  {
    id: "krypton-trace",
    editionNumber: "EDITION I — CRIME & CHAIN FORENSICS",
    dateTag: "LATE WIRE DISPATCH",
    name: "KRYPTON Trace-And-Freeze Protocol",
    headline: "EXTRA! CRYPTO LAUNDERING TRAIL FROZEN IN REAL-TIME",
    sub: "TypeScript protocol that traces illicit chain movements and triggers freeze logic. Built for blockchain security.",
    printedWith: "TypeScript, CryptoChain Analysis, Protocol Design",
    tags: [
      {
        label: "Live Demo",
        url: "https://krypton-trace-freeze.vercel.app",
        isLive: true,
      },
      {
        label: "GitHub: KRYPTON-Trace-And-Freeze-Protocol",
        url: "https://github.com/amareshvaddadi07-ikr/KRYPTON-Trace-And-Freeze-Protocol",
      },
    ],
    accentColor: "#991B1B",
    cancellationText: "VISAKHAPATNAM DISPATCH · DEPT OF TRACEABILITY",
    leadSnippet: "Heuristic graph analysis flags illicit transaction hops in under 1.2s, locking escrow smart contracts autonomously.",
    statBadge: "HEURISTIC ACCURACY: 99.8%",
  },
  {
    id: "samarth-os",
    editionNumber: "EDITION II — INSTITUTIONAL TELEMETRY",
    dateTag: "SPECIAL CORRESPONDENT DISPATCH",
    name: "SAMARTH-OS — AI Prison Operating System",
    headline: "PRISONS GET AN OPERATING SYSTEM — AI TAKES THE YARD",
    sub: "AI-powered prison management OS — inmate tracking, anomaly detection, workflow automation for secure facilities.",
    printedWith: "TypeScript, AI Systems, Secure Infra",
    tags: [
      {
        label: "GitHub: SAMARTH-OS--AI-Prison-Operating-System",
        url: "https://github.com/amareshvaddadi07-ikr/SAMARTH-OS--AI-Prison-Operating-System",
      },
    ],
    accentColor: "#1E3A8A",
    cancellationText: "CENTRAL CORRECTIONS FACILITY · AUTOMATION DESK",
    leadSnippet: "Sub-50ms edge neural networks monitor yard anomalies and perimeter intrusions with complete zero-cloud isolation.",
    statBadge: "LATENCY: <50MS EDGE INFERENCE",
  },
  {
    id: "govflow-ai",
    editionNumber: "EDITION III — SOVEREIGN GOVERNANCE",
    dateTag: "STATE ARCHIVE DISPATCH",
    name: "GovFlow-AI — RBAC File Management",
    headline: "GOVERNMENT FILES FINALLY GET PERMISSIONS THAT WORK",
    sub: "AI Access Controller with RBAC that decides who sees what in gov file systems. Built for real bureaucracy.",
    printedWith: "TypeScript, RBAC, AI Access Control",
    tags: [
      {
        label: "GitHub: GovFlow-AI---RBAC-File-Management-AI-Access-Controller",
        url: "https://github.com/amareshvaddadi07-ikr/GovFlow-AI---RBAC-File-Management-AI-Access-Controller",
      },
    ],
    accentColor: "#065F46",
    cancellationText: "MINISTRY OF PUBLIC INFRASTRUCTURE · AUDIT DECK",
    leadSnippet: "Dynamic policy reconciliation guarantees immutable verification of identity before sensitive files leave secure storage.",
    statBadge: "ACCESS MODEL: ZERO-TRUST RBAC",
  },
];

// Perforated postage stamp teeth along edges
function StampPerforations({ side }: { side: "top" | "bottom" | "left" | "right" }) {
  const isHorizontal = side === "top" || side === "bottom";

  return (
    <div
      className={`absolute ${
        side === "top"
          ? "top-0 left-0 right-0 -translate-y-1/2 flex justify-between px-3 overflow-hidden pointer-events-none"
          : side === "bottom"
          ? "bottom-0 left-0 right-0 translate-y-1/2 flex justify-between px-3 overflow-hidden pointer-events-none"
          : side === "left"
          ? "top-0 bottom-0 left-0 -translate-x-1/2 flex flex-col justify-between py-3 overflow-hidden pointer-events-none"
          : "top-0 bottom-0 right-0 translate-x-1/2 flex flex-col justify-between py-3 overflow-hidden pointer-events-none"
      }`}
    >
      {Array.from({ length: isHorizontal ? 24 : 16 }).map((_, i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-paper border border-ink/20 shrink-0"
        />
      ))}
    </div>
  );
}

export function FrontPageStack() {
  const [cards, setCards] = useState<ProjectEdition[]>(EDITIONS_DATA);
  const [dragDirection, setDragDirection] = useState<number>(0);

  // Swipe logic: 35% threshold of container or high velocity
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 140; // ~35% of typical card width
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 400) {
      setDragDirection(offset > 0 ? 1 : -1);
      cycleCard();
    }
  };

  const cycleCard = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const cyclePrev = () => {
    setCards((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-ink pb-3 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-ink-muted">
            <span className="w-2 h-2 bg-ink inline-block" />
            <span>DISPATCH ARCHIVES · SWIPEABLE BROADSHEET STACK</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-black text-ink mt-1">
            FRONT PAGE EDITIONS — SELECTED WORKS
          </h2>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-ink-muted hidden md:inline">
            SWIPE CARD OR USE ARROWS (THRESHOLD 35%)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={cyclePrev}
              aria-label="Previous edition"
              className="px-3 py-1.5 border border-ink bg-paper-light hover:bg-ink hover:text-paper text-xs font-mono tracking-wider transition-colors shadow-sm active:translate-y-0.5"
            >
              ← PREV
            </button>
            <button
              onClick={cycleCard}
              aria-label="Next edition"
              className="px-3 py-1.5 border border-ink bg-paper-light hover:bg-ink hover:text-paper text-xs font-mono tracking-wider transition-colors shadow-sm active:translate-y-0.5"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>

      {/* Cards Stack Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[520px] flex items-center justify-center py-6">
        <AnimatePresence initial={false} mode="popLayout">
          {cards.map((edition, index) => {
            const isTop = index === 0;
            const isSecond = index === 1;

            // Stack transform rules: peek behind with scale 0.95
            const scale = isTop ? 1 : isSecond ? 0.95 : 0.90;
            const translateY = isTop ? 0 : isSecond ? 18 : 34;
            const rotate = isTop ? 0 : isSecond ? 2 : -2.5;
            const zIndex = cards.length - index;

            return (
              <motion.div
                key={edition.id}
                layout
                style={{
                  zIndex,
                  transformOrigin: "top center",
                }}
                initial={{
                  scale: 0.88,
                  y: 45,
                  opacity: 0,
                }}
                animate={{
                  scale,
                  y: translateY,
                  rotate,
                  opacity: 1,
                }}
                exit={{
                  x: dragDirection > 0 ? 600 : -600,
                  opacity: 0,
                  rotate: dragDirection > 0 ? 18 : -18,
                  transition: { duration: 0.35, ease: "easeInOut" },
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                className={`group absolute top-0 w-full max-w-3xl bg-[#FAF7F0] border-2 border-ink shadow-newspaper-frame stamp-perforated-border rounded-sm p-6 sm:p-8 cursor-grab select-none overflow-hidden transition-colors ${
                  isTop ? "shadow-2xl" : "pointer-events-none opacity-90"
                }`}
              >
                {/* Perforated Postage Stamp Teeth */}
                <StampPerforations side="top" />
                <StampPerforations side="bottom" />
                <StampPerforations side="left" />
                <StampPerforations side="right" />

                {/* Aged Halftone & Ink Wash Background Filter */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: "6px 6px",
                  }}
                />

                {/* Card Top Utility Bar */}
                <div className="flex flex-wrap items-center justify-between border-b border-ink/40 pb-2 mb-4 gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-ink-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink uppercase bg-ink/10 px-2 py-0.5 rounded-sm">
                      {edition.editionNumber}
                    </span>
                    <span>·</span>
                    <span>{edition.dateTag}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-ink">{edition.statBadge}</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="font-mono text-ink">EDITION {index + 1} OF 3</span>
                  </div>
                </div>

                {/* Vintage Newspaper Project Name */}
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted mb-1 flex items-center gap-2">
                  <span>✦ ARCHIVAL SYSTEM:</span>
                  <span className="font-bold text-ink">{edition.name}</span>
                </div>

                {/* Main Headline with Holographic Ink Bleed Effect on Hover */}
                <h3 className="holographic-ink font-playfair font-black text-2xl sm:text-4xl md:text-[42px] leading-[1.08] tracking-tight text-ink uppercase my-3 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)] cursor-pointer">
                  {edition.headline}
                </h3>

                {/* Sub-headline / Deck Description */}
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-ink/90 border-l-2 border-ink pl-3 my-3">
                  {edition.sub}
                </p>

                {/* Lead Dispatch Snippet */}
                <div className="bg-paper-aged/60 border border-ink/20 p-3 my-4 rounded-sm text-xs font-serif leading-relaxed text-ink/80 flex items-start gap-2">
                  <span className="font-mono font-bold text-ink text-[11px] shrink-0 mt-0.5">
                    FILED NOTE:
                  </span>
                  <span>{edition.leadSnippet}</span>
                </div>

                {/* Bottom Spec Grid & Rubber Stamp Cancellation */}
                <div className="mt-6 pt-4 border-t-2 border-ink flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Printed With Specs */}
                  <div className="text-xs">
                    <span className="font-mono uppercase text-[10px] tracking-wider text-ink-muted block mb-0.5">
                      PRINTED WITH:
                    </span>
                    <span className="font-mono font-semibold text-ink text-xs sm:text-[13px]">
                      {edition.printedWith}
                    </span>
                  </div>

                  {/* Postal Ink Cancellation Mark (Rubber Stamp) */}
                  <div className="hidden sm:flex items-center gap-2 border border-dashed border-ink/40 px-2.5 py-1 rounded-sm text-[9.5px] font-mono tracking-widest text-ink-muted uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <span>{edition.cancellationText}</span>
                  </div>
                </div>

                {/* Interactive Action Tags (Live Demo, GitHub Link) */}
                <div className="mt-4 pt-3 border-t border-dotted border-ink/30 flex flex-wrap items-center gap-2.5">
                  <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">
                    RESOURCES:
                  </span>
                  {edition.tags.map((tag, tIdx) => (
                    <a
                      key={tIdx}
                      href={tag.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all shadow-sm ${
                        tag.isLive
                          ? "bg-ink text-paper hover:bg-emerald-700 hover:text-white"
                          : "bg-paper-light border border-ink text-ink hover:bg-ink hover:text-paper"
                      }`}
                    >
                      {tag.isLive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      )}
                      <span>[{tag.label}]</span>
                      <svg
                        className="w-3 h-3 ml-0.5 opacity-70"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>

                {/* Subtle Swipe Cue Ribbon on Top Card */}
                {isTop && (
                  <div className="mt-4 text-center">
                    <span className="text-[10px] font-mono text-ink-muted tracking-widest uppercase inline-flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <span>⇄ DRAG LEFT OR RIGHT TO SWIPE EDITION (35% THRESHOLD)</span>
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Stack Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {EDITIONS_DATA.map((item) => {
          const isActive = cards[0].id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                const targetIdx = cards.findIndex((c) => c.id === item.id);
                if (targetIdx > 0) {
                  setCards((prev) => [
                    ...prev.slice(targetIdx),
                    ...prev.slice(0, targetIdx),
                  ]);
                }
              }}
              className={`h-2 transition-all rounded-full ${
                isActive
                  ? "w-8 bg-ink"
                  : "w-2 bg-ink/30 hover:bg-ink/60"
              }`}
              aria-label={`Jump to ${item.name}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FrontPageStack;
