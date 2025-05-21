
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ContactButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ icon: Icon, label, onClick }) => {
  const buttonVariants = {
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="w-full md:w-1/3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        className="group"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Button 
          variant="outline" 
          className="w-full py-8 h-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-2xl transition-all duration-300"
          onClick={onClick}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="bg-civitan-gold p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-6 w-6 text-civitan-blue" />
            </div>
            <span className="text-lg font-medium">{label}</span>
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ContactButton;
