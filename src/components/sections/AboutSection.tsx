"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const characters = [
  {
    name: "bruce_wayne",
    src: "/lego_chars/bruce_wayne.png",
    pos: "top-[5%] left-[-2%] md:left-[5%]",
    rotate: 15,
    delay: 0.1,
    align: "top-left",
  },
  {
    name: "luke_skywalker",
    src: "/lego_chars/luke_skywalker.png",
    pos: "top-[5%] right-[-2%] md:right-[5%]",
    rotate: -15,
    delay: 0.2,
    align: "top-right",
  },
  {
    name: "chewbacca",
    src: "/lego_chars/chewbacca.png",
    pos: "top-[20%] left-[-5%] md:left-[-2%]",
    rotate: 25,
    delay: 0.3,
    align: "left",
  },
  {
    name: "yoda",
    src: "/lego_chars/yoda.png",
    pos: "top-[40%] right-[-5%] md:right-[-2%]",
    rotate: -25,
    delay: 0.4,
    align: "right",
  },
  {
    name: "boba_fett",
    src: "/lego_chars/boba_fett.png",
    pos: "top-[60%] left-[-5%] md:left-[2%]",
    rotate: 20,
    delay: 0.5,
    align: "left",
  },
  {
    name: "harry_potter",
    src: "/lego_chars/harry_potter.png",
    pos: "top-[75%] right-[-5%] md:right-[2%]",
    rotate: -20,
    delay: 0.6,
    align: "right",
  },
  {
    name: "ron_weasley",
    src: "/lego_chars/ron_weasley.png",
    pos: "bottom-[-5%] left-[10%]",
    rotate: 10,
    delay: 0.7,
    align: "bottom-left",
  },
  {
    name: "darth_vader",
    src: "/lego_chars/darth_vader.png",
    pos: "bottom-[-5%] right-[10%]",
    rotate: -10,
    delay: 0.8,
    align: "bottom-right",
  },
  {
    name: "c3po",
    src: "/lego_chars/c3po.png",
    pos: "bottom-[-10%] left-[30%]",
    rotate: 5,
    delay: 0.9,
    align: "bottom",
  },
  {
    name: "r2d2",
    src: "/lego_chars/r2d2.png",
    pos: "bottom-[-10%] right-[30%]",
    rotate: -5,
    delay: 1.0,
    align: "bottom",
  },
].map((char, i) => ({
  ...char,
  animDuration: 3 + ((i * 17) % 2),
}));

// Pre-generated random values to prevent hydration mismatch and reduce re-renders
const PARTICLES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: `${10 + ((i * 17) % 80)}%`,
  top: `${10 + ((i * 23) % 80)}%`,
  delay: ((i * 13) % 5) * 0.1,
  yRange: [(i * 31) % 200, -((i * 37) % 200)],
  yAnimParams: [0, -((i * 41) % 40) - 10, 0],
  rotateAnimParams: [0, (i * 47) % 360, 0],
  duration: 4 + ((i * 53) % 4),
  bgClass: ["bg-lego-red", "bg-lego-yellow", "bg-neon-blue", "bg-neon-green"][i % 4],
}));

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Calculate slide-in offsets based on alignment
  const getInitialOffset = (align: string) => {
    if (align.includes("left"))
      return {
        x: -100,
        y: align.includes("top") ? -100 : align.includes("bottom") ? 100 : 0,
      };
    if (align.includes("right"))
      return {
        x: 100,
        y: align.includes("top") ? -100 : align.includes("bottom") ? 100 : 0,
      };
    if (align === "bottom") return { x: 0, y: 100 };
    return { x: 0, y: 0 };
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full max-w-full py-32 flex flex-col items-center justify-center overflow-hidden snap-center z-10"
    >
      {/* Dynamic Lego Brick Background Pattern */}
      <motion.div
        className="absolute inset-0 w-full h-[110%] -top-[5%] z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 15%, transparent 20%), #0D47A1",
          backgroundSize: "60px 60px",
          y: bgY,
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* Floating Particles */}
      {PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: particle.delay, duration: 1 }}
          className="absolute z-0 pointer-events-none will-change-transform"
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
              "w-8 h-8 rounded-sm shadow-xl border-t border-white/20 will-change-transform",
              particle.bgClass
            )}
          >
            <div className="flex items-center justify-center h-full">
              <div className="w-3 h-3 rounded-full bg-white/30 shadow-inner" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Lego Characters Edges */}
      {characters.map((char, index) => {
        const initial = getInitialOffset(char.align);
        return (
          <motion.div
            key={char.name}
            className={cn(
              "absolute z-20 w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 drop-shadow-2xl",
              char.pos,
            )}
            initial={{
              opacity: 0,
              x: initial.x,
              y: initial.y,
              rotate: char.rotate - 20,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: char.rotate }}
            viewport={{ once: true, margin: "100px" }}
            transition={{
              type: "spring",
              bounce: 0.5,
              duration: 1.5,
              delay: char.delay,
            }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: char.animDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full relative"
            >
              <Image
                src={char.src}
                alt={char.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 192px"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Content Center */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 w-full mt-10 p-6 sm:p-10 md:p-16 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-lego-yellow bg-lego-yellow/10 text-lego-yellow font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_rgba(246,209,0,1)] font-bold">
            Join the Build
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-6 leading-none">
            <span
              className="text-white inline-block mb-1 text-lego-heading shadow-layer-blue"
            >
              About
            </span>
            <br className="md:hidden" />
            <span
              className="text-white inline-block mt-1 md:ml-4 text-lego-heading shadow-layer-pink"
            >
              AIRAVAT 3.0
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl text-slate-200 font-light leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AIRAVAT 3.0 is a 24-hour AI hackathon hosted by IEEE CS SPIT and the
            Student Council of SPIT, bringing together innovators, builders, and
            problem solvers to create technology that makes an impact.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Inspired by the spirit of building brick by brick, this year’s theme
            invites participants to assemble ideas, connect possibilities, and
            construct solutions that matter. Over an intense 24 hours, teams
            will collaborate, experiment, and transform creative concepts into
            working prototypes.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From AI-driven financial systems to healthcare innovations,
            sustainability solutions, and technology for social good, AIRAVAT
            provides a platform for students to push boundaries and build the
            future.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-medium text-white border-l-4 border-lego-yellow pl-4"
          >
            Whether you're a developer, designer, or problem solver — AIRAVAT is
            where ideas take shape and innovation comes to life.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
