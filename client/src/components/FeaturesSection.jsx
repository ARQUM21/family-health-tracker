import { UploadIcon, BrainCircuitIcon, UsersIcon, ActivityIcon, ClockIcon, ShieldCheckIcon,} from "lucide-react";

const features = [
  {
    icon: UploadIcon,
    title: "Easy Report Upload",
    desc: "Upload any medical report — PDF or image. Google Gemini AI reads and analyzes it instantly without any extra steps.",
  },
  {
    icon: BrainCircuitIcon,
    title: "AI-Powered Analysis",
    desc: "Gemini highlights abnormal values and explains your report in simple English and Urdu so anyone can understand.",
  },
  {
    icon: UsersIcon,
    title: "Family Members",
    desc: "Add all your family members — Mom, Dad, siblings. Every member gets their own personal health dashboard.",
  },
  {
    icon: ActivityIcon,
    title: "Vitals Tracking",
    desc: "Track BP, Sugar, Weight and more without uploading a report. Log daily readings and monitor trends over time.",
  },
  {
    icon: ClockIcon,
    title: "Health Timeline",
    desc: "All reports and vitals sorted by date in one timeline. Share your complete health history with your doctor in seconds.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Private",
    desc: "JWT authentication, encrypted data and signed URLs ensure your health data stays completely private and safe.",
  },
];


export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 sm:py-24 px-4 md:px-16 lg:px-24 bg-white"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-4">
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
          Everything You Need in{" "}
          <span className="bg-gradient-to-b from-indigo-400 to-indigo-700 bg-clip-text text-transparent">
            One App
          </span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg text-sm sm:text-base leading-relaxed">
          HealthMate gives your family a complete health management system —
          powered by AI and built for simplicity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center mb-5 transition-colors duration-300">
              <feature.icon className="size-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div className="mt-14 max-w-4xl mx-auto bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-1">
            Ready to take control of your health?
          </h4>
          <p className="text-sm text-gray-500">
            Join thousands of families already using HealthMate — completely
            free to get started.
          </p>
        </div>
        <a
          href="/login"
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-7 py-3 rounded-full transition shadow-md shadow-indigo-200 active:scale-95"
        >
          Get Started Free
        </a>
      </div>
    </section>
  );
}
