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
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h1 className="font-playfair text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 animate-appear">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto sm:text-xl animate-appear opacity-0 delay-200">
            We would love to hear from you! Get in touch with our team for any inquiries 
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