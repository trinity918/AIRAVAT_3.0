"use client";

import { motion } from "framer-motion";

const sponsors = [
  { name: "TechCorp", tier: "Platinum", color: "var(--color-lego-yellow)" },
  { name: "Innovate AI", tier: "Gold", color: "var(--color-lego-blue)" },
  { name: "GreenFuture", tier: "Silver", color: "var(--color-neon-green)" },
  { name: "HealthPlus", tier: "Silver", color: "var(--color-neon-blue)" },
  { name: "DataSystems", tier: "Bronze", color: "var(--color-lego-red)" },
  { name: "CloudNet", tier: "Bronze", color: "white" },
];

export function RegistrationSection() {
  return (
    <section
      id="register"
      className="pt-24 min-h-screen flex flex-col relative z-10 bg-gradient-to-b from-black to-slate-950"
    >
      {/* Sponsors Top Half */}
      <div className="flex-1 max-w-5xl mx-auto px-6 w-full flex flex-col justify-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-300 uppercase tracking-wider mb-4">
            Master Builders
          </h2>
          <p className="text-slate-500 font-light">
            Supported by the best in the universe.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-8 py-4 rounded-lg border flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-md hover:bg-slate-800 transition-colors"
              style={{ borderColor: sponsor.color }}
            >
              {/* Lego Stud decorations */}
              <div className="flex gap-2 mb-3">
                <div
                  className="w-4 h-4 rounded-full border border-current opacity-30 shadow-inner"
                  style={{ borderColor: sponsor.color }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full border border-current opacity-30 shadow-inner"
                  style={{ borderColor: sponsor.color }}
                ></div>
              </div>

              <span
                className="text-xl font-display font-bold truncate"
                style={{ color: sponsor.color }}
              >
                {sponsor.name}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-500 mt-1">
                {sponsor.tier} Partner
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Bottom Half */}
      <div className="flex-1 w-full bg-slate-900/80 border-t border-slate-800 relative overflow-hidden backdrop-blur-xl flex flex-col justify-center py-16">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50 shadow-[0_0_30px_var(--color-neon-pink)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-neon-pink/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider box-neon-pink text-neon-pink inline-block">
              Secure Your Slot
            </h2>
            <p className="text-lg text-slate-300 mb-10 font-light">
              Limited spots available. Construct your team and register now.
            </p>

            <form
              className="space-y-4 max-w-md mx-auto text-left"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-sm font-mono text-slate-400 mb-1 uppercase tracking-wider">
                  Team Name
                </label>
                <input
                  type="text"
                  className="w-full bg-black border border-slate-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_var(--color-neon-pink)] transition-all font-mono"
                  placeholder="e.g. Block Builders"
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-slate-400 mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-black border border-slate-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_var(--color-neon-blue)] transition-all font-mono"
                  placeholder="hello@example.com"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-4 bg-transparent border-2 border-neon-pink text-neon-pink font-display uppercase tracking-widest text-lg rounded-md hover:bg-neon-pink hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,234,0.3)] hover:shadow-[0_0_30px_rgba(255,0,234,0.6)]"
              >
                Join Hackathon
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-slate-600 text-sm font-mono">
          &copy; {new Date().getFullYear()} Lego Universe Hackathon. Built block
          by block.
        </div>
      </div>
    </section>
  );
}
