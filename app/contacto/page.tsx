import ContactForm from '../components/contacto/ContactForm';
import MapSection from '../components/contacto/MapSection';
import ProjectHelpSection from '../components/contacto/ProjectHelpSection';

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-white">
      <MapSection />
      <ContactForm />
      <ProjectHelpSection />
    </main>
  );
}