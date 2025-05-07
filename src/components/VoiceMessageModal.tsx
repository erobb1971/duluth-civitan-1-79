
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Send, Square } from "lucide-react";
import { toast } from "sonner";

interface VoiceMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VoiceMessageModal = ({ open, onOpenChange }: VoiceMessageModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleStartRecording = () => {
    // This is a placeholder for actual recording functionality
    setIsRecording(true);
    setMessage("");
    toast.info("Recording started...");
  };
  
  const handleStopRecording = () => {
    // This is a placeholder for actual recording functionality
    setIsRecording(false);
    setMessage("Your recorded message would appear here.");
    toast.success("Recording saved!");
  };
  
  const handleSendMessage = () => {
    // This is a placeholder for actual sending functionality
    toast.success("Message sent successfully!");
    setMessage("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-civitan-blue text-xl font-bold">
            Voice Message
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Record your message and we'll get back to you soon.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <div className="w-full min-h-[100px] bg-gray-50 border rounded-md p-3 text-gray-700">
            {message || "Record your message..."}
          </div>
          
          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <Button 
                onClick={handleStartRecording}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </Button>
            ) : (
              <Button 
                onClick={handleStopRecording} 
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <Square className="mr-2 h-5 w-5" />
                Stop Recording
              </Button>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSendMessage}
            disabled={!message} 
            className="w-full"
          >
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceMessageModal;
