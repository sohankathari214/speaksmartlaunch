"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const partners = [
  {
    name: "Gradia",
    logo: "/partners/gradia.png",
    width: 200,
    height: 60,
  },
  {
    name: "Enrichify",
    logo: "/partners/enrichify.png",
    width: 250,
    height: 80,
  },
  {
    name: "AID India",
    logo: "/partners/aid-india.png",
    width: 280,
    height: 70,
  },
  {
    name: "Sharp Mary Birch Hospital",
    logo: "/partners/sharp-mary-birch.png",
    width: 300,
    height: 80,
  },
  {
    name: "Showpilot",
    logo: "/partners/showpilot.png",
    width: 180,
    height: 50,
  },
  {
    name: "National University of Singapore",
    logo: "/partners/nus.png",
    width: 280,
    height: 90,
  },
]

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const logos = entry.target.querySelectorAll(".partner-logo")
            logos.forEach((logo, index) => {
              setTimeout(() => {
                logo.classList.add("animate-fade-in-up")
              }, index * 100)
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

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-slate-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Our Partners
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Some of the amazing organizations we've had the privilege to work with in the past.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-items-center max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-logo opacity-0 translate-y-8 group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:bg-white/10 hover:border-slate-600/50 transition-all duration-300">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="max-w-full h-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "80px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
