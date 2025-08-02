import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import HowItWorksSection from "@/components/how-it-works-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
