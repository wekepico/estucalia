import HeroSection from '../components/blog/HeroSection';
import NewsGrid from '../components/blog/NewsGrid';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-32">
      <HeroSection />
      <NewsGrid />
    </main>
  );
}