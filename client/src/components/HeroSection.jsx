import { ArrowRightIcon, ShieldCheckIcon, BrainCircuitIcon, HeartPulseIcon,StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 bg-white">
      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-indigo-100 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-indigo-200 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-purple-100 opacity-30 blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100 bg-white shadow-sm mb-8">
        <div className="flex items-center -space-x-2.5">
          <img
            className="size-7 rounded-full border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
            alt="user1"
          />
          <img
            className="size-7 rounded-full border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
            alt="user2"
          />
          <img
            className="size-7 rounded-full border-2 border-white object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
            alt="user3"
          />
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className="size-3 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        
        <p className="text-gray-600 text-xs font-medium pr-1">
          <strong>10,000+</strong> families trust HealthMate
        </p>
      </div>

      {/* Main Heading */}
      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold text-center max-w-3xl leading-tight text-gray-900 mb-5">
        Manage Your Family's{" "}
        <span className="bg-gradient-to-b from-indigo-400 to-indigo-700 bg-clip-text text-transparent">
          Health
        </span>{" "}
        the Smart Way
      </h1>

      {/* Subheading */}
      <p className="relative z-10 text-gray-500 text-center max-w-xl text-sm sm:text-base leading-relaxed mb-8 px-2">
        Upload medical reports, get AI-powered summaries in simple{" "}
        <strong>Urdu & English</strong>, and keep your entire family's health
        history in one secure place.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 mb-14 w-full max-w-sm sm:max-w-none sm:w-auto">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition shadow-lg shadow-indigo-200 active:scale-95"
        >
          <span>Get Started — It's Free!</span>
          <ArrowRightIcon className="size-4" />
        </button>
        <a
          href="#how-it-works"
          className="flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600 px-8 py-3.5 rounded-full font-medium text-sm transition bg-white active:scale-95"
        >
          See How It Works
        </a>
      </div>

      {/* Stats Row */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-12 mb-14">
        {[
          { value: "10K+", label: "Families" },
          { value: "50K+", label: "Reports Analyzed" },
          { value: "99%", label: "AI Accuracy" },
          { value: "100%", label: "Secure" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Feature Pills */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 max-w-2xl">
        {[
          { icon: BrainCircuitIcon, text: "AI-Powered Analysis" },
          { icon: ShieldCheckIcon, text: "100% Secure & Private" },
          { icon: HeartPulseIcon, text: "Vitals Tracking" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-full text-sm text-gray-600 font-medium hover:border-indigo-200 hover:text-indigo-600 transition"
          >
            <item.icon className="size-4 text-indigo-500" />
            {item.text}
          </div>
        ))}
      </div>

      {/* Powered By */}
      <div className="relative z-10 mt-14 text-center">
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest font-medium">
          Powered By
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {["Google Gemini AI", "MongoDB Atlas", "Cloudinary", "Node.js"].map(
            (brand) => (
              <span
                key={brand}
                className="text-gray-300 font-bold text-sm tracking-wide"
              >
                {brand}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
