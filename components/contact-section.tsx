import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram, MapPin } from "lucide-react";

const founders = [
  {
    name: "Sohan Kathari",
    role: "Co-Founder & Developer",
    email: "sohank.kathari@gmail.com",
    instagram: "@sohank214",
  },
  {
    name: "Harnek Sabharwal",
    role: "Co-Founder & Marketing",
    email: "harneksab@gmail.com",
    instagram: "@harnek_sab",
  },
];

export default function ContactSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-slate-400">
            Ready to transform your speaking skills? Reach out to our founders
            directly.
          </p>
        </div>

        {/* Founder Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {founders.map((founder) => (
            <Card
              key={founder.name}
              className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-blue-400 mb-6">{founder.role}</p>
                <div className="space-y-4">
                  <a
                    href={`mailto:${founder.email}`}
                    className="flex items-center justify-center space-x-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    <span>{founder.email}</span>
                  </a>
                  <a
                    href={`https://instagram.com/${founder.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
                    <span>{founder.instagram}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Contact Info */}
        <div className="text-center max-w-2xl mx-auto">
          <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                General Inquiries
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a
                    href="mailto:support@speaksmart.live"
                    className="hover:text-white transition-colors"
                  >
                    support@speaksmart.live
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span>Flower Mound, Texas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
