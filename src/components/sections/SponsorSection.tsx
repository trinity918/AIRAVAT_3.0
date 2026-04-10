import { SponsorBranding } from "../ui/SponsorBranding";

export function SponsorSection() {
  return (
    <section className="w-full py-12 flex flex-col items-center justify-center bg-black/40 border-t border-white/5 relative z-20">
      <div className="container mx-auto px-4 flex justify-center">
        <SponsorBranding placement="footer" />
      </div>
    </section>
  );
}
