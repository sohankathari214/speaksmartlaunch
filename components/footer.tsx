import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 block"
            >
              SpeakSmart
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              Transform your presentation skills with AI-powered feedback and become a confident, compelling speaker.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/about#testimonials" className="text-slate-400 hover:text-white transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/analyze" className="text-slate-400 hover:text-white transition-colors">
                    Analyze
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about#contact" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-slate-400 mb-4 text-sm">Have questions or feedback? We'd love to hear from you!</p>
            <div className="space-y-2">
              <p className="text-slate-300">
                <a href="mailto:hello@speaksmart.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
                  hello@speaksmart.ai
                </a>
              </p>
              <p className="text-slate-400 text-sm">Flower Mound, TX</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2025 SpeakSmart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
