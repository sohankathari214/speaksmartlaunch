"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".testimonial-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Dr. Wee Kek Tan",
      role: "Professor at University of Singapore",
      content:
        "SpeakSmart has transformed the way my students practice public speaking — I've seen quieter voices grow bolder with every session.",
      initials: "WKT",
      rating: 5,
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      name: "Dr. Mandhir Suri",
      role: "Neonatologist at Mary Birch Children's Hospital",
      content:
        "As a neonatologist, I've seen firsthand how SpeakSmart helps young patients' families find their voice — it's a powerful tool for building confidence in even the most stressful conversations.",
      initials: "MS",
      rating: 5,
      gradient: "from-amber-500 to-yellow-500",
    },
  ]

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 px-6 bg-slate-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Hear from people who have transformed their public speaking skills with SpeakSmart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card opacity-0 translate-y-8">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback
                        className={`bg-gradient-to-r ${testimonial.gradient} text-white font-semibold text-lg`}
                      >
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <Quote className="w-8 h-8 text-slate-600 group-hover:text-slate-500 transition-colors" />
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-300 italic mb-6 flex-1 leading-relaxed">"{testimonial.content}"</p>

                  <div>
                    <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
