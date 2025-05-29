
import React from "react";
import { Button } from "@/components/ui/button";
import { PiggyBank, UserPlus, HandHelping } from "lucide-react";
import { motion } from "framer-motion";

interface GetInvolvedSectionProps {
  onDonateClick: () => void;
  onMembershipClick: () => void;
  onVolunteerClick: () => void;
}

const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({
  onDonateClick,
  onMembershipClick,
  onVolunteerClick
}) => {
  return (
    <motion.div 
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">Get Involved</h3>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-md mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-[calc(50%-0.5rem)]"
        >
          <Button 
            className="w-full bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-semibold py-6 h-auto text-lg rounded-xl shadow-lg"
            onClick={onDonateClick}
          >
            <PiggyBank className="mr-2 h-5 w-5" />
            Donate
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-[calc(50%-0.5rem)]"
        >
          <Button 
            className="w-full bg-civitan-blue text-white border-2 border-white hover:bg-blue-700 font-semibold py-6 h-auto text-lg rounded-xl shadow-lg"
            onClick={onVolunteerClick}
          >
            <HandHelping className="mr-2 h-5 w-5" />
            Volunteer
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Button 
            className="w-full bg-white text-civitan-blue hover:bg-gray-100 font-semibold py-6 h-auto text-lg rounded-xl shadow-lg"
            onClick={onMembershipClick}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Become a Member
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GetInvolvedSection;
