import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              SpeakSmart
            </h3>
            <p className="text-slate-400 mb-4">
              Empowering confident communication through AI-powered speech
              analysis and personalized feedback.
            </p>
            <div className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-blue-400" />
              <a
                href="mailto:support@speaksmart.live"
                className="hover:text-blue-400 transition-colors"
              >
                support@speaksmart.live
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Meet the Team
              </Link>
              <Link
                href="/analyze"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Analyze
              </Link>
              <Link
                href="/coming-soon"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Coming Soon
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Founders</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium">Sohan Kathari</p>
                <p className="text-slate-400 text-sm mb-2">
                  Co-Founder & Developer
                </p>
                <a
                  href="mailto:sohank.kathari@gmail.com"
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  sohank.kathari@gmail.com
                </a>
              </div>
              <div>
                <p className="text-white font-medium">Harnek Sabharwal</p>
                <p className="text-slate-400 text-sm mb-2">
                  Co-Founder & Marketing
                </p>
                <a
                  href="mailto:harneksab@gmail.com"
                  className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  harneksab@gmail.com
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-start space-x-2 text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Flower Mound, Texas</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 SpeakSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
