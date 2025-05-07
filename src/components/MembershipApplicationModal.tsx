
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
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface MembershipApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MembershipApplicationModal: React.FC<MembershipApplicationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // In a real implementation, this would send the data to a server
      // For now we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Application Submitted",
        description: "Thanks for applying to be a member. We will contact you soon about your application.",
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
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-civitan-blue">Membership Application</DialogTitle>
          <DialogDescription>
            Complete this form to apply for membership with Duluth Civitan.
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Areas of Interest (Select all that apply)
              </label>
              <div className="space-y-2 border rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="communityService" 
                    checked={formData.interests.communityService}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("communityService", checked as boolean)
                    }
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
                  />
                  <label htmlFor="youthPrograms" className="text-sm">
                    Youth Programs
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="joinReason" className="block text-sm font-medium mb-1">
                Why do you want to join Duluth Civitan? <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="joinReason"
                name="joinReason"
                value={formData.joinReason}
                onChange={handleChange}
                required
                className="w-full"
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
              />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to our monthly newsletter
              </label>
            </div>

            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full bg-civitan-blue text-white hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
            <p className="text-center text-gray-600">
              Thanks for applying to be a member. We will contact you soon about your application.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MembershipApplicationModal;
