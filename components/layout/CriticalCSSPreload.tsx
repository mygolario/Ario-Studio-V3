/**
 * Component to preload critical CSS file
 * Uses inline script for immediate execution before React hydration
 * Optimized to cache DOM queries and prevent forced reflow
 */
export function CriticalCSSPreload() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Cache head reference to avoid multiple queries
            const head = document.head;
            const cssPath = '/css/ac2731ef1d07734c.css';
            
            // Use a single query to check for existing links (more efficient)
            const existingLinks = head.querySelectorAll('link[href="' + cssPath + '"]');
            let hasPreload = false;
            let hasStylesheet = false;
            
            // Check existing links in one pass
            for (let i = 0; i < existingLinks.length; i++) {
              const link = existingLinks[i];
              if (link.rel === 'preload') hasPreload = true;
              if (link.rel === 'stylesheet') hasStylesheet = true;
            }

            // Create preload link if it doesn't exist
            if (!hasPreload) {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.as = 'style';
              preloadLink.href = cssPath;
              head.appendChild(preloadLink);
            }

            // Create stylesheet link if it doesn't exist
            if (!hasStylesheet) {
              const stylesheetLink = document.createElement('link');
              stylesheetLink.rel = 'stylesheet';
              stylesheetLink.href = cssPath;
              head.appendChild(stylesheetLink);
            }
          })();
        `,
      }}
    />
  );
}

