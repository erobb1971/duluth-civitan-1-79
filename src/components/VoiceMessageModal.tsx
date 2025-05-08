
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Square } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VoiceMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VoiceMessageModal = ({ open, onOpenChange }: VoiceMessageModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  useEffect(() => {
    if (open) {
      checkMicrophonePermission();
    }
  }, [open]);
  
  const checkMicrophonePermission = async () => {
    try {
      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError("Your browser doesn't support audio recording");
        setHasMicrophonePermission(false);
        return;
      }
      
      // Just check if permission is available
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicrophonePermission(true);
      setPermissionError(null);
      
      // Stop the tracks immediately since we just wanted to check permissions
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setHasMicrophonePermission(false);
      setPermissionError("Microphone access denied. Please allow microphone access to record messages.");
    }
  };
  
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setMessage("Recording saved. Click 'Send Message' to submit.");
        
        // Release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setMessage("Recording... Speak now");
      toast.info("Recording started...");
    } catch (err) {
      console.error("Error starting recording:", err);
      setPermissionError("Failed to start recording. Please ensure microphone access is granted.");
      setHasMicrophonePermission(false);
      toast.error("Failed to start recording");
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording saved!");
    }
  };
  
  const handleSendMessage = async () => {
    if (!audioBlob) {
      toast.error("No recording to send");
      return;
    }
    
    // In a real app, you'd use FormData and send this to a server endpoint
    // that handles the email sending with the audio attachment
    toast.success("Message sent to info@duluthcivitanclub.org!");
    toast.info("(Note: In production, this would send the actual audio file via email)");
    
    setMessage("");
    setAudioBlob(null);
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
        
        {permissionError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{permissionError}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <div className="w-full min-h-[100px] bg-gray-50 border rounded-md p-3 text-gray-700">
            {message || "Record your message..."}
          </div>
          
          <div className="flex justify-center space-x-4">
            {hasMicrophonePermission === false ? (
              <Button 
                onClick={checkMicrophonePermission}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <Mic className="mr-2 h-5 w-5" />
                Request Microphone Access
              </Button>
            ) : !isRecording ? (
              <Button 
                onClick={handleStartRecording}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={!hasMicrophonePermission}
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
          
          {audioBlob && (
            <audio controls className="w-full">
              <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSendMessage}
            disabled={!audioBlob} 
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
