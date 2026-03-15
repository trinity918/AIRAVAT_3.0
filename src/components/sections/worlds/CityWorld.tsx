"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  yAnim: [0, (i * 13) % 40 + 20, 0],
  xAnim: [0, (i * 17) % 60 - 30, 0],
  rotateAnim: [0, (i * 23) % 360, 0],
  duration: 6 + ((i * 31) % 6),
  bgClass: ["bg-[#16a34a]", "bg-[#22c55e]", "bg-[#4ade80]", "bg-[#86efac]"][i % 4],
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${-20 + ((i * 41) % 40)}%`,
  scale: 0.5 + ((i * 43) % 10) * 0.1,
  opacity: 0.3 + ((i * 47) % 5) * 0.1,
}));

export function CityWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const spinWindmill = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-slate-950 flex flex-col md:flex-row items-center border-b-2 border-slate-900 snap-center"
    >
      {/* Absolute Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0 bg-gradient-to-tr from-green-900 via-teal-900 to-sky-900 opacity-80"
      />

      {/* Sun/Light Source */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-yellow-400/20 blur-3xl z-0" />

      {/* LEFT HALF: Animated Environment */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10 flex items-center justify-center overflow-hidden">
        {/* Eco City Windmill Structure */}
        <motion.div
          style={{ y: y2 }}
          className="relative z-10 flex flex-col items-center mt-20"
        >
          {/* Windmill Blades */}
          <motion.div
            style={{ rotate: spinWindmill }}
            className="absolute -top-32 w-4 h-4 rounded-full bg-white z-20 shadow-[0_0_10px_white]"
          >
            <div className="absolute top-1/2 right-full -translate-y-1/2 w-32 h-4 bg-white/90 rounded-l-full origin-right" />
            <div className="absolute top-1/2 left-full -translate-y-1/2 w-32 h-4 bg-white/90 rounded-r-full origin-left" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-4 h-32 bg-white/90 rounded-t-full origin-bottom" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-32 bg-white/90 rounded-b-full origin-top" />
            <div className="absolute inset-0 m-auto w-6 h-6 -ml-1 -mt-1 bg-yellow-300 rounded-full border-2 border-white" />
          </motion.div>

          {/* Windmill Tower (Lego Base) */}
          <div className="w-12 h-64 bg-slate-200 border-x-4 border-slate-300 relative flex flex-col items-center shadow-lg">
            <div className="absolute top-0 w-16 h-4 bg-slate-300 -translate-x-2" />
            <div className="w-full h-1/3 border-b-2 border-slate-300 flex justify-center pt-2">
              <div className="w-4 h-6 bg-slate-400/50" />
            </div>
            <div className="w-full h-1/3 border-b-2 border-slate-300 flex justify-center pt-2">
              <div className="w-4 h-6 bg-slate-400/50" />
            </div>
          </div>

          {/* Greenery / Eco Base */}
          <div className="absolute bottom-0 w-96 h-24 bg-green-500 border-t-8 border-green-600 rounded-t-3xl shadow-[0_-10px_20px_rgba(34,197,94,0.3)] flex justify-between px-8 pt-4">
            {/* Small lego plants */}
            <div className="w-8 h-12 bg-green-400 rounded-t-full border-2 border-green-600" />
            <div className="w-12 h-16 bg-green-400 rounded-t-full border-2 border-green-600" />
            <div className="w-10 h-10 bg-green-400 rounded-t-full border-2 border-green-600" />
          </div>
        </motion.div>

        {/* Floating Leaves/Bricks */}
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: particle.yAnim, // falling/floating down
              x: particle.xAnim,
              rotate: particle.rotateAnim,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute w-4 h-6 rounded-b-full rounded-tr-full shadow-lg z-20 will-change-transform",
              particle.bgClass
            )}
            style={{
              left: particle.left,
              top: particle.top,
              scale: particle.scale,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* RIGHT HALF: Content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full z-10 flex flex-col justify-center px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-sm bg-neon-green text-black font-display text-sm uppercase tracking-widest box-neon shadow-[4px_4px_0_#000]">
            Lego City
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-wider leading-none text-lego-heading shadow-layer-zinc">
            Tech for
            <br />
            <span className="text-white text-lego-heading shadow-layer-green mt-1 inline-block">Sustainability</span>
          </h2>

          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-lg border-l-4 border-neon-green pl-6">
            Hey! Build a better, greener city. From waste management to
            renewable energy distribution networks, construct solutions that
            ensure a sustainable future for everyone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
