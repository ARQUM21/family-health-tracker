import { StarIcon, QuoteIcon } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Malik",
    role: "Mother of 3 — Karachi",
    text: "All of my mother's diabetes reports are now in one place. No more digging through WhatsApp before doctor appointments. HealthMate has been a lifesaver for our family.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Hassan Raza",
    role: "Software Engineer — Lahore",
    text: "I used to spend 10 minutes searching for old reports before every visit. Now it takes 30 seconds. The AI summary is genuinely impressive — it explains everything clearly.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Student — Islamabad",
    text: "The Urdu explanation feature is incredible. My grandmother can now understand her own reports without needing anyone to translate. Truly a thoughtful app.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Dr. Usman Tariq",
    role: "General Physician — Rawalpindi",
    text: "I recommend HealthMate to all my patients. When they come in with their complete history already organized, it saves time and leads to much better consultations.",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    role: "Homemaker — Multan",
    text: "Managing health records for five family members used to be overwhelming. HealthMate made it completely stress free. I highly recommend it to every family.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Bilal Chaudhry",
    role: "Business Owner — Faisalabad",
    text: "The vitals tracking is what keeps me coming back. I log my BP every morning and the timeline view shows me exactly how my health is trending. Really well built.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 px-4 md:px-16 lg:px-24 bg-white"
    >

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight">
          Loved by{" "}
          <span className="bg-gradient-to-b from-indigo-400 to-indigo-700 bg-clip-text text-transparent">
            Thousands of Families
          </span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg text-sm sm:text-base leading-relaxed">
          Real people. Real families. See how HealthMate is changing the way
          people manage their health across Pakistan.
        </p>

        {/* Overall Rating */}
        <div className="flex items-center gap-3 mt-6 bg-indigo-50 border border-indigo-100 px-5 py-3 rounded-full">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="size-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            4.9 out of 5
          </span>
          <span className="text-sm text-gray-400">from 10,000+ reviews</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            
            {/* Quote Icon + Stars */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <QuoteIcon className="size-5 text-indigo-200" />
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <img
                src={t.avatar}
                alt={t.name}
                className="size-11 rounded-full object-cover shrink-0 ring-2 ring-indigo-50"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Trust Bar */}
      <div className="mt-14 max-w-4xl mx-auto flex flex-wrap justify-center gap-8 sm:gap-14">
        {[
          { value: "10K+", label: "Happy Families" },
          { value: "50K+", label: "Reports Analyzed" },
          { value: "4.9★", label: "Average Rating" },
          { value: "99%", label: "Would Recommend" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
