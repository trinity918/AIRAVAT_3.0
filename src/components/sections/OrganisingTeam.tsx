"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function OrganisingTeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const characters = [
    {
      name: "obi_wan",
      src: "/lego_chars/obi_wan.png",
      pos: "top-[2%] left-[2%] md:top-[5%] md:left-[2%]",
      rotate: 15,
      delay: 0.1,
      align: "top-left",
    },
    {
      name: "darth_vader",
      src: "/lego_chars/darth_vader.png",
      pos: "top-[2%] right-[2%] md:top-[5%] md:right-[2%]",
      rotate: -15,
      delay: 0.2,
      align: "top-right",
    },
    {
      name: "han_solo",
      src: "/lego_chars/han_solo.png",
      pos: "top-[40%] left-[2%] md:left-[-2%]",
      rotate: 25,
      delay: 0.3,
      align: "left",
    },
    {
      name: "bruce_wayne",
      src: "/lego_chars/bruce_wayne.png",
      pos: "top-[40%] right-[2%] md:right-[-2%]",
      rotate: -25,
      delay: 0.4,
      align: "right",
    },
    {
      name: "scout_trooper",
      src: "/lego_chars/scout_trooper.png",
      pos: "bottom-[2%] left-[5%] md:bottom-[-5%]",
      rotate: 10,
      delay: 0.5,
      align: "bottom-left",
    },
    {
      name: "r5d4",
      src: "/lego_chars/r5d4.png",
      pos: "bottom-[2%] right-[5%] md:bottom-[-5%]",
      rotate: -10,
      delay: 0.6,
      align: "bottom-right",
    },
  ].map((char, i) => ({
    ...char,
    animDuration: 3 + ((i * 17) % 2),
  }));

  const PARTICLES = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${5 + ((i * 17) % 90)}%`,
    top: `${5 + ((i * 23) % 90)}%`,
    delay: ((i * 13) % 5) * 0.1,
    yRange: [(i * 31) % 150, -((i * 37) % 150)],
    yAnimParams: [0, -((i * 41) % 40) - 10, 0],
    rotateAnimParams: [0, (i * 47) % 360, 0],
    duration: 4 + ((i * 53) % 4),
    bgClass: ["bg-[#E3000B]", "bg-[#F6D100]", "bg-[#0085C7]"][i % 3],
  }));

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
      id="organising-team"
      ref={containerRef}
      className="relative min-h-screen w-full max-w-full py-32 flex flex-col items-center justify-center overflow-hidden snap-center z-10"
    >
      {/* Dark Red/Purple Lego Brick Background Pattern */}
      <motion.div
        className="absolute inset-0 w-full h-[110%] -top-[5%] z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 15%, transparent 20%), #3a001e",
          backgroundSize: "60px 60px",
          y: bgY,
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
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
              "w-6 h-6 md:w-8 md:h-8 rounded-sm shadow-xl border-t border-white/10 will-change-transform",
              particle.bgClass
            )}
            style={{ opacity: 0.6 }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20 shadow-inner" />
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
              "absolute z-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 lg:w-48 md:h-32 lg:h-48 drop-shadow-2xl",
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
      <div className="relative z-30 max-w-6xl w-full mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* LEFT SIDE: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] border-4 border-white/10 bg-black/40"
            >
              <Image
                src="/IEEECS.JPG"
                alt="IEEE CS SPIT"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E3000B]/20 to-transparent pointer-events-none mix-blend-overlay" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Text */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 p-6 sm:p-8 md:p-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-lego-red bg-lego-red/10 text-white font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm shadow-[4px_4px_0_rgba(227,0,11,1)] font-bold">
                The Architects
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-wider mb-4 leading-[1.05] max-w-full overflow-hidden w-full whitespace-normal wrap-break-word">
                <span
                  className="text-white inline-block mb-1 text-lego-heading shadow-layer-red max-w-full wrap-break-word"
                >
                  Organising
                </span>
                <br className="md:hidden" />
                <span
                  className="text-lego-yellow inline-block mt-1 md:ml-4 text-lego-heading shadow-layer-blue max-w-full wrap-break-word"
                >
                  Team
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4 md:space-y-6 text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AIRAVAT 3.0 is proudly organised by{" "}
                <strong className="text-white font-semibold">
                  IEEE Computer Society SPIT
                </strong>{" "}
                in collaboration with the{" "}
                <strong className="text-white font-semibold">
                  Student Council of SPIT
                </strong>
                .
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our team consists of passionate students, developers, designers,
                and innovators working together to create an unforgettable
                hackathon experience. From hosting technical sessions and
                fostering a culture of innovation to organising large-scale
                events,{" "}
                <strong className="text-lego-yellow font-semibold">
                  IEEE CS SPIT continues to expand its impact within the student
                  community
                </strong>
                .
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                With AIRAVAT 3.0, the team aims to take a step further by
                organising{" "}
                <strong className="text-neon-pink font-semibold">
                  one of the largest national-level hackathons
                </strong>
                , creating a platform where builders and problem solvers can
                collaborate, experiment, and bring their ideas to life.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-medium text-white border-l-4 border-lego-blue pl-4 italic"
              >
                Supported by dedicated volunteers and team leads, the organising
                team works to ensure that AIRAVAT runs smoothly while delivering
                an inspiring and engaging environment for every participant.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
