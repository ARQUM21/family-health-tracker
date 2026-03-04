import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/Ctasection";

export default function Landing() {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
}