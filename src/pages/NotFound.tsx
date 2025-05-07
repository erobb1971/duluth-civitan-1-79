
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CivitanLogo from "@/components/CivitanLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-civitan-blue text-white p-4">
      <div className="text-center max-w-md">
        <CivitanLogo size="lg" className="mx-auto mb-8" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! We couldn't find that page.</p>
        <Button 
          className="bg-civitan-gold text-civitan-blue hover:bg-yellow-500 font-bold px-8 py-6 text-lg"
          onClick={() => window.location.href = "/"}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
