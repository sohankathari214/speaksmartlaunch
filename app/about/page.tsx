import Header from "@/components/header"
import Footer from "@/components/footer"
import MeetTheTeamSection from "@/components/meet-the-team-section"
import TestimonialsSection from "@/components/testimonials-section"
import PartnersSection from "@/components/partners-section"
import ContactSection from "@/components/contact-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main>
        <MeetTheTeamSection />
        <TestimonialsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
