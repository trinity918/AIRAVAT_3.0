"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  {
    time: "Day 1 - 09:00 AM",
    title: "Registrations & Check-in",
    description: "Grab your welcome kit, badge, and first pieces of Lego.",
    color: "var(--color-lego-blue)",
  },
  {
    time: "Day 1 - 10:30 AM",
    title: "Opening Ceremony",
    description: "Kickoff! Theme reveals and keynote speakers.",
    color: "var(--color-lego-yellow)",
  },
  {
    time: "Day 1 - 12:00 PM",
    title: "Hacking Begins",
    description: "Start building your blocks. Teams assemble!",
    color: "var(--color-lego-red)",
  },
  {
    time: "Day 1 - 06:00 PM",
    title: "Mandalorian Dinner",
    description: "Refuel your energy reserves.",
    color: "var(--color-neon-blue)",
  },
  {
    time: "Day 2 - 02:00 AM",
    title: "Midnight Mini-Games",
    description: "Lego speed building competition to keep the blood flowing.",
    color: "var(--color-neon-pink)",
  },
  {
    time: "Day 2 - 08:00 AM",
    title: "Breakfast of Champions",
    description: "Pancakes and coffee. Lots of coffee.",
    color: "var(--color-lego-yellow)",
  },
  {
    time: "Day 2 - 12:00 PM",
    title: "Hacking Ends",
    description: "Pencils down! Or rather, keyboards away.",
    color: "var(--color-lego-red)",
  },
  {
    time: "Day 2 - 02:00 PM",
    title: "Judging & Demos",
    description: "Present your creations to the Master Builders (Judges).",
    color: "var(--color-neon-green)",
  },
  {
    time: "Day 2 - 05:00 PM",
    title: "Closing Ceremony",
    description: "Winners announced. Trophies awarded.",
    color: "var(--color-lego-blue)",
  },
];

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="min-h-screen py-24 flex flex-col justify-center relative z-10 bg-black/50"
    >
      <div className="max-w-4xl mx-auto px-6 w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-lego-blue mb-4 uppercase tracking-wider box-neon">
            Schedule
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Your 48-hour journey to becoming a Master Builder.
          </p>
        </motion.div>

        {/* Central Vertical Line Connection */}
        <div className="absolute left-[28px] md:left-1/2 top-48 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
          {/* Animated Progress Line */}
          <motion.div
            className="w-full bg-neon-blue shadow-[0_0_10px_var(--color-neon-blue)]"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex items-center md:justify-between w-full"
              >
                {/* Event Card (Left Side for Desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`hidden md:block w-[45%] text-right pr-8 ${isEven ? "" : "invisible"}`}
                >
                  {isEven && (
                    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm group hover:border-slate-500 transition-colors">
                      <h4
                        className="text-xl font-bold text-white font-display"
                        style={{ color: event.color }}
                      >
                        {event.title}
                      </h4>
                      <p className="text-sm text-slate-400 mt-2 font-light">
                        {event.description}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Timeline Node - Lego Stud */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10 w-14 h-14 flex items-center justify-center bg-black rounded-full border-4 border-slate-800">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.15 + 0.5,
                    }}
                    className="w-8 h-8 rounded-full border-2 border-white/20 shadow-inner relative"
                    style={{
                      backgroundColor: event.color,
                      boxShadow: `0 0 15px ${event.color}`,
                    }}
                  >
                    <div className="absolute inset-1 rounded-full border border-white/40"></div>
                  </motion.div>
                </div>

                {/* Event Card (Right Side for Desktop, Full for Mobile) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full pl-20 md:pl-0 md:w-[45%] ${!isEven ? "" : "md:hidden"}`}
                >
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm group hover:border-slate-500 transition-colors">
                    <span className="text-sm font-mono tracking-wider opacity-60 block mb-2">
                      {event.time}
                    </span>
                    <h4
                      className="text-xl font-bold font-display"
                      style={{ color: event.color }}
                    >
                      {event.title}
                    </h4>
                    <p className="text-sm text-slate-400 mt-2 font-light">
                      {event.description}
                    </p>
                  </div>
                </motion.div>

                {/* Desktop Left side Time display when block is on right */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`hidden md:block w-[45%] text-right pr-8 ${!isEven ? "" : "invisible"}`}
                >
                  {!isEven && (
                    <span className="text-xl font-mono tracking-wider text-slate-400">
                      {event.time}
                    </span>
                  )}
                </motion.div>

                {/* Desktop Right side Time display when block is on left */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`hidden md:block w-[45%] pl-8 ${isEven ? "absolute right-0" : "invisible"}`}
                >
                  {isEven && (
                    <span className="text-xl font-mono tracking-wider text-slate-400 absolute left-8 top-1/2 -translate-y-1/2">
                      {event.time}
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
