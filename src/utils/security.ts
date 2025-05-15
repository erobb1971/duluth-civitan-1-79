
/**
 * Security utility functions for Duluth Civitan website
 */

// Disable right-click and context menu on images
export const disableImageRightClick = () => {
  // For regular images
  document.addEventListener('contextmenu', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
      return false;
    }
  }, false);

  // For background images and other elements
  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) { // Right mouse button
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const backgroundImage = computedStyle.getPropertyValue('background-image');
      
      if (backgroundImage && backgroundImage !== 'none') {
        e.preventDefault();
        return false;
      }
    }
  }, false);

  // Handle touch events for mobile devices
  document.addEventListener('touchstart', (e) => {
    const target = e.target as HTMLElement;
    if (target instanceof HTMLImageElement || 
        (target.style && target.style.backgroundImage && 
         target.style.backgroundImage !== 'none')) {
      e.preventDefault();
    }
  }, { passive: false });

  // Add visual cue for protected images
  const styles = document.createElement('style');
  styles.innerHTML = `
    img {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      pointer-events: none;
    }
    
    img::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 10;
    }
  `;
  document.head.appendChild(styles);
};

// Detect DevTools and respond
export const detectDevTools = () => {
  // Function to check if DevTools is open
  const checkDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    // If DevTools is detected
    if (widthThreshold || heightThreshold) {
      console.clear();
      console.warn(
        "%cStop!", 
        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
      );
      console.warn(
        "%cThis browser feature is intended for developers only.\nViewing, copying or extracting content from this site is prohibited.",
        "font-family:system-ui;font-size:1.5rem;font-weight:bold"
      );
      
      // Hide sensitive elements
      document.body.innerHTML = 
        '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#00205b;color:#ffc72c;font-family:system-ui;text-align:center;padding:20px;">' +
        '<div><h1>Access Denied</h1><p>This action is not permitted on the Duluth Civitan website.</p>' +
        '<p>Please close developer tools to continue viewing our site.</p></div></div>';
    }
  };

  // Check on page load
  window.addEventListener('load', checkDevTools);
  
  // Check on resize which happens when DevTools is opened/closed
  window.addEventListener('resize', checkDevTools);
  
  // Check periodically
  setInterval(checkDevTools, 1000);
  
  // Detect F12 key
  window.addEventListener('keydown', (e) => {
    // Check for F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (
      e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
    ) {
      e.preventDefault();
      return false;
    }
  });
};

// Prevent text selection and copying
export const preventTextCopying = () => {
  // Disable text selection
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  // Disable copy, cut and paste events
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener('paste', (e) => {
    if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      return false;
    }
  });
};

// Prevent iframes from loading the site (frame busting)
export const preventFraming = () => {
  // Check if we're in an iframe
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }

  // Add X-Frame-Options header in the content security policy meta tag
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "frame-ancestors 'self'";
  document.head.appendChild(meta);
};

// Initialize all security features
export const initializeSecurity = () => {
  disableImageRightClick();
  detectDevTools();
  preventTextCopying();
  preventFraming();
};
