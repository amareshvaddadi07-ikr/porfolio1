import React from "react";
import { Masthead } from "@/components/press/Masthead";
import { PrintingPressRoller } from "@/components/press/PrintingPressRoller";
import { FrontPageStack } from "@/components/press/FrontPageStack";
import { Classifieds } from "@/components/press/Classifieds";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-ink text-paper py-1 text-center text-[10px] font-mono tracking-[0.25em] uppercase">
        ★ SPECIAL EDITION ★ THE CHRONICLE OF ARCHITECTURE & CYBERSECURITY SOVEREIGNTY ★
      </div>

      {/* Main Broadside Paper Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pb-16">
        
        {/* Newspaper Masthead */}
        <Masthead />

        {/* Mechanical Printing Press Roller (Scroll-driven Inking & Self-drawing Lines) */}
        <PrintingPressRoller />

        {/* Front Page Swipeable Editions Stack */}
        <FrontPageStack />

        {/* Intelligence Briefs Classifieds Section */}
        <Classifieds />

        {/* In-Depth Investigative Dispatches Column Grid */}
        <section className="mt-14 border-t-2 border-b-2 border-ink py-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/30">
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-ink">
              SECTION D: IN-DEPTH INVESTIGATIVE DOSSIER
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              VISAKHAPATNAM PRESS WIRE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 divide-y md:divide-y-0 md:divide-x divide-ink/20">
            
            {/* Column 1: Blockchain Forensics */}
            <article className="md:col-span-4 pr-0 md:pr-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase bg-ink/10 px-1.5 py-0.5 font-bold tracking-wider">
                  DOSSIER I
                </span>
                <span className="text-[10px] font-mono text-ink-muted">· DECENTRALIZED SYSTEMS</span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-tight mb-3 text-ink">
                Tracing Dark Capital: Blockchain Forensics at Cryptographic Scale
              </h3>
              <p className="font-serif text-sm leading-relaxed text-ink/90 text-justify">
                <span className="float-left text-4xl font-playfair font-black pr-2 pt-1 leading-none text-ink">
                  I
                </span>
                n an age where on-chain capital travels frictionless across borders, sovereign security requires deterministic proof. Amaresh engineers algorithmic graph traversal and UTXO taint tracking systems that de-anonymize illicit mixers, identifying multi-hop transaction routes with mathematical precision.
              </p>
              <div className="mt-4 pt-3 border-t border-dotted border-ink/30 text-[11px] font-mono text-ink-muted">
                TAGS: ON-CHAIN ANALYTICS · GRAPH ALGORITHMS · ZERO-KNOWLEDGE
              </div>
            </article>

            {/* Column 2: AI Prison OS */}
            <article className="md:col-span-4 px-0 md:px-6 pt-6 md:pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase bg-ink/10 px-1.5 py-0.5 font-bold tracking-wider">
                  DOSSIER II
                </span>
                <span className="text-[10px] font-mono text-ink-muted">· EDGE VISION INTELLIGENCE</span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-tight mb-3 text-ink">
                AI Prison OS: Real-Time Edge Telemetry in High-Security Facilities
              </h3>
              <p className="font-serif text-sm leading-relaxed text-ink/90 text-justify">
                <span className="float-left text-4xl font-playfair font-black pr-2 pt-1 leading-none text-ink">
                  C
                </span>
                ritical infrastructure demands zero network dependencies and sub-50ms inferencing. The AI Prison Operating System orchestrates autonomous spatial surveillance, anomalous anomaly triage, and perimeter intrusion telemetry directly at the sensor layer with ironclad failover safeguards.
              </p>
              <div className="mt-4 pt-3 border-t border-dotted border-ink/30 text-[11px] font-mono text-ink-muted">
                TAGS: COMPUTER VISION · TENSORRT · MISSION-CRITICAL EDGE
              </div>
            </article>

            {/* Column 3: GovTech RBAC */}
            <article className="md:col-span-4 pl-0 md:pl-6 pt-6 md:pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase bg-ink/10 px-1.5 py-0.5 font-bold tracking-wider">
                  DOSSIER III
                </span>
                <span className="text-[10px] font-mono text-ink-muted">· ZERO-TRUST GOVERNANCE</span>
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-tight mb-3 text-ink">
                GovTech RBAC: Granular Authority Matrices for Sovereign Platforms
              </h3>
              <p className="font-serif text-sm leading-relaxed text-ink/90 text-justify">
                <span className="float-left text-4xl font-playfair font-black pr-2 pt-1 leading-none text-ink">
                  A
                </span>
                dministering public digital registries across billions of citizen touchpoints hinges on uncompromised access boundaries. Through fine-grained Role-Based Access Control and cryptographic audit ledgers, high-assurance governance is enforced at every layer of the API gateway.
              </p>
              <div className="mt-4 pt-3 border-t border-dotted border-ink/30 text-[11px] font-mono text-ink-muted">
                TAGS: DISTRIBUTED RBAC · OIDC / SAML · AUDIT TRAILS
              </div>
            </article>

          </div>
        </section>

        {/* Newspaper Colophon & Footer Rule */}
        <footer className="mt-12 pt-6 border-t-[3px] border-ink text-center">
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-ink-muted tracking-wider gap-4">
            <div>
              THE KRYPTON GAZETTE · VISAKHAPATNAM, ANDHRA PRADESH, INDIA
            </div>
            <div className="flex items-center gap-4">
              <span>TYPESET IN PLAYFAIR DISPLAY</span>
              <span>·</span>
              <span>ESTABLISHED 2025</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
