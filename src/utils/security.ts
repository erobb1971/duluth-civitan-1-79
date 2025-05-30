
/**
 * Security utility functions for Duluth Civitan website
 * 
 * SECURITY NOTE: This file contains client-side security measures only.
 * These are supplementary protections and should NOT be relied upon for actual security.
 * All critical security must be implemented on the server side.
 */

// Light content protection - educational purposes only
export const addContentProtection = () => {
  try {
    // Add basic content protection styles
    const styles = document.createElement('style');
    styles.innerHTML = `
      /* Light content protection - easily bypassed, for educational purposes only */
      img {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        pointer-events: none;
      }
      
      /* Re-enable pointer events for interactive elements */
      button, a, input, textarea, select {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(styles);
  } catch (e) {
    console.error("Error adding content protection:", e);
  }
};

// Educational security notice
export const displaySecurityNotice = () => {
  console.log(
    "%cSecurity Notice",
    "color: #ff6b6b; font-size: 16px; font-weight: bold;",
    "\n\nThis website implements client-side protections for educational purposes only.",
    "\nTrue security requires proper server-side implementation with:",
    "\n• Authentication & authorization",
    "\n• Input validation & sanitization", 
    "\n• CSRF protection",
    "\n• Rate limiting",
    "\n• Secure session management",
    "\n\nContent is copyright protected - please respect intellectual property."
  );
};

// CSP-like protection (limited client-side implementation)
export const addCSPProtection = () => {
  try {
    // Add basic CSP meta tag - note: limited effectiveness when added via JS
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";
    document.head.appendChild(meta);
    
    console.log("Basic CSP protection added (client-side - limited effectiveness)");
  } catch (e) {
    console.error("Error adding CSP protection:", e);
  }
};

// Input sanitization helper
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols  
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocols
    .trim()
    .slice(0, 1000); // Limit length
};

// Rate limiting helper (client-side - easily bypassed)
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = [];
  
  return () => {
    const now = Date.now();
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      console.warn("Rate limit exceeded - please slow down");
      return false;
    }
    
    requests.push(now);
    return true;
  };
};

// Initialize security measures (educational/supplementary only)
export const initializeSecurity = () => {
  try {
    addContentProtection();
    displaySecurityNotice();
    addCSPProtection();
    
    // Add security headers awareness
    console.log(
      "%cSecurity Headers Needed",
      "color: #ffa500; font-size: 14px; font-weight: bold;",
      "\n\nFor production, implement these server-side headers:",
      "\n• X-Content-Type-Options: nosniff",
      "\n• X-Frame-Options: DENY", 
      "\n• X-XSS-Protection: 1; mode=block",
      "\n• Strict-Transport-Security: max-age=31536000; includeSubDomains",
      "\n• Content-Security-Policy: (strict policy)",
      "\n• Referrer-Policy: strict-origin-when-cross-origin"
    );
  } catch (e) {
    console.error("Error initializing security features:", e);
  }
};
