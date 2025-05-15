
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

// Frame busting only
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

// Initialize limited security features
export const initializeSecurity = () => {
  disableImageRightClick();
  detectDevTools();
  preventFraming();
};
