import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactHero } from "@/components/contact/hero";
import { MapSection } from "@/components/contact/map-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Chocodew for any inquiries about our products or services. We're always happy to help!",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <ContactHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-4 md:mt-6">
          <ContactInfo />
          <ContactForm />
        </div>

        <MapSection />
      </div>
    </div>
  );
}