"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const STARS = Array.from({ length: 20 }).map((_, i) => {
  const prob = (i * 17) % 100;
  const size = prob > 85 ? 3 : prob > 60 ? 2 : 1;
  return {
    id: i,
    left: `${(i * 31) % 100}%`,
    top: `${(i * 37) % 100}%`,
    width: size,
    height: size,
    duration: 2 + ((i * 41) % 4),
    delay: ((i * 43) % 3),
  };
});

export function SustainabilityWorld() {
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
      id="sustainability"
      ref={containerRef}
      className="relative w-full max-w-full h-screen min-h-[800px] overflow-hidden flex flex-col md:flex-row items-center snap-center"
    >
      {/* Layer 1: Deep space black background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        style={{ background: "#000000", y: bgY }}
      />

      {/* Layer 2: Pre-generated LEGO star dots */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-1 will-change-transform"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cyan lightsaber glow streak */}
      <motion.div
        className="absolute z-2 rounded-full"
        style={{
          left: "5%",
          top: "18%",
          width: 180,
          height: 6,
          background:
            "linear-gradient(90deg, transparent, #00f3ff, transparent)",
          filter: "blur(4px)",
          rotate: -35,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LEFT HALF: Lego Scene */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10 flex items-center justify-center p-4">
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.9, x: -60 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full max-w-2xl flex items-center justify-center"
        >
          <Image
            src="/sus-final-transparent.png"
            alt="AI in Sustainability Star Wars Scene"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-left"
            priority
          />
        </motion.div>
      </div>

      {/* RIGHT HALF: Text Content */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-30 flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 mb-16 md:mb-0">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-neon-blue bg-neon-blue/10 text-neon-blue font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_#00f3ff] font-bold">
            Lego Star Wars
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-4 md:mb-6 leading-none max-w-full whitespace-normal wrap-break-word">
            <span
              className="text-white block mb-1 max-w-full wrap-break-word text-lego-heading shadow-layer-blue"
            >
              AI in
            </span>
            <span
              className="text-white block mt-1 max-w-full wrap-break-word text-lego-heading shadow-layer-green"
            >
              Sustainability
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-lg border-l-4 border-neon-blue pl-4 sm:pl-6 drop-shadow-sm">
            A new hope for our planet. Use the Force of technology to fight
            climate change, optimise energy grids, and build eco-systems that
            ensure a sustainable galaxy for all species.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
