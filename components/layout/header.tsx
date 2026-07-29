"use client";

import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Phone, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const MENU_EASE = [0.76, 0, 0.24, 1] as const;
const LINK_EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const onDarkHero = pathname === "/" && !isScrolled;
  // while the menu is open the whole chrome goes espresso-dark
  const darkChrome = mobileMenuOpen || onDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // on any route change: close the menu, release the scroll lock, and make
  // sure the new page starts at the top (the menu's overflow lock can
  // otherwise swallow Next's own scroll reset)
  useEffect(() => {
    setMobileMenuOpen(false);
    document.documentElement.style.overflow = "";
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "bg-transparent py-3"
            : isScrolled
              ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-lg py-2 after:absolute after:inset-0 after:border after:border-white/20 after:rounded-2xl after:-z-10"
              : "bg-transparent py-3"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isScrolled && !mobileMenuOpen ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="flex items-center gap-2 px-0 group -ml-12 md:-ml-16"
              onClick={() => handleNavigation("/")}
              aria-label="Chocodew home"
            >
              <Image
                src={
                  darkChrome
                    ? "/icons/chocodew-logo-white.png"
                    : "/icons/chocodew-logo-brown.png"
                }
                alt="Chocodew logo"
                width={200}
                height={25}
                className="w-[250px] h-[65px] transition-transform duration-300 group-hover:scale-110 object-fill"
                priority
              />
            </button>
          </motion.div>

          {/* Desktop nav (unchanged) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300 px-3 py-2",
                  pathname === item.href && item.href === "/" && !isScrolled
                    ? "text-white"
                    : pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.span
                    className="absolute left-3 right-3 bottom-1 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile menu button: always-visible chip, adapts to context */}
          <button
            type="button"
            className={cn(
              "md:hidden relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300",
              darkChrome
                ? "border-white/25 bg-white/10 text-white"
                : "border-primary/15 bg-white/70 text-primary shadow-sm"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="cd-grain fixed inset-0 z-40 flex flex-col overflow-hidden bg-gradient-to-b from-[#211712] to-[#312015] md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: MENU_EASE }}
          >
            {/* warm glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 60% at 80% 10%, rgba(120,78,42,0.45) 0%, transparent 60%)",
              }}
            />

            <nav
              aria-label="Mobile"
              className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-7 pt-16"
            >
              {navItems.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <div key={item.name} className="overflow-hidden">
                    <motion.button
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%", transition: { duration: 0.25, ease: MENU_EASE } }}
                      transition={{
                        duration: 0.7,
                        ease: LINK_EASE,
                        delay: 0.18 + i * 0.06,
                      }}
                      onClick={() => handleNavigation(item.href)}
                      className={cn(
                        "group flex w-full items-baseline gap-3 py-2 text-left font-playfair text-[2.4rem] font-bold leading-tight transition-colors duration-300",
                        active ? "text-[#d99e5e]" : "text-[#f1e8da]"
                      )}
                    >
                      {item.name}
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 transition-opacity duration-300",
                          active ? "text-[#d99e5e] opacity-100" : "opacity-0"
                        )}
                        strokeWidth={1.5}
                      />
                    </motion.button>
                  </div>
                );
              })}
            </nav>

            <motion.div
              className="relative z-10 border-t border-white/10 px-7 pb-10 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="mb-4 text-[0.68rem] tracking-[0.28em] text-[#c4b09a]">
                SINCE 2007 · LUDHIANA · ISO 9001:2015
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+919876333111"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm text-[#f1e8da]"
                >
                  <Phone className="h-4 w-4 text-[#d99e5e]" strokeWidth={1.75} />
                  Call
                </a>
                <a
                  href="https://wa.me/919876333111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm text-[#f1e8da]"
                >
                  <MessageCircle className="h-4 w-4 text-[#d99e5e]" strokeWidth={1.75} />
                  WhatsApp
                </a>
                <a
                  href="mailto:chocodew@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm text-[#f1e8da]"
                >
                  <Mail className="h-4 w-4 text-[#d99e5e]" strokeWidth={1.75} />
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
