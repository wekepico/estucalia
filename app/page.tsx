import HeroSection from './components/HeroSection';
import CompanyInfo from './components/CompanyInfo';
import SpacesSection from './components/SpacesSection';
import FinishesSection from './components/FinishesSection';
import InspirationSection from './components/InspirationSection';
import NewsSection from './components/NewsSection';
import ProjectHelp from './components/ProjectHelp';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CompanyInfo />
      <SpacesSection />
      <FinishesSection />
      <InspirationSection />
      <NewsSection />
      <ProjectHelp />
    </main>
  );
}