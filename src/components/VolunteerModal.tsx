
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface VolunteerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "",
    agreeToUpdates: false,
    volunteerInterest: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeToUpdates: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email body with all form data
      const emailBody = `
New Volunteer Application:

Full Name: ${formData.fullName}
Email Address: ${formData.email}
Cell Phone Number: ${formData.phone}
Preferred Contact Method: ${formData.contactMethod}
Volunteer Interest: ${formData.volunteerInterest}
Agrees to receive updates: ${formData.agreeToUpdates ? 'Yes' : 'No'}

Thank you for your interest in volunteering with Duluth Civitan Club!
      `.trim();

      // Open email client with pre-filled information
      window.location.href = `mailto:info@duluthcivitanclub.org?subject=I Want to Volunteer!&body=${encodeURIComponent(emailBody)}`;

      // Show success message
      toast({
        title: "Volunteer Application Sent!",
        description: "Your volunteer application has been sent. We'll be in touch soon!",
      });
      
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        onOpenChange(false);
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          contactMethod: "",
          agreeToUpdates: false,
          volunteerInterest: "",
        });
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your volunteer application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="bg-civitan-blue text-white p-6 rounded-t-lg relative">
          <DialogTitle className="text-2xl font-bold flex items-center">
            <HandHelping className="mr-3 h-6 w-6" />
            I Want to Volunteer!
          </DialogTitle>
          <DialogDescription className="text-white/90 mt-2">
            Join us in making a difference in the Duluth community. Fill out this form and we'll get in touch!
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
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1 text-civitan-blue">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-civitan-blue">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1 text-civitan-blue">
                Cell Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                placeholder="Enter your cell phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-civitan-blue">
                Preferred Contact Method <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="contactMethod" 
                    value="Email" 
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="contactMethod" 
                    value="Text" 
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Text</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-civitan-blue">
                Volunteer Interest <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={(value) => handleSelectChange("volunteerInterest", value)} required>
                <SelectTrigger className="w-full border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue">
                  <SelectValue placeholder="Select your area of interest" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="events-support">Events Support</SelectItem>
                  <SelectItem value="community-outreach">Community Outreach</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="communications">Communications</SelectItem>
                  <SelectItem value="marketing-social-media">Marketing & Social Media</SelectItem>
                  <SelectItem value="youth-programs">Youth Programs</SelectItem>
                  <SelectItem value="administrative-support">Administrative Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agreeToUpdates" 
                checked={formData.agreeToUpdates}
                onCheckedChange={handleCheckboxChange}
                className="text-civitan-gold border-civitan-blue focus:ring-civitan-blue"
                required
              />
              <label htmlFor="agreeToUpdates" className="text-sm">
                I agree to receive updates from Duluth Civitan Club <span className="text-red-500">*</span>
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
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Volunteer Application
                    <HandHelping className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <HandHelping className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-civitan-blue">Thank you for volunteering!</h3>
            <p className="text-center text-gray-600">
              We'll be in touch soon to discuss volunteer opportunities that match your interests.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerModal;
