"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const activeScrolled = isScrolled || mobileMenuOpen;
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        activeScrolled
          ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-lg py-2 after:absolute after:inset-0 after:border after:border-white/20 after:rounded-2xl after:-z-10"
          : "bg-transparent py-3"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cn(
        "container mx-auto px-4 flex items-center justify-between max-w-7xl"
      )}>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isScrolled ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            className="flex items-center gap-2 px-0 group -ml-12 md:-ml-16"
            onClick={() => handleNavigation("/")}
          >
            <Image
              src={pathname === '/' && !activeScrolled ? "/icons/chocodew-logo-white.png" : "/icons/chocodew-logo-brown.png"}
              alt="Chocodew logo"
              width={200}
              height={25}
              className={cn("w-[250px] h-[60px] transition-transform duration-300 group-hover:scale-110 object-fill", isScrolled ? "" : "")}
              priority
            />
          </button>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "relative text-sm font-medium transition-colors duration-300 px-3 py-2",
                (pathname === item.href && item.href === '/' && !activeScrolled) ? "text-white"
                : pathname === item.href ? "text-primary font-semibold"
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

        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden hover:bg-primary/10", activeScrolled ? "text-foreground" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </Button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "md:hidden border-t border-white/20 backdrop-blur-xl",
              activeScrolled ? "bg-white/80 dark:bg-stone-900/80" : "bg-transparent"
            )}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-300",
                      (pathname === item.href && item.href === '/' && !activeScrolled) ? "text-white"
                      : pathname === item.href ? "text-primary"
                      : "text-foreground hover:text-primary"
                    )}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}