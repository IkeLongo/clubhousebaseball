import Audience from "@/components/pages/home/Audience";
import FinalCTASection from "@/components/pages/home/FinalCTA";
import Hero from "@/components/pages/home/HeroSection";
import { HowItWorksTimeline } from "@/components/pages/home/HowItWorksTimeline";
import PhilosophyTrustSection from "@/components/pages/home/PhilosophyTrust";
import Testimonials from "@/components/pages/home/Testimonials";
import WhyClubhouseBaseball from "@/components/pages/home/WhyClubhouseBaseball";

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
