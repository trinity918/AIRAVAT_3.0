import { MainLayout } from "@/components/layout/MainLayout";
import { AboutSection } from "@/components/sections/AboutSection";
import { DomainsSection } from "@/components/sections/DomainsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { OrganisingTeamSection } from "@/components/sections/OrganisingTeam";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <DomainsSection />
      <AboutSection />
      <OrganisingTeamSection />
      <ContactSection />
    </MainLayout>
  );
}
