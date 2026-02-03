import Audience from "@/pages/home/Audience";
import FinalCTASection from "@/pages/home/FinalCTA";
import Hero from "@/pages/home/HeroSection";
import { HowItWorksTimeline } from "@/pages/home/HowItWorksTimeline";
import PhilosophyTrustSection from "@/pages/home/PhilosophyTrust";
import Testimonials from "@/pages/home/Testimonials";
import WhyClubhouseBaseball from "@/pages/home/WhyClubhouseBaseball";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center font-sans">
      <Hero />
      <WhyClubhouseBaseball />
      <Audience />
      <HowItWorksTimeline />
      <PhilosophyTrustSection />
      <Testimonials />
      <FinalCTASection />
    </div>
  );
}
