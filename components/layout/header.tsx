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
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={cn(
        "container mx-auto px-4 flex items-center justify-between",
        isScrolled && "max-w-7xl mx-auto"
      )}>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isScrolled ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 px-0 hover:bg-transparent group"
            onClick={() => handleNavigation("/")}
          >
            <Coffee 
              size={32} 
              className="text-primary transition-transform duration-300 group-hover:scale-110" 
            />
            <span className="font-playfair font-bold text-2xl">Chocodew</span>
          </Button>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative hover:scale-105",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              {item.name}
              {pathname === item.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary mx-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Button>
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
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start px-4 py-3 rounded-md text-sm font-medium w-full transition-all duration-300",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}