import { HeroSection } from "../components/acabados/HeroSection";
import InspirationFinishedSection from "../components/acabados/InspirationFinishedSection";
import NewsSectionFinished from "../components/acabados/NewsSectionFinished";
import ProjectHelpSection from "../components/contacto/ProjectHelpSection";


export default function Acabados() {
  return (
    <main className="min-h-screen bg-white md:pt-28 pt-16 lg:pt-32">
      <HeroSection />
      <InspirationFinishedSection/>
      <NewsSectionFinished/>
      <ProjectHelpSection/>
    </main>
  );
}