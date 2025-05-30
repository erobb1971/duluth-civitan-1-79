
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Simplified redirect logic - only redirect if user is authenticated and not loading
  useEffect(() => {
    console.log("Login useEffect - Auth state:", { 
      user: !!user, 
      loading, 
      userEmail: user?.email 
    });
    
    // Only redirect if we have a user and we're not in initial loading state
    if (user && !loading) {
      console.log("User is authenticated, redirecting to member portal");
      navigate("/member-portal", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      console.log("Attempting login with email:", email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Sign In Failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      } else {
        console.log("Login successful - auth state will handle redirect");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        // Note: Navigation is now handled by the auth context
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading while checking auth status
  if (loading) {
    console.log("Login page showing loading spinner");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-civitan-blue"></div>
      </div>
    );
  }

  console.log("Rendering login form");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Member Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your member dashboard and club resources
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-civitan-blue">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your member account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={submitting}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    disabled={submitting}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={submitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={submitting}>
                <LogIn className="h-4 w-4 mr-2" />
                {submitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="font-medium text-civitan-blue hover:text-civitan-blue/80">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">Need Help?</p>
              <p className="text-blue-700">
                If you're having trouble signing in, please contact the club administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
