"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHANNELS = [
  { icon: Phone, label: "+91 98763 33111", href: "tel:+919876333111" },
  {
    icon: MessageCircle,
    label: "WhatsApp us",
    href: "https://wa.me/919876333111",
    external: true,
  },
  { icon: Mail, label: "chocodew@gmail.com", href: "mailto:chocodew@gmail.com" },
];

export function ContactHero() {
  return (
    <div className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
      {/* warm themed backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 42% at 50% 12%, rgba(197,138,78,0.28) 0%, rgba(197,138,78,0) 70%), radial-gradient(70% 45% at 50% 108%, rgba(197,138,78,0.18) 0%, rgba(197,138,78,0) 70%)",
        }}
      />
      {/* fine lamp line, echoing the About hero */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0.3, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="absolute inset-x-0 top-[104px] mx-auto h-px w-[min(78vw,42rem)] bg-gradient-to-r from-transparent via-[#a56a35] to-transparent md:top-[128px]"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-xs font-medium uppercase tracking-[0.24em] text-accent md:text-sm"
        >
          We&rsquo;d love to hear from you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          className="mt-5 font-playfair text-5xl font-bold leading-[1.02] text-primary sm:text-6xl md:text-7xl"
        >
          Contact <span className="italic text-accent">Us</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
        >
          Machines for a new office, premix supply or a live demo. One message
          and the kettle&rsquo;s on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.26, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-white/70 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <Icon
                  className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
                {c.label}
              </a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
