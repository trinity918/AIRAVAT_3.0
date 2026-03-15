"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { FloatingBricks } from "./Hero3D";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden max-w-full"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <FloatingBricks />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full border border-neon-blue bg-neon-blue/10 text-neon-blue font-mono text-xs md:text-sm uppercase tracking-wider backdrop-blur-sm box-neon">
            IEEE CS SPIT Presents
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-wider mb-4 leading-none">
            <span className="text-lego-yellow inline-block mb-1 text-lego-heading shadow-layer-red">
              AIRAVAT
            </span>
            <br />
            <span className="text-white inline-block mt-1 text-lego-heading shadow-layer-blue">
              3.0
            </span>
            <br />
            <span className="text-xl md:text-4xl text-slate-200 mt-4 md:mt-6 block tracking-widest font-bold drop-shadow-md">
              An AI Hackathon
            </span>
            <span className="text-lg md:text-2xl text-lego-yellow mt-2 md:mt-4 block tracking-widest font-bold drop-shadow-md">
              Prize Pool: ₹1,00,000
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl text-base sm:text-lg md:text-xl text-slate-300 mb-8 md:mb-10 font-light px-4 wrap-break-word"
        >
          Assemble your ideas. Build the future. Join 24 hours of intense coding
          and creative construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://unstop.com/p/airavat-30-national-24-hour-hackathon-sardar-patel-institute-of-technology-spit-mumbai-1658777?utm_campaign=site-emails&utm_medium=d2c-automated&utm_source=congratulations-your-listing-for-airavat-30-24-hour-national-ai-hackathon-is-complete"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-lego-red text-white font-display uppercase tracking-widest text-lg md:text-xl rounded-md hover:bg-red-600 transition-colors shadow-[0_4px_0_#990000,0_4px_20px_rgba(227,0,11,0.5)] active:translate-y-1 active:shadow-[0_0_0_#990000,0_0_10px_rgba(227,0,11,0.5)] flex items-center gap-2"
          >
            <div className="w-4 h-4 rounded-full border border-white/30 inner-shadow-sm flex items-center justify-center bg-lego-red/80">
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
            </div>
            Register Now
          </a>

          <a
            href="#about"
            className="px-8 py-4 bg-transparent border-2 border-slate-700 text-white font-display uppercase tracking-widest text-lg md:text-xl rounded-md hover:border-slate-500 hover:bg-white/5 transition-all flex items-center gap-2"
          >
            Explore
          </a>
        </motion.div>
      </div>

      {/* Dynamic bottom gradient to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
