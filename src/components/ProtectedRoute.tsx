
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, member, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Auth state:", { 
    user: !!user, 
    member: !!member, 
    loading,
    currentPath: location.pathname 
  });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-civitan-blue"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Show loading if user exists but member data is still loading
  if (user && !member) {
    console.log("User found but member data still loading");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-civitan-blue"></div>
      </div>
    );
  }

  console.log("User authenticated and member data loaded, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
