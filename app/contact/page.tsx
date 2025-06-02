import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { MapSection } from "@/components/contact/map-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Chocodew for any inquiries about our products or services. We're always happy to help!",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Contact Us</h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with our team for any inquiries 
            about our products or services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-8 md:mt-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <MapSection />
      </div>
    </div>
  );
}