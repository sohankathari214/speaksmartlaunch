"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            SpeakSmart
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Meet the Team", href: "/about" },
              { name: "Analyze", href: "/analyze" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-white transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/analyze">
              <Button className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105">
                Analyze for Free
              </Button>
            </Link>

            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4 mt-4">
              {["Home", "Meet the Team", "Analyze"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : item === "Meet the Team" ? "/about" : "/analyze"}
                  className="text-slate-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link href="/analyze">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-full mt-4">
                  Analyze for Free
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
