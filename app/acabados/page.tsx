import { HeroSection } from "../components/acabados/HeroSection";
import InspirationFinishedSection from "../components/acabados/InspirationFinishedSection";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";
import NewsSection from "../components/home/NewsSection";


export default function Acabados() {
  return (
    <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
      <HeroSection />
      <InspirationFinishedSection/>
      <NewsSection/>
      <ProjectHelpSection/>
    </main>
  );
}