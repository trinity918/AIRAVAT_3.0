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
  bgClass: ["bg-pink-300", "bg-pink-400", "bg-pink-500", "bg-white", "bg-purple-400"][i % 5],
}));

export function SocialCauseWorld() {
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
      id="socialcause"
      ref={containerRef}
      className="relative w-full max-w-full h-screen min-h-[800px] overflow-hidden flex flex-col md:flex-row items-center snap-center"
    >
      {/* Layer 1: background gradient */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{
          background:
            "linear-gradient(135deg, #FF69B4 0%, #FF1493 60%, #C71585 100%)",
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
            src="/kyabolti-transparent.png"
            alt="AI for Social Cause Scene"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-30 flex flex-col justify-center px-8 md:px-24 mb-16 md:mb-0">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white bg-white/10 text-white font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_#fff] font-bold">
            LEGO City
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-6 leading-none max-w-full whitespace-normal wrap-break-word">
            <span
              className="text-white block mb-1 max-w-full wrap-break-word text-lego-heading shadow-layer-pink"
            >
              AI for
            </span>
            <span
              className="text-white block mt-1 max-w-full wrap-break-word text-lego-heading shadow-layer-blue"
            >
              Social Cause
            </span>
          </h2>

          <p className="text-xl text-white/90 font-light leading-relaxed max-w-lg border-l-4 border-white pl-6 drop-shadow-sm">
            This domain will focus on building technology solutions that create
            meaningful social impact. Construct equity and accessibility one
            brick at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
