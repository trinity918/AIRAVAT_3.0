import { useEffect, useState } from "react";

export function useScrollSpy(sections: string[], offset: number = 0) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is somewhat in viewport (e.g. at least offset px from top)
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection, offset]);

  return activeSection;
}
