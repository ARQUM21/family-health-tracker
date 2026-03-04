import { ArrowRightIcon, UserPlusIcon, UploadCloudIcon, BrainCircuitIcon, ActivityIcon,} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    step: "01",
    icon: UserPlusIcon,
    title: "Create Your Account",
    desc: "Sign up for free and add your family members — Mom, Dad, siblings or anyone you want to track health for.",
  },
  {
    step: "02",
    icon: UploadCloudIcon,
    title: "Upload a Report",
    desc: "Upload any lab report or prescription as a PDF or image. Google Gemini reads it directly — no extra steps needed.",
  },
  {
    step: "03",
    icon: BrainCircuitIcon,
    title: "Get AI Summary",
    desc: "Receive a simple English & Urdu explanation, abnormal value highlights, doctor questions, food advice and home remedies.",
  },
  {
    step: "04",
    icon: ActivityIcon,
    title: "Track Over Time",
    desc: "Log vitals like BP, Sugar and Weight anytime. View everything on a single timeline sorted by date.",
  },
];

export default function HowItWorksSection() {
  const navigate = useNavigate();

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 px-4 md:px-16 lg:px-24 bg-gray-50"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-4">
          How It Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
          Up and Running in{" "}
          <span className="bg-gradient-to-b from-indigo-400 to-indigo-700 bg-clip-text text-transparent">
            4 Simple Steps
          </span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg text-sm sm:text-base leading-relaxed">
          No complicated setup. No technical knowledge required. Just sign up
          and start managing your family's health today.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Left — Image */}
        <div className="relative w-full lg:w-1/2 shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-600/20">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=500&auto=format&fit=crop"
              alt="Doctor reviewing health report"
              className="w-full h-72 sm:h-96 object-cover"
            />
            {/* Overlay Card */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
              <div className="flex -space-x-3 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="u1"
                  className="size-9 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="u2"
                  className="size-9 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="u3"
                  className="size-9 rounded-full border-2 border-white object-cover"
                />
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-white bg-indigo-600 text-white text-xs font-bold">
                  1K+
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 leading-snug">
                Families managing health smarter
              </p>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hidden sm:block">
            AI Powered ✦
          </div>
        </div>

        {/* Right — Steps */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {steps.map((item, index) => (
            <div key={index} className="flex gap-4 group">
              {/* Icon + Connector Line */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 shrink-0 rounded-full bg-indigo-50 border-2 border-indigo-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 flex items-center justify-center transition-all duration-300">
                  <item.icon className="size-4 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-indigo-100 mt-2 min-h-[24px]" />
                )}
              </div>

              {/* Text Content */}
              <div className="pb-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-base font-semibold text-gray-800 mt-0.5 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* CTA Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 w-fit bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-7 py-3 rounded-full transition shadow-lg shadow-indigo-200 active:scale-95 mt-2"
          >
            Start Now — It's Free
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
