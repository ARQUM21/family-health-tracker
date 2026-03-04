import { HeartPulseIcon, MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#security" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Disclaimer", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="px-4 md:px-16 lg:px-24 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer mb-4 w-fit"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md">
                <HeartPulseIcon className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Health<span className="text-indigo-600">Mate</span>
              </span>
            </div>

            {/* Brand Description */}
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Your smart health companion. Upload reports, get AI-powered
              summaries, and manage your entire family's health history in one
              secure place.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:support@healthmate.pk"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition"
              >
                <MailIcon className="size-4 text-indigo-400 shrink-0" />
                support@healthmate.pk
              </a>
              <a
                href="tel:+923001234567"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition"
              >
                <PhoneIcon className="size-4 text-indigo-400 shrink-0" />
                +92 3432705821
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPinIcon className="size-4 text-indigo-400 shrink-0" />
                Karachi, Pakistan
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold text-gray-800 text-sm mb-4">
                {section.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-indigo-600 transition"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 px-4 md:px-16 lg:px-24 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-xs text-center sm:text-left">
            © 2026 HealthMate. All rights reserved. Built with in Pakistan.
          </p>

          {/* Disclaimer */}
          <p className="text-gray-400 text-xs text-center">
            AI is for understanding only — always consult your doctor.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-600 transition"
              >
                <social.icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
