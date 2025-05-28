
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Smartphone, CreditCard } from "lucide-react";

const DonationButtons = () => {
  const handlePayPalDonation = () => {
    // PayPal integration will be implemented here
    console.log("PayPal donation clicked");
  };

  const handleVenmoDonation = () => {
    // Venmo integration will be implemented here
    console.log("Venmo donation clicked");
  };

  const handleBankTransfer = () => {
    // Bank transfer info will be shown here
    console.log("Bank transfer info requested");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-civitan-blue">Support Duluth Civitan</CardTitle>
        <p className="text-sm text-gray-600">
          Your donation helps us serve people with developmental disabilities
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={handlePayPalDonation}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Donate with PayPal
        </Button>
        
        <Button 
          onClick={handleVenmoDonation}
          variant="outline"
          className="w-full"
        >
          <Smartphone className="mr-2 h-4 w-4" />
          Venmo / Cash App
        </Button>
        
        <Button 
          onClick={handleBankTransfer}
          variant="outline"
          className="w-full"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Bank Transfer
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          All donations are secure and help support our community programs
        </p>
      </CardContent>
    </Card>
  );
};

export default DonationButtons;
