
/**
 * Security utility functions for Duluth Civitan website
 */

// Disable right-click and context menu on images - with improved error handling
export const disableImageRightClick = () => {
  try {
    // For regular images - less aggressive approach
    document.addEventListener('contextmenu', (e) => {
      if (e.target instanceof HTMLImageElement) {
        // Just show a message instead of preventing default
        console.log("Image is protected by copyright.");
        return false;
      }
    }, false);

    // Add visual cue for protected images - simplified
    const styles = document.createElement('style');
    styles.innerHTML = `
      img {
        -webkit-touch-callout: none;
      }
    `;
    document.head.appendChild(styles);
  } catch (e) {
    console.error("Error in image protection:", e);
  }
};

// Very light DevTools detection - just informational
export const detectDevTools = () => {
  // Show a minimal notice in console only
  console.log(
    "Duluth Civitan content is copyright protected. Please respect our intellectual property."
  );
};

// Non-aggressive frame busting that won't cause security errors or affect domain linking
export const preventFraming = () => {
  try {
    // Commenting out frame protection to avoid domain linking issues
    /* 
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Frame-Options';
    meta.content = "SAMEORIGIN";
    document.head.appendChild(meta);
    */
    
    // For now, just log that we're skipping frame protection during domain linking
    console.log("Frame protection temporarily disabled for domain linking");
  } catch (e) {
    console.error("Error in frame protection:", e);
  }
};

// Initialize minimal security features with comprehensive error handling
export const initializeSecurity = () => {
  try {
    disableImageRightClick();
    detectDevTools();
    // preventFraming(); // Temporarily disabled for domain linking
  } catch (e) {
    console.error("Error initializing security features:", e);
  }
};
