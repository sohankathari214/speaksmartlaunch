import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in-up">
            <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium">
              Coming Soon
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8 leading-tight">
              Advanced Posture Analysis
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Stay tuned for our revolutionary posture analysis tool that will
              transform how you understand and improve your presentation body
              language.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                How It Will Work
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Our revolutionary posture analysis system combines cutting-edge
                technology with expert knowledge
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-start gap-8 p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Full-Body Motion Tracking
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Our advanced computer vision algorithms analyze every frame
                    of your speech, tracking movement patterns across all major
                    joints and limbs to create a comprehensive understanding of
                    your body language dynamics.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8 p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Intelligent Frame Selection
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Using our proprietary algorithm, the system identifies the
                    most relevant and impactful moments in your presentation
                    based on motion dynamics and posture shifts, focusing
                    analysis where it matters most.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8 p-8 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Expert-Backed Feedback
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Receive detailed insights about your posture shifts and body
                    language, with targeted feedback based on years of public
                    speaking experience to help you become a more confident and
                    effective presenter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why This Changes Everything
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Traditional feedback focuses only on what you say. We analyze
                how you move.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Objective Body Language Analysis
                    </h4>
                    <p className="text-slate-400">
                      Get unbiased insights into your posture and movement
                      patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Targeted Improvement Areas
                    </h4>
                    <p className="text-slate-400">
                      Focus on specific moments that impact your presentation
                      effectiveness
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Expert-Level Coaching
                    </h4>
                    <p className="text-slate-400">
                      Benefit from years of public speaking expertise built into
                      our algorithm
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Comprehensive Motion Tracking
                    </h4>
                    <p className="text-slate-400">
                      Full-body analysis goes beyond facial expressions and
                      gestures
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Instant Visual Feedback
                    </h4>
                    <p className="text-slate-400">
                      See exactly which moments and movements need improvement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Proprietary Technology
                    </h4>
                    <p className="text-slate-400">
                      Cutting-edge algorithms designed specifically for
                      presentation analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Development Status */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-blue-400" />
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 text-lg font-medium">
                  In Development
                </Badge>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Revolutionary Technology in Progress
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                This product is currently in development. Our team is working
                tirelessly to bring you the most advanced posture analysis tool
                for public speaking improvement.
              </p>
              <div className="flex justify-center">
                <Link href="/analyze">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105">
                    Try Current Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
