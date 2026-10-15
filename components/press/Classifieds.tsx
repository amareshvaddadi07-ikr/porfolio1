"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ParallaxStamp } from "./ParallaxStamp";

interface BriefItem {
  id: string;
  briefNumber: string;
  clearance: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  redactedText: string;
  revealedText: string;
  intelSpecs: string[];
  techStack: string[];
  docketCode: string;
}

const BRIEFS: BriefItem[] = [
  {
    id: "brief-01",
    briefNumber: "BRIEF #01",
    clearance: "DECLASSIFIED // TOP SECRET",
    category: "DECENTRALIZED FORENSICS",
    title: "Blockchain Forensics",
    subtitle: "Tracing and freezing illicit crypto flows",
    description: "Algorithmic graph traversal protocols for deterministic ledger de-anonymization. Intercepts multi-hop mixer hops and executes automated freeze primitives on smart contract vaults before capital escapes to non-custodial bridges.",
    redactedText: "████████ ESCROW FREEZE TRIGGERED ████████",
    revealedText: "CONFIRMED: $2.4M ILLICIT ASSETS BLOCKED ON-CHAIN",
    intelSpecs: ["Graph Heuristics", "UTXO Taint Engine", "Zero-Knowledge Proofs"],
    techStack: ["TypeScript", "Solidity", "Ethers.js", "Graph Protocols"],
    docketCode: "DOC-KRYPTON-FORENSICS-01",
  },
  {
    id: "brief-02",
    briefNumber: "BRIEF #02",
    clearance: "CLEARANCE // LEVEL-4 DEFENSE",
    category: "CRITICAL INFRASTRUCTURE",
    title: "AI Systems for Critical Infra",
    subtitle: "SAMARTH-OS prison workflows",
    description: "High-assurance spatial AI operating system deployed in maximum-security penal facilities. Synthesizes real-time camera telemetry, tracks yard anomalies, automates officer rosters, and enforces perimeter containment under sub-50ms latency.",
    redactedText: "████████ EDGE INFERENCE ISOLATED ████████",
    revealedText: "PERIMETER SECURED: 100% AIR-GAPPED VISION CORE",
    intelSpecs: ["Sub-50ms Computer Vision", "Spatial Anomaly Models", "Zero-Cloud Fallback"],
    techStack: ["TypeScript", "TensorRT", "Edge AI", "Secure Linux Kernel"],
    docketCode: "DOC-SAMARTH-PRISON-02",
  },
  {
    id: "brief-03",
    briefNumber: "BRIEF #03",
    clearance: "DECLASSIFIED // STATE BUREAU",
    category: "GOVTECH RBAC ARCHITECTURE",
    title: "RBAC & Access Control",
    subtitle: "GovFlow AI permission engine",
    description: "Hierarchical cryptographic access control engine engineered for deep government bureaucracy. Enforces dynamic attribute-based security policies across billions of multi-department documents, eliminating rogue data exfiltration.",
    redactedText: "████████ ACCESS MATRICES RATIFIED ████████",
    revealedText: "ZERO-TRUST VERIFIED: 10,000+ ROLES ARBITRATED",
    intelSpecs: ["Hierarchical Role Matrices", "OIDC Cryptographic Auth", "Immutable Audit Vault"],
    techStack: ["TypeScript", "RBAC / ABAC", "Next.js", "PostgreSQL"],
    docketCode: "DOC-GOVFLOW-RBAC-03",
  },
  {
    id: "brief-04",
    briefNumber: "BRIEF #04",
    clearance: "RESTRICTED // COMMERCIAL INFRA",
    category: "DISTRIBUTED COMMERCE ARCHITECTURE",
    title: "E-Commerce Infra",
    subtitle: "SmartECommerce C#",
    description: "High-throughput transactional backbone handling peak surge checkouts with atomic consistency. Engineered with resilient message bus architectures, idempotent payment pipelines, and microsecond caching layers.",
    redactedText: "████████ CONCURRENCY SURGE BALANCED ████████",
    revealedText: "THROUGHPUT: 12,000 TPS WITH 99.999% SLA UPTIME",
    intelSpecs: ["Idempotent Pipelines", "Distributed Message Queues", "Fault-Tolerant Cache"],
    techStack: ["C#", ".NET Core", "SQL Server", "Redis", "Docker"],
    docketCode: "DOC-SMARTEC-04",
  },
  {
    id: "brief-05",
    briefNumber: "BRIEF #05",
    clearance: "DECLASSIFIED // CIVIC DOMAIN",
    category: "CIVIC TELEMETRY PROTOCOLS",
    title: "Civic Tech",
    subtitle: "CleanAir-clean-Streets",
    description: "Decentralized civic monitoring grid synthesizing municipal hyper-local sensor telemetry. Empowers citizens with auditable air pollution metrics and crowdsourced municipal sanitation accountability feeds.",
    redactedText: "████████ MUNICIPAL AUDIT BROADCAST ████████",
    revealedText: "PUBLIC TRANSPARENCY: SENSORS ACTIVE ACROSS CITY",
    intelSpecs: ["Hyper-local Geo-Sensing", "Crowdsourced Telemetry", "Open Municipal Feeds"],
    techStack: ["TypeScript", "IoT Telemetry", "Mapbox", "Civic APIs"],
    docketCode: "DOC-CIVIC-CLEANAIR-05",
  },
];

// Interactive Typewriter Proximity Morph Text Component
function ProximityTypewriterText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    wordRefs.current = wordRefs.current.slice(0, words.length);
  }, [words.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <p
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="font-mono text-xs sm:text-[13px] leading-relaxed text-ink/90 cursor-crosshair select-text transition-colors"
    >
      {words.map((word, i) => {
        let weight = 400;

        if (mousePos && wordRefs.current[i]) {
          const el = wordRefs.current[i];
          if (el) {
            const wordCenterX = el.offsetLeft + el.offsetWidth / 2;
            const wordCenterY = el.offsetTop + el.offsetHeight / 2;
            const dist = Math.hypot(mousePos.x - wordCenterX, mousePos.y - wordCenterY);

            // Proximity morph radius of 90px
            const radius = 90;
            if (dist < radius) {
              const factor = 1 - dist / radius;
              weight = Math.round(400 + factor * 500);
            }
          }
        }

        return (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            style={{
              fontWeight: weight,
              transition: "font-weight 0.12s ease-out",
            }}
            className="inline-block mr-1 text-ink"
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

// Redacted Secret Peel Component
function RedactedBanner({
  redactedText,
  revealedText,
}: {
  redactedText: string;
  revealedText: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      className="relative cursor-pointer select-none my-3 py-1.5 px-3 rounded-sm border border-dashed border-ink/40 transition-all overflow-hidden"
    >
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
        <span className="flex items-center gap-1.5 text-ink-muted">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isRevealed ? "bg-red-600 animate-ping" : "bg-ink"
            }`}
          />
          {isRevealed ? "DECLASSIFIED DATA STREAM:" : "HOVER TO DECLASSIFY:"}
        </span>
        <span className="text-[9px] text-ink-muted">
          {isRevealed ? "STATUS: VISIBLE" : "[ENCRYPTED]"}
        </span>
      </div>

      <div className="mt-1 font-mono text-xs font-bold tracking-wider">
        {isRevealed ? (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-800 bg-red-100/70 px-2 py-0.5 rounded font-mono border-l-2 border-red-700"
          >
            {revealedText}
          </motion.div>
        ) : (
          <div className="bg-ink text-paper-light px-2 py-0.5 tracking-widest text-[11px] font-mono">
            {redactedText}
          </div>
        )}
      </div>
    </div>
  );
}

// Individual Spotlight Card Component (cyze.dev style spotlight tracking)
function SpotlightClassifiedCard({
  brief,
  isFeatured,
}: {
  brief: BriefItem;
  isFeatured: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative border-2 border-ink p-5 bg-[#FAF7F0] shadow-sm flex flex-col justify-between transition-all duration-200 overflow-hidden group/card ${
        isFeatured ? "lg:col-span-2 bg-[#F9F5EC]" : ""
      }`}
    >
      {/* cyze.dev Interactive Spotlight Cursor Illumination */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(17, 17, 17, 0.08), transparent 75%)`,
        }}
      />

      {/* Spotlight Border Glow Line */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xs transition-opacity duration-300 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(17, 17, 17, 0.35), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2px",
        }}
      />

      {/* Top Classifieds Meta Bar */}
      <div className="relative z-20">
        <div className="flex items-center justify-between border-b border-ink/30 pb-2 mb-3 text-[10px] font-mono">
          <span className="font-bold text-ink bg-ink/10 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
            {brief.briefNumber}
          </span>
          <span className="text-ink-muted tracking-widest uppercase">
            {brief.clearance}
          </span>
        </div>

        {/* Docket & Category */}
        <div className="flex items-center justify-between text-[9.5px] font-mono text-ink-muted tracking-widest uppercase mb-1">
          <span>{brief.category}</span>
          <span>{brief.docketCode}</span>
        </div>

        {/* Title & Subtitle */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-playfair font-bold text-xl sm:text-2xl text-ink leading-tight mt-1 mb-1">
              {brief.title}
            </h3>
            <p className="font-serif italic text-sm text-ink-muted mb-3 pb-2 border-b border-dotted border-ink/40">
              — {brief.subtitle}
            </p>
          </div>

          {/* 3D Parallax Stamp for Featured Brief */}
          {isFeatured && (
            <div className="hidden sm:block shrink-0">
              <ParallaxStamp
                city="VISAKHAPATNAM"
                department="INTELLIGENCE DESK"
                dateStr="15 OCT 2026"
                code="ARCHIVED PROTOCOL"
              />
            </div>
          )}
        </div>

        {/* Proximity Typewriter Morphing Body Text */}
        <div className="my-3">
          <ProximityTypewriterText text={brief.description} />
        </div>

        {/* Redacted Secret Reveal Banner */}
        <RedactedBanner
          redactedText={brief.redactedText}
          revealedText={brief.revealedText}
        />
      </div>

      {/* Bottom Intel Specs & Tech Stack */}
      <div className="mt-4 pt-3 border-t border-ink/30 relative z-20">
        {/* Intel Specs */}
        <div className="mb-2">
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
            TACTICAL CAPABILITIES:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {brief.intelSpecs.map((spec, sIdx) => (
              <span
                key={sIdx}
                className="text-[10px] font-mono bg-paper-aged border border-ink/20 px-2 py-0.5 rounded-sm text-ink font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
            INSTRUMENTATION:
          </span>
          <div className="flex flex-wrap gap-1">
            {brief.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="text-[9px] font-mono bg-ink text-paper px-1.5 py-0.5 rounded-xs tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Classifieds() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionMouse, setSectionMouse] = useState({ x: -2000, y: -2000 });
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => {
        setIsSectionHovered(false);
        setSectionMouse({ x: -2000, y: -2000 });
      }}
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16 select-text overflow-hidden"
    >
      {/* Section Global Ambient Spotlight Cursor (cyze.dev effect) */}
      <div
        className="pointer-events-none absolute -inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isSectionHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${sectionMouse.x}px ${sectionMouse.y}px, rgba(17, 17, 17, 0.035), transparent 75%)`,
        }}
      />

      {/* Newspaper Classifieds Section Header */}
      <div className="border-t-[3px] border-b-[3px] border-ink py-3 mb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-center md:text-left">
          
          {/* Section Number and Vintage Ear Tag */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="bg-ink text-paper text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-2 py-1">
              SECTION C
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-ink-muted uppercase">
              DEPT. OF APPLIED ENGINEERING
            </span>
          </div>

          {/* Grand Classifieds Title */}
          <div className="text-center">
            <h2 className="font-playfair font-black text-2xl sm:text-4xl tracking-tight text-ink uppercase">
              INTELLIGENCE BRIEFS — CLASSIFIEDS
            </h2>
            <p className="text-[11px] font-serif italic text-ink-muted mt-0.5">
              Confidential Technical Dossiers · Hover Over Text for Kinetic Typewriter Weight Morph · Spotlight Cursor Active
            </p>
          </div>

          {/* Clearance Status Tag */}
          <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] font-mono tracking-widest uppercase text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>ARCHIVE ACCREDITED</span>
          </div>
        </div>
      </div>

      {/* Classifieds Rule Line / Dateline */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-ink-muted border-b border-ink/40 pb-2 mb-6 relative z-10">
        <span>SECURITY LEVEL: OPEN INSPECTION</span>
        <span className="hidden sm:inline">VISAKHAPATNAM SPECIAL ENCLAVE</span>
        <span>TOTAL BRIEFS: 05 RECORDED</span>
      </div>

      {/* Classifieds Newspaper Grid: Multi-Column Vintage Columns with Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {BRIEFS.map((brief, idx) => (
          <SpotlightClassifiedCard
            key={brief.id}
            brief={brief}
            isFeatured={idx === 0}
          />
        ))}
      </div>

      {/* Bottom Classified Notice & Call to Action */}
      <div className="mt-8 border-t-2 border-b-2 border-ink py-4 px-4 bg-paper-light flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full border border-ink flex items-center justify-center font-serif font-black text-sm">
            ★
          </span>
          <div>
            <p className="text-xs font-mono font-bold uppercase text-ink">
              RECRUITMENT & COLLABORATION DISPATCH
            </p>
            <p className="text-[11px] font-serif text-ink-muted">
              All 5 intelligence briefs are backed by production repositories and production systems architecture.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/amareshvaddadi07-ikr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-ink text-paper hover:bg-ink-muted text-xs font-mono tracking-widest uppercase transition-colors shadow-sm"
          >
            INSPECT GITHUB ARCHIVES →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Classifieds;
