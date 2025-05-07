
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MemberLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MemberLoginModal = ({ open, onOpenChange }: MemberLoginModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-civitan-blue text-xl font-bold">Member Portal</DialogTitle>
          <DialogDescription className="text-center pt-4">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-lg font-semibold mb-2">Coming Soon!</span>
              <p className="text-gray-600">
                The member portal is currently under development.
              </p>
              <p className="text-gray-600 mt-2">
                Thank you for your patience.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MemberLoginModal;
