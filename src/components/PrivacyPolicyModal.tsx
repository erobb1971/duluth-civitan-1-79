
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-civitan-blue">Privacy Policy</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Duluth Civitan Club
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Last Updated: May 14, 2025</h3>
              <p>
                The Duluth Civitan Club ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website duluthcivitanclub.org (the "Site").
              </p>
              <p className="mt-2">
                Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge that 
                you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree 
                with our policies and practices, please do not use our Site.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Information We Collect</h3>
              <p className="font-medium">Information You Provide to Us</p>
              <p>
                We may collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Complete forms on our Site</li>
                <li>Sign up for our newsletter or events</li>
                <li>Make a donation</li>
                <li>Contact us with inquiries</li>
                <li>Submit membership applications</li>
              </ul>

              <p className="mt-3 font-medium">Information Automatically Collected</p>
              <p>
                When you visit our Site, we may use cookies, log files, and similar technologies to 
                automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Access time</li>
                <li>Pages viewed</li>
                <li>Device information</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">How We Use Your Information</h3>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide, maintain, and improve our Site</li>
                <li>Process donations and membership applications</li>
                <li>Send you administrative information, event details, and newsletters</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns to enhance the user experience</li>
                <li>Protect against, identify, and prevent fraud and other unlawful activity</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Sharing of Information</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information 
                to outside parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>With service providers who perform functions on our behalf</li>
                <li>If required by law or to protect our rights</li>
                <li>To Civitan International, as required for club membership</li>
                <li>With your consent</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Your Choices</h3>
              <p>
                You can choose not to provide the personal information we request, but you may be 
                unable to access certain features of our Site. You may also opt out of receiving 
                promotional communications from us by following the unsubscribe instructions in those 
                communications.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Data Security</h3>
              <p>
                We implement reasonable security measures to protect your personal information from 
                loss, misuse, and unauthorized access. However, no method of transmission over the 
                Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Children's Privacy</h3>
              <p>
                Our Site is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. The date at the top of this Privacy Policy 
                indicates when it was last revised. Your continued use of the Site after any changes indicates 
                your acceptance of the revised Privacy Policy.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-civitan-blue mb-2">Contact Information</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Duluth Civitan Club<br/>
                info@duluthcivitanclub.org
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
