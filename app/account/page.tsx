"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Simulate checking authentication status
  useEffect(() => {
    // This is a placeholder for authentication logic
    const isAuthenticated = false;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      
      // Redirect to home after a short delay
      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 3000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [router, toast]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              This is a protected route. You need to be authenticated to view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you were authenticated, your account details would appear here.
            </p>
            <Button className="w-full" onClick={() => router.push("/")}>
              Go Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}