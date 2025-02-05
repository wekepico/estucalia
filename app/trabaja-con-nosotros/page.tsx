import HeroSection from '../components/trabaja-con-nosotros/HeroSection';
import ApplicationForm from '../components/trabaja-con-nosotros/ApplicationForm';
import BottomSection from '../components/trabaja-con-nosotros/BottomSection';

export default function TrabajaConNosotrosPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ApplicationForm />
      <BottomSection/>
    </main>
  );
}