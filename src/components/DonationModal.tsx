
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
import { X, DollarSign, Mail, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  donationAmount: z.string().refine(value => {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue > 0;
  }, {
    message: "Please enter a valid donation amount"
  })
});

type FormValues = z.infer<typeof formSchema>;

const DonationModal: React.FC<DonationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      donationAmount: ""
    }
  });

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    form.setValue("donationAmount", amount);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send the data to a payment processor and email
      // For now we'll simulate an API call with a timeout
      console.log("Donation data:", data);
      
      // Simulate sending email
      const emailSubject = "Donation Submission";
      const emailBody = `
        New donation from ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phone}
        Amount: $${data.donationAmount}
      `;
      
      console.log(`Email would be sent to info@duluthcivitanclub.org`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body: ${emailBody}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Donation Submitted",
        description: "Thank you for your support! We'll be in touch soon.",
      });
      
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        onOpenChange(false);
        setSubmitted(false);
        form.reset();
        setSelectedAmount(null);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="bg-civitan-blue text-white p-6 rounded-t-lg relative">
          <DialogTitle className="text-2xl font-bold">Make a Donation</DialogTitle>
          <DialogDescription className="text-white/90 mt-2">
            Support our work in the Duluth and Gwinnett community.
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
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 border-l-4 border-civitan-blue p-4 rounded-md">
              <p className="text-sm text-civitan-blue">
                Thank you for considering a donation. Your support helps The Duluth Civitan Club provide services, 
                resources, and programs that make a real difference in the Duluth and Gwinnett community. 
                Every donation, no matter the size, contributes to our mission of building better communities.
              </p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-civitan-blue">
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-civitan-blue">
                          Last Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-civitan-blue">
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-civitan-blue">
                          Phone <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel"
                            className="border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel className="block text-sm font-medium mb-2 text-civitan-blue">
                    Select Donation Amount <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {["25", "50", "100", "250"].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`
                          flex items-center justify-center py-3 px-4 rounded-md border 
                          ${selectedAmount === amount 
                            ? 'bg-civitan-gold text-civitan-blue border-civitan-blue font-bold' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'}
                          transition-colors duration-200
                        `}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        <DollarSign className="mr-1 h-4 w-4" />
                        {amount}
                      </button>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="donationAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-civitan-blue">
                          Custom Amount ($) <span className="text-gray-500 text-xs">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                              {...field}
                              className="pl-9 border-gray-300 focus:border-civitan-blue focus:ring-civitan-blue"
                              placeholder="Enter custom amount"
                              onClick={() => setSelectedAmount(null)}
                              onChange={(e) => {
                                setSelectedAmount(null);
                                field.onChange(e);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        Process Donation
                        <CreditCard className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-civitan-blue">Thank You For Your Support!</h3>
            <p className="text-center text-gray-600">
              Your donation will help us make a real difference in our community. We appreciate your generosity.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
