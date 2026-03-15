"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Pre-generated random values to prevent hydration mismatch and reduce re-renders
const PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: `${10 + ((i * 17) % 80)}%`,
  top: `${10 + ((i * 23) % 80)}%`,
  delay: ((i * 13) % 5) * 0.1,
  yRange: [(i * 31) % 100, -((i * 37) % 100)],
  yAnimParams: [0, -((i * 41) % 30) - 10, 0],
  rotateAnimParams: [0, (i * 47) % 360, 0],
  duration: 4 + ((i * 53) % 4),
  bgClass: ["bg-slate-800", "bg-slate-700", "bg-slate-900", "bg-zinc-600"][i % 4],
  roundedClass: i % 2 === 0 ? "rounded-sm" : "rounded-full"
}));

export function BatmanWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  return (
    <section
      id="healthcare"
      ref={containerRef}
      className="relative w-full max-w-full h-screen min-h-[800px] overflow-hidden flex flex-col md:flex-row items-center snap-center"
    >
      {/* Layer 1: background gradient */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{
          background: "#DFB027",
          y: bgY,
        }}
      />

      {/* LEFT HALF: Lego Scene */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10 flex items-center justify-center p-8">
        {/* Layer 2: Lego Scene Image */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full max-w-2xl flex items-center justify-center"
        >
          <Image
            src="/healthcare-transparent.png"
            alt="AI in Healthcare Batman Scene"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Layer 3: Floating Mechanical Lego Bricks */}
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: particle.delay, duration: 1 }}
            className="absolute z-0 will-change-transform"
            style={{
              left: particle.left,
              top: particle.top,
              y: useTransform(scrollYProgress, [0, 1], particle.yRange),
            }}
          >
            <motion.div
              animate={{
                y: particle.yAnimParams,
                rotate: particle.rotateAnimParams,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={cn(
                "w-6 h-6 border-t border-white/30 shadow-xl will-change-transform",
                particle.bgClass,
                particle.roundedClass
              )}
            >
              {/* inner stud */}
              <div className="absolute inset-1.5 rounded-full bg-white/10 shadow-inner" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT HALF: Text Content (Layer 4) */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-30 flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 mb-16 md:mb-0">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-black bg-black/10 text-black font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_rgba(0,0,0,1)] font-bold">
            Lego Batman
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-4 md:mb-6 leading-none max-w-full whitespace-normal wrap-break-word">
            <span
              className="text-white block mb-1 max-w-full wrap-break-word text-lego-heading shadow-layer-red"
            >
              AI in
            </span>
            <span
              className="text-lego-yellow block mt-1 max-w-full wrap-break-word text-lego-heading shadow-layer-blue"
            >
              Healthcare
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-black/80 font-medium leading-relaxed max-w-lg border-l-4 border-black pl-4 sm:pl-6">
            Sometimes the city needs a hero. Develop life-saving applications
            and health platforms to protect the innocent and cure the sick.
            Construct medical breakthroughs one block at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
