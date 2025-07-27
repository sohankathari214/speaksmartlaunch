"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-slate-300">AI-Powered Speaking Coach</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
          Master Public Speaking
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            With AI Precision
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your presentation skills with advanced AI analysis. Get real-time feedback on your speech, body
          language, and delivery to become a confident, compelling speaker.
        </p>

        <div className="flex justify-center">
          <Link href="/analyze">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              Analyze for Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
