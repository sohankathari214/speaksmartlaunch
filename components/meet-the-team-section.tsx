import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Target, Cpu, Mail, Instagram } from "lucide-react"

const teamMembers = [
  {
    name: "Sohan Kathari",
    role: "Co-Founder & Developer",
    initials: "SK",
    avatar: "/sohan-kathari.png",
    email: "sohank.kathari@gmail.com",
    instagram: "@sohank214",
  },
  {
    name: "Harnek Sabharwal",
    role: "Co-Founder & Marketing",
    initials: "HS",
    avatar: "/harnek-sabharwal.png",
    email: "harneksab@gmail.com",
    instagram: "@harnek_sab",
  },
]

export default function MeetTheTeamSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5"></div>
      <div className="container mx-auto relative z-10">
        {/* Mission Statement */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
            About SpeakSmart
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            SpeakSmart was founded on a simple belief: great ideas deserve to be heard. We're dedicated to empowering
            individuals everywhere to share their voice with clarity, confidence, and impact, using the power of ethical
            AI.
          </p>
        </div>

        {/* Our Values */}
        <div className="grid md:grid-cols-3 gap-12 mb-24 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-slate-400">To provide accessible, personalized coaching for public speaking.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Our Vision</h3>
            <p className="text-slate-400">A world where everyone can communicate their ideas effectively.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Our Technology</h3>
            <p className="text-slate-400">Leveraging cutting-edge AI to offer actionable, real-time feedback.</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Meet the Founders
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            We are passionate engineers dedicated to empowering confident communication through AI.
          </p>
          <div className="grid sm:grid-cols-2 gap-12 max-w-2xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-slate-700">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-slate-800 text-white font-semibold text-3xl">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-white">{member.name}</h4>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <div className="flex items-center justify-center space-x-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-white transition-colors"
                      title={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title={`Follow ${member.name} on Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
