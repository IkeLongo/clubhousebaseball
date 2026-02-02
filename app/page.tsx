import Audience from "@/pages/home/Audience";
import Hero from "@/pages/home/HeroSection";
import HowItWorksTimeline from "@/pages/home/HowItWorks";
import WhyClubhouseBaseball from "@/pages/home/WhyClubhouseBaseball";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center font-sans">
      <Hero />
      <WhyClubhouseBaseball />
      <Audience />
      <HowItWorksTimeline />
    </div>
  );
}
