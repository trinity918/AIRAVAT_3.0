"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Layer 3: Floating Lego Bricks */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.random() * 0.5, duration: 1 }}
            className="absolute z-0"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              y: useTransform(
                scrollYProgress,
                [0, 1],
                [Math.random() * 100, Math.random() * -100],
              ),
            }}
          >
            <motion.div
              animate={{
                y: [0, Math.random() * -30 - 10, 0],
                rotate: [0, Math.random() * 360, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={cn(
                "w-6 h-6 rounded-sm shadow-xl border-t border-white/20",
                [
                  "bg-pink-300",
                  "bg-pink-400",
                  "bg-pink-500",
                  "bg-white",
                  "bg-purple-400",
                ][Math.floor(Math.random() * 5)],
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

          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none max-w-full whitespace-normal wrap-break-word">
            <span
              className="text-white block mb-1 max-w-full wrap-break-word"
              style={{ textShadow: "4px 4px 0px #000, 8px 8px 0px #C71585" }}
            >
              AI for
            </span>
            <span
              className="text-pink-200 block mt-1 max-w-full wrap-break-word"
              style={{ textShadow: "4px 4px 0px #000, 8px 8px 0px #db2777" }}
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
