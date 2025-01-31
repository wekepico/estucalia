import VideoHero from '../components/empresa/VideoHero';
import AboutSection from '../components/empresa/AboutSection';
import ProductionSection from '../components/empresa/ProductionSection';
import SolutionsSection from '../components/empresa/SolutionsSection';
import InternationalSection from '../components/empresa/InternationalSection';
import CertificationsSection from '../components/empresa/CertificationsSection';
import ConsultingSection from '../components/empresa/ConsultingSection';
import NewsSection from '../components/empresa/NewsSection';

export default function EmpresaPage() {
  return (
    <main className="min-h-screen">
      <VideoHero />
      <AboutSection />
      <ProductionSection />
      <SolutionsSection />
      <InternationalSection />
      <CertificationsSection />
      <ConsultingSection />
      <NewsSection />
    </main>
  );
}