"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Coffee, Menu, X } from "lucide-react";
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
        isScrolled
          ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-lg py-2 after:absolute after:inset-0 after:border after:border-white/20 after:rounded-2xl after:-z-10"
          : "bg-transparent py-5"
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
            className="flex items-center gap-2 px-0 group"
            onClick={() => handleNavigation("/")}
          >
            <Coffee 
              size={32} 
              className={cn(
                "transition-transform duration-300 group-hover:scale-110",
                pathname === '/' && !isScrolled ? "text-white" : "text-primary"
              )} 
            />
            <span className={cn(
              "font-playfair font-bold text-2xl transition-colors duration-300 group-hover:text-primary",
              pathname === '/' && !isScrolled ? "text-white" : "text-foreground"
            )}>Chocodew</span>
          </button>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={cn(
                "relative text-sm font-medium transition-colors duration-300",
                (pathname === item.href && item.href === '/' && !isScrolled) ? "text-white"
                : pathname === item.href ? "text-primary"
                : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              {item.name}
              {pathname === item.href && (
                <motion.span
                  layoutId="underline"
                  className={cn(
                    "absolute left-0 right-0 bottom-0 h-0.5",
                    (pathname === item.href && item.href === '/' && !isScrolled) ? "bg-white" : "bg-primary"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-primary/10"
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
            className="md:hidden bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-t border-white/20"
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
                      (pathname === item.href && item.href === '/' && !isScrolled) ? "text-white"
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