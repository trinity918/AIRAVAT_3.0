"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics/react";
import { FloatingBricks } from "./Hero3D";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden max-w-full"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <FloatingBricks />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden md:pt-32 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-neon-blue bg-neon-blue/10 text-neon-blue font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm box-neon">
            IEEE CS SPIT Presents
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-wider mb-4 leading-none">
            <span className="text-lego-yellow inline-block mb-1 text-lego-heading shadow-layer-red">
              AIRAVAT
            </span>
            <br />
            <span className="text-white inline-block mt-1 text-lego-heading shadow-layer-blue">
              3.0
            </span>
            <br />
            <span className="text-xl md:text-4xl text-slate-200 mt-4 md:mt-6 block tracking-widest font-bold drop-shadow-md">
              An AI Hackathon
            </span>
            <span className="text-lg md:text-2xl text-lego-yellow mt-2 md:mt-4 block tracking-widest font-bold drop-shadow-md">
              Prize Pool: ₹1,00,000
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl text-base sm:text-lg md:text-xl text-slate-300 mb-8 md:mb-10 font-light px-4 wrap-break-word"
        >
          Assemble your ideas. Build the future. Join 24 hours of intense coding
          and creative construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className="flex flex-wrap gap-6 justify-center relative z-20 md:-mt-2"
        >
          {/* ── Register Now – RED LEGO BRICK ── */}
          <a
            href="https://unstop.com/hackathons/airavat-30-24-hour-national-ai-hackathon-sardar-patel-institute-of-technology-spit-mumbai-1658777"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Register_Clicked")}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            {/* Studs row */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "-2px",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "20px",
                    height: "12px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 35%, #ff6666, #cc0000)",
                    boxShadow: "0 2px 0 #880000, inset 0 1px 2px rgba(255,255,255,0.35)",
                    border: "1px solid #aa0000",
                  }}
                />
              ))}
            </div>
            {/* Brick body */}
            <div
              className="group"
              style={{
                background: "linear-gradient(180deg, #e3000b 0%, #c50009 100%)",
                boxShadow: "0 6px 0 #880000, 0 6px 24px rgba(227,0,11,0.55)",
                borderRadius: "4px",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "transform 0.08s ease, box-shadow 0.08s ease",
                borderTop: "2px solid rgba(255,120,120,0.35)",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 0 #880000, 0 2px 8px rgba(227,0,11,0.4)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 0 #880000, 0 6px 24px rgba(227,0,11,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 0 #880000, 0 6px 24px rgba(227,0,11,0.55)";
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "inherit",
                  fontWeight: 900,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                Register Now
              </span>
            </div>
          </a>

          {/* ── Explore – YELLOW LEGO BRICK ── */}
          <a
            href="#about"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            {/* Studs row */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "-2px",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "20px",
                    height: "12px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 35%, #ffe066, #e6a800)",
                    boxShadow: "0 2px 0 #a67700, inset 0 1px 2px rgba(255,255,255,0.4)",
                    border: "1px solid #cc9900",
                  }}
                />
              ))}
            </div>
            {/* Brick body */}
            <div
              style={{
                background: "linear-gradient(180deg, #FFD700 0%, #e6c200 100%)",
                boxShadow: "0 6px 0 #a67700, 0 6px 24px rgba(230,194,0,0.4)",
                borderRadius: "4px",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "transform 0.08s ease, box-shadow 0.08s ease",
                borderTop: "2px solid rgba(255,255,200,0.4)",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 0 #a67700, 0 2px 8px rgba(230,194,0,0.3)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 0 #a67700, 0 6px 24px rgba(230,194,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 0 #a67700, 0 6px 24px rgba(230,194,0,0.4)";
              }}
            >
              <span
                style={{
                  color: "#1a1a1a",
                  fontFamily: "inherit",
                  fontWeight: 900,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 2px rgba(255,255,255,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                Explore
              </span>
            </div>
          </a>
        </motion.div>
      </div>

      {/* Dynamic bottom gradient to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
