import { BenefitsSection } from "@/components/landing-page/benefits-section";
import { FeaturesSection } from "@/components/landing-page/features-section";
import { HeroSection } from "@/components/landing-page/hero-section";
import { NewsletterSection } from "@/components/landing-page/newsletter-section";
import { TestimonialsSection } from "@/components/landing-page/testimonials-section";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex-shrink-0">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <NewsletterSection />
        <BenefitsSection />
      </div>
    </div>
  );
}
