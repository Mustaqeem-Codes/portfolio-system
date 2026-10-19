import HeroSection from "@/components/hero/HeroSection";
import CredibilityStrip from "@/components/CredibilityStrip";
import Navbar from "@/components/layout/Navbar";
import ProblemPromiseSection from "@/components/ProblemPromiseSection";
import AboutCoachSection from "@/components/AboutCoachSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <CredibilityStrip />
      <ProblemPromiseSection />
      <AboutCoachSection />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <FinalCtaSection />
      <SiteFooter />
    </main>
  );
}
