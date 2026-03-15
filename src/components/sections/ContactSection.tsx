"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const characters = [
  {
    name: "yoda",
    src: "/lego_chars/yoda.png",
    pos: "top-[5%] left-[2%] md:left-[5%]",
    rotate: 15,
    delay: 0.1,
    align: "top-left",
  },
  {
    name: "bruce_wayne",
    src: "/lego_chars/bruce_wayne.png",
    pos: "top-[40%] right-[1%] md:right-[-2%]",
    rotate: -25,
    delay: 0.4,
    align: "right",
  },
  {
    name: "harry_potter",
    src: "/lego_chars/harry_potter.png",
    pos: "bottom-[2%] left-[10%] md:bottom-[-5%]",
    rotate: 10,
    delay: 0.7,
    align: "bottom-left",
  },
  {
    name: "c3po",
    src: "/lego_chars/c3po.png",
    pos: "bottom-[2%] right-[30%] md:bottom-[-10%]",
    rotate: -5,
    delay: 1.0,
    align: "bottom",
  },
].map((char, i) => ({
  ...char,
  animDuration: 3 + ((i * 17) % 2),
}));

const contacts = [
  {
    name: "Tanmay Patil",
    phone: "+91 93265 29937",
    color: "bg-lego-red",
    border: "border-[#b9000a]",
    text: "text-white",
  },
  {
    name: "Shreesh Patil",
    phone: "+91 9867469795",
    color: "bg-lego-blue",
    border: "border-[#005ca8]",
    text: "text-white",
  },
  {
    name: "Het Salot",
    phone: "+91 81041 87739",
    color: "bg-lego-yellow",
    border: "border-[#d8a700]",
    text: "text-black",
  },
];

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full max-w-full py-32 flex flex-col items-center justify-center overflow-hidden snap-center z-10"
    >
      {/* Dark Green Lego Brick Background Pattern */}
      <motion.div
        className="absolute inset-0 w-full h-[110%] -top-[5%] z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 15%, transparent 20%), #064e3b",
          backgroundSize: "60px 60px",
          y: bgY,
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      {/* Lego Characters Edges */}
      {characters.map((char, index) => {
        const initial = getInitialOffset(char.align);
        return (
          <motion.div
            key={char.name}
            className={cn(
              "absolute z-20 w-12 h-12 sm:w-20 sm:h-20 md:w-40 md:h-40 drop-shadow-2xl",
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
                sizes="(max-width: 768px) 128px, 160px"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Content Center */}
      <div className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-6 mt-10 p-6 sm:p-10 md:p-12 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-neon-green bg-neon-green/10 text-neon-green font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm box-neon">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-wider mb-4 leading-none">
            <span className="text-lego-yellow inline-block mb-1 text-lego-heading shadow-layer-green">
              Contact
            </span>
            <br className="md:hidden" />
            <span className="text-white inline-block mt-1 md:ml-4 text-lego-heading shadow-layer-blue">
              Details
            </span>
          </h2>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={cn(
                "relative flex flex-col items-center justify-center p-6 rounded-xl transition-transform hover:-translate-y-2 shadow-[0_10px_0_rgba(0,0,0,0.4)] mt-4 border-2",
                contact.color,
                contact.border,
              )}
            >
              {/* Lego Studs */}
              <div className="absolute -top-3 left-0 w-full flex justify-center gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-6 h-3 rounded-t-sm border-t-2 border-x-2 border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]",
                      contact.color,
                    )}
                  />
                ))}
              </div>
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_4px_10px_rgba(255,255,255,0.2)] pointer-events-none" />

              <h3
                className={cn(
                  "text-xl md:text-2xl font-display font-bold mb-2 text-center drop-shadow-md",
                  contact.text,
                )}
              >
                {contact.name}
              </h3>
              <p
                className={cn(
                  "font-medium tracking-wider text-center drop-shadow-sm",
                  contact.text === "text-white"
                    ? "text-slate-200"
                    : "text-slate-800",
                )}
              >
                {contact.phone}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Honorable Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-wider mb-6 leading-none">
            <span className="text-white inline-block mb-1 text-lego-heading shadow-layer-red">
              Honorable
            </span>
            <br className="sm:hidden" />
            <span className="text-white inline-block mt-1 sm:ml-4 text-lego-heading shadow-layer-blue">
              Mentions
            </span>
          </h3>

          <div className="flex flex-col items-center justify-center p-8 mt-6 max-w-xl mx-auto rounded-xl transition-transform hover:-translate-y-2 shadow-[0_10px_0_rgba(0,0,0,0.4)] relative border-2 border-[#b9000a] bg-lego-red">
            {/* Lego Studs for larger card */}
            <div className="absolute -top-3 left-0 w-full flex justify-center gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-3 rounded-t-sm border-t-2 border-x-2 border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] bg-lego-red"
                />
              ))}
            </div>
            <div className="absolute inset-0 rounded-xl shadow-[inset_0_4px_10px_rgba(255,255,255,0.2)] pointer-events-none" />

            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-lego-yellow shadow-xl">
              <Image
                src="/patil_new.png"
                alt="Shreesh Patil"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>

            <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 text-center drop-shadow-md">
              Shreesh Patil
            </h4>
            <p className="text-white/90 font-medium text-center mb-1 drop-shadow-sm">
              Vice Chairperson, IEEE Computer Society SPIT
            </p>
            <p className="text-lego-yellow font-medium italic text-center text-sm md:text-base drop-shadow-sm">
              Creator of this website
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
