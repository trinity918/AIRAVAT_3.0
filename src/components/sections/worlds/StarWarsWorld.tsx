"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StarWarsWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black flex flex-col md:flex-row items-center border-b-2 border-slate-900 snap-center"
    >
      {/* Absolute Background Parallax Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,#000000,#0a0a2a)] opacity-100"
      >
        {/* Stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
            }}
          />
        ))}
        {/* Glow / Planet */}
        <div className="absolute top-20 right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />
      </motion.div>

      {/* LEFT HALF: Animated Environment */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10 flex items-center justify-center overflow-hidden">
        {/* Lightsaber Glow Animations */}
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            filter: ["blur(10px)", "blur(15px)", "blur(10px)"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -rotate-45 w-[600px] h-4 bg-neon-blue top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 shadow-[0_0_50px_#00f3ff,0_0_100px_#00f3ff] z-0 rounded-full"
        />

        <motion.div
          animate={{
            opacity: [0.5, 0.9, 0.5],
            filter: ["blur(10px)", "blur(15px)", "blur(10px)"],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rotate-45 w-[500px] h-4 bg-lego-red top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 shadow-[0_0_50px_#e3000b,0_0_100px_#e3000b] z-0 rounded-full"
        />

        {/* Abstract Space Base (Lego) */}
        <motion.div
          style={{ y: y2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-64 h-32 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />

            {/* Central glowing core */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-neon-blue border-4 border-slate-700 shadow-[0_0_30px_#00f3ff] z-10 flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-white blur-sm" />
            </motion.div>

            {/* Panels */}
            <div className="absolute left-4 top-4 w-12 h-24 bg-slate-900 border border-slate-600 flex flex-col gap-2 p-2">
              <div className="w-full h-2 bg-lego-red/80" />
              <div className="w-full h-2 bg-slate-700" />
              <div className="w-full h-2 bg-slate-700" />
            </div>
            <div className="absolute right-4 top-4 w-12 h-24 bg-slate-900 border border-slate-600 flex flex-col gap-2 p-2">
              <div className="w-full h-2 bg-neon-blue/80" />
              <div className="w-full h-2 bg-lego-yellow/80" />
            </div>
          </div>
        </motion.div>

        {/* Floating Space Lego Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, Math.random() * -50 - 20, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className={cn(
              "absolute w-6 h-6 rounded-sm border opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20",
              ["bg-slate-700", "bg-slate-500", "bg-slate-800"][
                Math.floor(Math.random() * 3)
              ],
            )}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              scale: 0.3 + Math.random() * 0.7,
            }}
          >
            <div className="absolute inset-[2px] rounded-sm border border-white/10" />
          </motion.div>
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
          <div className="inline-block px-4 py-1.5 mb-6 rounded-sm bg-lego-yellow text-black font-display text-sm uppercase tracking-widest shadow-[4px_4px_0_#000]">
            Lego Star Wars
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-wider leading-none">
            Tech for
            <br />
            <span className="text-neon-blue text-neon">Social Cause</span>
          </h2>

          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-lg border-l-4 border-neon-blue pl-6">
            Use the Force for good. Create platforms that rebel against social
            injustice, connect communities, and bring balance to the galaxy.
            Every block you lay brings us closer to peace.
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
