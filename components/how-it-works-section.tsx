"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Brain, BarChart3, ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".step-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 200)
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

  const steps = [
    {
      icon: Mic,
      title: "Record Your Practice",
      description: "Use the SpeakSmart app to record yourself practicing your presentation or speech.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your speech, body language, posture, and other subtle cues.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Get Detailed Feedback",
      description: "Receive comprehensive analytics and actionable tips to improve your presentation skills.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            SpeakSmart uses advanced AI to analyze your presentations and provide actionable feedback in just three
            simple steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="step-card opacity-0 translate-y-8">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-3xl font-bold text-slate-600">0{index + 1}</span>
                          <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Phone Mockups */}
          <div className="flex justify-center space-x-8">
            <div className="step-card opacity-0 translate-y-8">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 hover:scale-105 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 mb-6 aspect-[9/16] w-64 relative overflow-hidden">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-slate-700 rounded-full"></div>
                    <div className="flex-1 flex items-center justify-center h-full">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                          <div className="w-8 h-8 bg-white rounded-full"></div>
                        </div>
                        <div className="absolute -inset-4 border-2 border-blue-500/50 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white text-lg mb-2">Record Video</h4>
                    <p className="text-sm text-slate-400">Capture your presentation with your phone's camera</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="step-card opacity-0 translate-y-8">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 hover:scale-105 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 mb-6 aspect-[9/16] w-64">
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-slate-700 rounded-full"></div>
                    <div className="mt-8 space-y-4">
                      <div className="h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl animate-pulse"></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 bg-slate-700 rounded-lg animate-pulse"></div>
                        <div className="h-16 bg-slate-700 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-3 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-slate-700 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-white text-lg mb-2">Get Analytics</h4>
                    <p className="text-sm text-slate-400">View detailed metrics on your performance</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
