import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Coffee, Mail, Phone, MapPin, Chrome, Award, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-stone-900 text-white pt-8 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Coffee size={28} className="text-accent" />
              <span className="font-playfair font-bold text-2xl">Chocodew</span>
            </div>
            <p className="text-stone-300 text-sm">
              Premium beverage vending solutions by Marine International, Ludhiana.
            </p>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-accent" />
              <span className="text-sm font-medium">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" asChild className="rounded-full text-stone-300 hover:text-white hover:bg-stone-800">
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full text-stone-300 hover:text-white hover:bg-stone-800">
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full text-stone-300 hover:text-white hover:bg-stone-800">
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full text-stone-300 hover:text-white hover:bg-stone-800">
                <Link href="https://twitter.com" aria-label="Twitter">
                  <Twitter size={18} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links & Products - Side by side on mobile */}
          <div className="space-y-2">
            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-4">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Premix Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-4">Our Products</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/products?tab=machines" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Vending Machines
                </Link>
              </li>
              <li>
                <Link href="/products?tab=premixes" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Premixes
                </Link>
              </li>
              <li>
                <Link href="/products?tab=dispensers" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Water Dispensers
                </Link>
              </li>
              <li>
                <Link href="/products?tab=chocolates" className="text-sm text-stone-300 hover:text-accent transition-colors">
                  Chocolates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-2">
            <h3 className="font-bold text-base md:text-lg mb-2 md:mb-4">Get In Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-accent" />
                <span className="text-sm text-stone-300">
                  Marine International, Ludhiana, Punjab, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0 text-accent" />
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-sm text-stone-300 hover:text-accent transition-colors">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-accent" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="text-sm text-stone-300 hover:text-accent transition-colors">
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </li>
              <li className="flex items-center">
                <Chrome size={16} className="mr-2 flex-shrink-0 text-accent" />
                <a href={process.env.NEXT_PUBLIC_SITE_URL} className="text-sm text-stone-300 hover:text-accent transition-colors">
                  chocodew.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 md:my-8 bg-stone-700" />

        <div className="text-center text-stone-400 text-xs md:text-sm">
          <p>© {currentYear} Chocodew by Marine International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}