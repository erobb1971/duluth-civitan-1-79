
import { Event } from "@/utils/events";
import { toast } from "@/hooks/use-toast";

export const handleExternalUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const handleSpectrumGardenTourEmail = () => {
  window.location.href = `mailto:info@duluthcivitanclub.org?subject=RSVP for Garden Tour&body=I would like to RSVP for the Spectrum Sensory & Harvest Gardens Tour on June 5, 2025. Please provide any additional information needed.`;
  toast({
    title: "Thank you!",
    description: "Your RSVP has been sent to info@duluthcivitanclub.org.",
  });
};

export const handleVolunteerEmail = (formData: {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
  volunteerInterest: string;
  agreeToUpdates: boolean;
}) => {
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

  window.location.href = `mailto:info@duluthcivitanclub.org?subject=I Want to Volunteer!&body=${encodeURIComponent(emailBody)}`;
  
  toast({
    title: "Volunteer Application Sent!",
    description: "Your volunteer application has been sent. We'll be in touch soon!",
  });
};

export const handleNoEmail = (message?: string) => {
  toast({
    title: "Thank you!",
    description: message || "Your RSVP has been received.",
  });
};

export const handleDefaultEmail = () => {
  window.location.href = `mailto:info@duluthcivitanclub.org?subject=Event Inquiry&body=Thank you for your interest in this event. Please provide your contact information and we will get back to you shortly.`;
  toast({
    title: "Thank you!",
    description: "Your interest has been submitted. We'll be in touch soon.",
  });
};

export const handleEmailClick = (event: Event) => {
  if (event.externalUrl) {
    handleExternalUrl(event.externalUrl);
    return;
  }

  if (event.id === "spectrum-garden-tour-2025") {
    handleSpectrumGardenTourEmail();
    return;
  }

  if (event.noEmail) {
    handleNoEmail(event.rsvpMessage);
    return;
  }

  handleDefaultEmail();
};
