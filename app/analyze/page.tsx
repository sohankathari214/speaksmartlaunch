import Header from "@/components/header";
import Footer from "@/components/footer";
import AnalyzeInterface from "@/components/analyze-interface";

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main>
        <AnalyzeInterface />
      </main>
      <Footer />
    </div>
  );
}
