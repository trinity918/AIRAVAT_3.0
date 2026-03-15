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
  duration: 3 + ((i * 53) % 4),
  bgClass: ["bg-green-500", "bg-emerald-400", "bg-lime-500", "bg-lego-yellow", "bg-lego-red"][i % 5],
}));

export function NinjagoWorld() {
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
      id="fintech"
      ref={containerRef}
      className="relative w-full max-w-full h-screen min-h-[800px] overflow-hidden flex flex-col md:flex-row items-center snap-center"
    >
      {/* Layer 1: background gradient */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{
          background:
            "linear-gradient(135deg, #1E63B8 0%, #0B4FA3 60%, #083E87 100%)",
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
            src="/fintech-transparent.png"
            alt="AI & FinTech Ninjago Scene"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Layer 3: Floating Lego Bricks */}
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
                "w-6 h-6 rounded-sm shadow-xl border-t border-white/20 will-change-transform",
                particle.bgClass
              )}
            >
              <div className="flex gap-1 justify-center mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 shadow-inner" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 shadow-inner" />
              </div>
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
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-neon-green bg-neon-green/10 text-neon-green font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_#39ff14] font-bold">
            Lego Ninjago
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-4 md:mb-6 leading-none max-w-full whitespace-normal wrap-break-word">
            <span
              className="text-white block mb-1 max-w-full wrap-break-word text-lego-heading shadow-layer-blue"
            >
              AI &
            </span>
            <span
              className="text-white block mt-1 max-w-full wrap-break-word text-lego-heading shadow-layer-green"
            >
              FinTech
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed max-w-lg border-l-4 border-neon-green pl-4 sm:pl-6 drop-shadow-sm">
            Master the elements of artificial intelligence and digital finance.
            Build algorithmic systems faster than lightning and as precise as a
            ninja's strike. Spin up your ideas in the vortex of innovation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
