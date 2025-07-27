import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Instagram, MapPin, Users } from "lucide-react"

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
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Have questions, feedback, or want to partner with us? Reach out to our founders directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {founders.map((founder, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">{founder.name}</CardTitle>
                <p className="text-blue-400">{founder.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <a href={`mailto:${founder.email}`} className="text-slate-300 hover:text-white transition-colors">
                    {founder.email}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <a
                    href={`https://instagram.com/${founder.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {founder.instagram}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">General Inquiries</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 mb-4">For partnerships and collaborations</p>
              <a href="mailto:hello@speaksmart.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
                hello@speaksmart.ai
              </a>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Location</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-400 mb-4">Based in</p>
              <p className="text-white">Flower Mound, TX</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
