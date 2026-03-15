"use client";

import { TopNav } from "./TopNav";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-neon-pink/30 selection:text-white relative w-full max-w-[100vw]">
      <TopNav />

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 w-full max-w-full overflow-hidden relative z-10">
        {children}
      </main>
    </div>
  );
}
