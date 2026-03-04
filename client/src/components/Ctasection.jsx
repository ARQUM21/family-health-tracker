import { ArrowRightIcon, HeartPulseIcon, ShieldCheckIcon, BrainCircuitIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 px-4 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 rounded-3xl px-6 py-14 sm:px-12 sm:py-16 overflow-hidden text-center">
          {/* Background Decorative Blobs */}
          <div className="absolute top-[-60px] right-[-60px] w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-[-80px] left-[-60px] w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-[40%] left-[30%] w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mx-auto mb-6">
            <HeartPulseIcon className="size-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight mb-4">
            Your Family's Health is{" "}
            <span className="text-indigo-200">in Good Hands</span>
          </h2>

          {/* Subtext */}
          <p className="relative z-10 text-indigo-200 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Create your free account today, upload your first report and let AI
            do the hard work. No credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white hover:bg-indigo-50 text-indigo-600 font-semibold text-sm px-8 py-3.5 rounded-full transition shadow-lg active:scale-95"
            >
              Get Started For Free
              <ArrowRightIcon className="size-4" />
            </button>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 w-full sm:w-auto border border-white/30 hover:border-white/60 text-white font-medium text-sm px-8 py-3.5 rounded-full transition active:scale-95"
            >
              Explore Features
            </a>
          </div>

          {/* Trust Note */}
          <p className="relative z-10 text-indigo-300 text-xs mt-6">
            AI is for understanding only — always consult your doctor for
            medical advice.
          </p>
        </div>

        {/* Bottom Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { icon: ShieldCheckIcon, text: "100% Secure" },
            { icon: BrainCircuitIcon, text: "AI Powered" },
            { icon: UsersIcon, text: "Family Friendly" },
            { icon: HeartPulseIcon, text: "Always Free" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-sm font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-600 transition"
            >
              <item.icon className="size-4 text-indigo-500 shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
