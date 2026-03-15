"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "domains", label: "Domains" },
  { id: "about", label: "About" },
  { id: "organising-team", label: "Organising Team" },
  { id: "contact", label: "Contact" },
];

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    300,
  );

  // Close mobile menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 md:h-20 z-50 flex items-center justify-between px-6 md:justify-center border-b border-white/10 bg-black/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 w-full max-w-full">
        
        {/* Mobile Logo / Brand (Visible only on mobile) */}
        <div className="md:hidden font-display font-black text-xl tracking-wider text-white">
          <span className="text-lego-yellow">AIRAVAT</span> 3.0
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-row gap-8 md:gap-16 items-center justify-center w-full max-w-4xl px-4 md:px-12 mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative group">
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative px-4 py-2 font-display text-base tracking-widest uppercase transition-all duration-300",
                    isActive ? "text-white text-shadow-glow" : "text-white/60 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-neon-blue transition-all duration-300",
                      isActive ? "w-full shadow-[0_0_10px_var(--color-neon-blue)]" : "w-0 group-hover:w-1/2 group-hover:bg-white/40"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "opacity-0" : "")} />
          <span className={cn("block w-6 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-16 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.li 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-2xl font-display uppercase tracking-widest",
                        isActive ? "text-neon-blue font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" : "text-white/70"
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
