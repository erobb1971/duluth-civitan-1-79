
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarModal = ({ open, onOpenChange }: CalendarModalProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-civitan-blue text-xl font-bold">Events Calendar</DialogTitle>
          <DialogDescription className="text-center pt-2">
            View our upcoming events
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          
          <p className="mt-4 text-center text-gray-600">
            Events integration coming soon!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
