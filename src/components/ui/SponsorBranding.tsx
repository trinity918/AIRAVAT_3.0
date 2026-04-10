import Image from "next/image";
import { cn } from "@/lib/utils";

interface SponsorBrandingProps {
  placement: "hero" | "footer";
  className?: string;
}

export function SponsorBranding({ placement, className }: SponsorBrandingProps) {
  const isHero = placement === "hero";
  
  return (
    <div className={cn("flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300", className)}>
      <span className={cn(
        "uppercase tracking-wider font-mono text-neon-blue mb-2", 
        isHero ? "text-xs md:text-sm" : "text-sm md:text-base font-bold"
      )}>
        {isHero ? "Sponsored by" : "Our Sponsor"}
      </span>
      <a 
        href="https://featherless.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src="/featherless-full-dark.svg"
          alt="Featherless AI Logo"
          width={isHero ? 200 : 250}
          height={isHero ? 50 : 70}
          className={cn(
            "object-contain w-auto",
            isHero ? "max-h-[40px] md:max-h-[50px]" : "max-h-[50px] md:max-h-[70px]"
          )}
        />
      </a>
    </div>
  );
}
