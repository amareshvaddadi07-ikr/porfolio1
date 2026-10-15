"use client";

import React from "react";
import { motion } from "framer-motion";
import { WaxSeal } from "./WaxSeal";

interface MastheadProps {
  edition?: string;
  volume?: string;
  issue?: string;
  dateStr?: string;
  location?: string;
  price?: string;
}

export function Masthead({
  edition = "VISAKHAPATNAM EDITION",
  volume = "VOL. I",
  issue = "NO. 001",
  dateStr = "THURSDAY, OCTOBER 15, 2026",
  location = "VISAKHAPATNAM, ANDHRA PRADESH",
  price = "₹ 0.00 — FREE FOR FOUNDERS & RECRUITERS",
}: MastheadProps) {
  return (
    <header className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 select-text">
      {/* Top Gazette Weather & Price Wire (Small Running Header) */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono tracking-wider text-ink-muted border-b border-ink/30 pb-2 mb-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-ink">WEATHER WIRE:</span>
          <span>VISAKHAPATNAM 28°C · BAY OF BENGAL BREEZE · PRESS ROOM 100% ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">COORDINATES: 17.6868° N, 83.2185° E</span>
          <span className="font-semibold text-ink">{price}</span>
        </div>
      </div>

      {/* Masthead Header Box with Authentic Ornate Border */}
      <div className="border-t-[3px] border-b-[3px] border-ink py-4 relative">
        <div className="border-t border-b border-ink/40 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Left Ear Panel */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-ink/30 pb-3 lg:pb-0 lg:pr-4 text-center lg:text-left flex flex-col justify-between h-full"
            >
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-muted">
                  REGISTERED DISPATCH
                </p>
                <p className="text-xs font-serif font-bold tracking-wide mt-1 text-ink">
                  {volume} · {issue}
                </p>
                <p className="text-[11px] font-serif italic text-ink-muted mt-0.5">
                  Est. 2025 · Daily Gazette
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-dotted border-ink/30">
                <p className="text-[9.5px] font-mono tracking-widest text-ink uppercase">
                  SPECIAL INVESTIGATION
                </p>
                <p className="text-[11px] font-serif leading-tight text-ink mt-0.5">
                  Sovereign Digital Infrastructure & Systems Intelligence
                </p>
              </div>
            </motion.div>

            {/* Central Newspaper Masthead Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 text-center px-2"
            >
              {/* Top Motto */}
              <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-serif italic tracking-[0.15em] text-ink-muted mb-1">
                <span>✦</span>
                <span>VERITAS PER CODICEM · HIGH ASSURANCE SYSTEMS</span>
                <span>✦</span>
              </div>

              {/* Grand Masthead Typography */}
              <h1 className="font-playfair font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-[-0.03em] leading-none text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                THE KRYPTON GAZETTE
              </h1>

              {/* Sub-masthead Rule Bar & Edition */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 text-[10.5px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-ink uppercase">
                <span className="h-px bg-ink flex-1" />
                <span className="font-bold">EST. 2025</span>
                <span>❖</span>
                <span className="font-bold">{edition}</span>
                <span className="h-px bg-ink flex-1" />
              </div>
            </motion.div>

            {/* Right Ear Panel: Wax Seal + Builder Badge */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-ink/30 pt-3 lg:pt-0 lg:pl-4 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-2"
            >
              <div className="text-left lg:text-center">
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-ink-muted">
                  AUTHENTICATED BY
                </p>
                <p className="text-xs sm:text-sm font-serif font-black tracking-wide text-ink mt-0.5">
                  AMARESH VADDADI
                </p>
                <p className="text-[10px] font-mono text-ink-muted mt-0.5">
                  SYSTEMS ARCHITECT
                </p>
              </div>

              {/* Tilt Hover Wax Seal */}
              <div className="flex justify-center items-center my-1">
                <WaxSeal label="VERIFIED BUILDER" sublabel="AMARESH VADDADI" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Dateline Ribbon (Date, Location, Security Status) */}
      <div className="border-b-[2px] border-ink py-1.5 px-2 flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-serif font-semibold tracking-wide text-ink bg-paper-light/50">
        <div className="flex items-center gap-2">
          <span>{dateStr}</span>
          <span className="text-ink-muted">|</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            SECURITY CLEARANCE: VERIFIED
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">EDITION ARCHIVE #01</span>
        </div>
      </div>

      {/* Lead Headline Section */}
      <div className="pt-6 pb-4">
        {/* Eyebrow Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="bg-ink text-paper text-[9.5px] font-mono font-bold uppercase tracking-[0.2em] px-2 py-0.5">
            EXCLUSIVE DISPATCH
          </span>
          <span className="h-px bg-ink/30 flex-1" />
          <span className="text-[11px] font-mono tracking-widest text-ink-muted uppercase hidden sm:inline">
            SYSTEMS INTELLIGENCE & INFRASTRUCTURE
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-playfair font-black text-3xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.04] tracking-[-0.02em] text-ink uppercase text-balance text-center sm:text-left my-3 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
        >
          ENGINEER BUILDS INFRASTRUCTURE FOR A SAFER DIGITAL INDIA
        </motion.h2>

        {/* Sub-headline with Ornamental Framing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative py-2.5 my-2 border-t border-b border-ink/40 text-center"
        >
          <div className="text-base sm:text-xl md:text-2xl font-serif italic text-ink tracking-wide font-medium flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span>Blockchain Forensics</span>
            <span className="text-ink-muted font-normal not-italic">✦</span>
            <span>AI Prison OS</span>
            <span className="text-ink-muted font-normal not-italic">✦</span>
            <span>GovTech RBAC</span>
          </div>
        </motion.div>

        {/* Byline and Story Meta */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono tracking-wider text-ink-muted pt-2 pb-1 border-b border-ink/20">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink">BY SPECIAL CORRESPONDENT TO THE GAZETTE</span>
            <span>·</span>
            <span>VISAKHAPATNAM BUREAU</span>
          </div>
          <div className="flex items-center gap-3">
            <span>READ TIME: 4 MIN</span>
            <span>·</span>
            <span>DOC ID: #KRYPTON-INFRA-2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Masthead;
