import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Features from './sections/Features';
import Vision from './sections/Vision';
import CTA from './sections/CTA';

export default function App() {
  return (
    <div className="min-h-screen bg-warm-white text-ink">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Vision />
        <CTA />
      </main>
    </div>
  );
}
