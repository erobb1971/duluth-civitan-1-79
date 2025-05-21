
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, X, DollarSign, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

interface MembershipApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MembershipApplicationModal: React.FC<MembershipApplicationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    membershipType: "",
    paymentPreference: "",
    interests: {
      communityService: false,
      fundraising: false,
      leadership: false,
      socialEvents: false,
      youthPrograms: false,
    },
    joinReason: "",
    newsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === "newsletter") {
      setFormData((prev) => ({
        ...prev,
        newsletter: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: {
          ...prev.interests,
          [name]: checked,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send the data to info@duluthcivitanclub.org
      // For now we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Application Submitted",
        description: "Thanks for applying to be a member. We will contact you soon about your application and payment details.",
      });
      
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        onOpenChange(false);
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          streetAddress: "",
          city: "",
          zipCode: "",
          membershipType: "",
          paymentPreference: "",
          interests: {
            communityService: false,
            fundraising: false,
            leadership: false,
            socialEvents: false,
            youthPrograms: false,
          },
          joinReason: "",
          newsletter: false,
        });
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="bg-civitan-blue text-white p-6 rounded-t-lg relative">
          <DialogTitle className="text-2xl font-bold">Membership Application</DialogTitle>
          <DialogDescription className="text-white/90 mt-2">
            Complete this form to apply for membership with Duluth Civitan.
          </DialogDescription>
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Member Information Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-civitan-blue mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-civitan-blue">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-civitan-blue">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-civitan-blue">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 text-civitan-blue">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="streetAddress" className="block text-sm font-medium mb-1 text-civitan-blue">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1 text-civitan-blue">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-1 text-civitan-blue">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                  />
                </div>
              </div>
            </div>

            {/* Membership Type & Payment Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-civitan-blue mb-4 flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Membership & Payment
              </h3>
              
              <div className="mb-4">
                <label htmlFor="membershipType" className="block text-sm font-medium mb-2 text-civitan-blue">
                  Membership Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3 border rounded-md p-4 bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="membershipType" 
                        value="quarterly" 
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      <div>
                        <span className="block font-medium">Quarterly</span>
                        <span className="text-sm text-gray-500">$95 per quarter</span>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="membershipType" 
                        value="annual" 
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <div>
                        <span className="block font-medium">Annual</span>
                        <span className="text-sm text-gray-500">$375 per year</span>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="membershipType" 
                        value="support" 
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <div>
                        <span className="block font-medium">Support Individual</span>
                        <span className="text-sm text-gray-500">$125 per year (no meals)</span>
                      </div>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Regular memberships include lunch at 1818 Club events.
                </p>
              </div>
              
              <div>
                <label htmlFor="paymentPreference" className="block text-sm font-medium mb-2 text-civitan-blue">
                  Preferred Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="paymentPreference" 
                      value="creditCard" 
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                      <span>Credit Card</span>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="paymentPreference" 
                      value="check" 
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                      <span>Check</span>
                    </div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  After submitting this form, we'll contact you with payment instructions.
                </p>
              </div>
            </div>

            {/* Interests Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-civitan-blue mb-4">Areas of Interest</h3>
              <div className="space-y-2 border rounded-md p-4 bg-white">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="communityService" 
                    checked={formData.interests.communityService}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("communityService", checked as boolean)
                    }
                    className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                  />
                  <label htmlFor="communityService" className="text-sm">
                    Community Service Projects
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fundraising" 
                    checked={formData.interests.fundraising}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("fundraising", checked as boolean)
                    }
                    className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                  />
                  <label htmlFor="fundraising" className="text-sm">
                    Fundraising Events
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="leadership" 
                    checked={formData.interests.leadership}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("leadership", checked as boolean)
                    }
                    className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                  />
                  <label htmlFor="leadership" className="text-sm">
                    Leadership Opportunities
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="socialEvents" 
                    checked={formData.interests.socialEvents}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("socialEvents", checked as boolean)
                    }
                    className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                  />
                  <label htmlFor="socialEvents" className="text-sm">
                    Social Events
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="youthPrograms" 
                    checked={formData.interests.youthPrograms}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("youthPrograms", checked as boolean)
                    }
                    className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                  />
                  <label htmlFor="youthPrograms" className="text-sm">
                    Youth Programs
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="joinReason" className="block text-sm font-medium mb-1 text-civitan-blue">
                Why do you want to join Duluth Civitan? <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="joinReason"
                name="joinReason"
                value={formData.joinReason}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsletter" 
                checked={formData.newsletter}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("newsletter", checked as boolean)
                }
                className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
              />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to our monthly newsletter
              </label>
            </div>

            <DialogFooter className="mt-6">
              <Button 
                type="submit" 
                className="w-full bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-civitan-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Application
                    <Mail className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-civitan-blue">Application Submitted!</h3>
            <p className="text-center text-gray-600">
              Thanks for applying to be a member. We will contact you soon about your application and payment details.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MembershipApplicationModal;
