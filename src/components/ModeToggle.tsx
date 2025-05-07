
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  // Commenting out dark/light mode functionality
  // const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ensure light mode is always enabled
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleMode = () => {
    // Commenting out toggle functionality
    // setIsDarkMode(!isDarkMode);
    
    // Always ensure light mode
    document.documentElement.classList.remove("dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleMode} style={{ display: 'none' }}>
      {/* Hide the toggle button completely */}
      <Sun className="h-5 w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;
