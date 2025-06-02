import { NextResponse } from "next/server";
import { z } from "zod";

// Define form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Get form data from request
    const data = await request.json();
    
    // Validate form data
    const result = contactFormSchema.safeParse(data);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, email, phone, message, company } = result.data;
    
    // This is a placeholder for actual email sending logic
    // In a real application, you would use an email service like SendGrid, Mailgun, etc.
    console.log("Contact form submission:", { name, email, phone, message, company });
    
    // Simulate a successful submission
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message! We'll get back to you shortly." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}