"use client";

import { BatmanWorld } from "./worlds/BatmanWorld";
import { NinjagoWorld } from "./worlds/NinjagoWorld";
import { SocialCauseWorld } from "./worlds/SocialCauseWorld";
import { SustainabilityWorld } from "./worlds/SustainabilityWorld";

export function DomainsSection() {
  return (
    <section id="domains" className="w-full relative z-10 flex flex-col">
      <BatmanWorld />
      <NinjagoWorld />
      <SocialCauseWorld />
      <SustainabilityWorld />
    </section>
  );
}
