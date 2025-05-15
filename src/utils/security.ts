
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

  // Add visual cue for protected images
  const styles = document.createElement('style');
  styles.innerHTML = `
    img {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(styles);
};

// Less aggressive DevTools detection
export const detectDevTools = () => {
  // Show a warning in console only
  console.warn(
    "%cNotice: This website's content is protected by copyright.",
    "font-family:system-ui;font-size:1rem;font-weight:bold"
  );
  console.warn(
    "%cPlease respect our intellectual property.",
    "font-family:system-ui;font-size:0.9rem;"
  );
};

// Modified frame busting to avoid security errors
export const preventFraming = () => {
  try {
    // Check if we're in an iframe with a safer approach
    if (window.self !== window.top) {
      // Instead of redirecting, which can cause security errors,
      // just log a warning and use Content-Security-Policy
      console.warn("This site is not meant to be displayed in a frame.");
    }

    // Add X-Frame-Options header in the content security policy meta tag
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "frame-ancestors 'self'";
    document.head.appendChild(meta);
  } catch (e) {
    console.error("Error in frame protection:", e);
  }
};

// Initialize limited security features
export const initializeSecurity = () => {
  try {
    disableImageRightClick();
    detectDevTools();
    preventFraming();
  } catch (e) {
    console.error("Error initializing security features:", e);
  }
};
