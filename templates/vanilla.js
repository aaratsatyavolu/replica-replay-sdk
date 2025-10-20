/**
 * Vanilla JavaScript integration template for session replay
 * This file contains example code for integrating session replay with vanilla JavaScript applications
 */

// Example 1: Basic script tag integration
export const BasicScriptTagIntegration = `
<!-- Add to your HTML head -->
<script type="module">
  import { initSessionReplay } from '@replica-replay/core';
  
  initSessionReplay({
    projectKey: '{{PROJECT_KEY}}',
    secretKey: '{{SECRET_KEY}}'
  });
</script>
`;

// Example 2: Regular script tag with dynamic import
export const DynamicImportIntegration = `
<!-- Add to your HTML head -->
<script>
  // Load the module dynamically
  import('@replica-replay/core').then(({ initSessionReplay }) => {
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }).catch(error => {
    console.error('Failed to load session replay:', error);
  });
</script>
`;

// Example 3: Integration with DOM ready
export const DOMReadyIntegration = `
<!-- Add to your HTML head -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    import('@replica-replay/core').then(({ initSessionReplay }) => {
      initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
    });
  });
</script>
`;

// Example 4: Integration with window load
export const WindowLoadIntegration = `
<!-- Add to your HTML head -->
<script>
  window.addEventListener('load', function() {
    import('@replica-replay/core').then(({ initSessionReplay }) => {
      initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
    });
  });
</script>
`;

// Example 5: Conditional loading
export const ConditionalLoading = `
<!-- Add to your HTML head -->
<script>
  // Only load in production or when explicitly enabled
  if (window.location.hostname !== 'localhost' || window.ENABLE_REPLAY === true) {
    import('@replica-replay/core').then(({ initSessionReplay }) => {
      initSessionReplay({
        projectKey: window.REPLAY_PROJECT_KEY || 'PROJECT_KEY',
        secretKey: window.REPLAY_SECRET_KEY || 'SECRET_KEY'
      });
    });
  }
</script>
`;

// Example 6: Integration with error handling
export const ErrorHandlingIntegration = `
<!-- Add to your HTML head -->
<script>
  async function initializeSessionReplay() {
    try {
      const { initSessionReplay } = await import('@replica-replay/core');
      
      await initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
      
      console.log('Session replay initialized successfully');
    } catch (error) {
      console.error('Failed to initialize session replay:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSessionReplay);
  } else {
    initializeSessionReplay();
  }
</script>
`;

// Example 7: Integration with configuration object
export const ConfigurationObjectIntegration = `
<!-- Add to your HTML head -->
<script>
  // Configuration object
  window.REPLAY_CONFIG = {
    projectKey: 'PROJECT_KEY',
    secretKey: 'SECRET_KEY',
    serverUrl: 'https://rrweb-ingest-825071668012.us-central1.run.app'
  };

  // Initialize session replay
  import('@replica-replay/core').then(({ initSessionReplay }) => {
    initSessionReplay(window.REPLAY_CONFIG);
  });
</script>
`;

// Example 8: Integration with multiple pages
export const MultiPageIntegration = `
<!-- Add to your HTML head -->
<script>
  // Global session replay initialization
  window.initSessionReplay = async function(config) {
    try {
      const { initSessionReplay } = await import('@replica-replay/core');
      await initSessionReplay(config);
      return true;
    } catch (error) {
      console.error('Session replay initialization failed:', error);
      return false;
    }
  };

  // Initialize with default config
  window.initSessionReplay({
    projectKey: 'PROJECT_KEY',
    secretKey: 'SECRET_KEY'
  });
</script>

<!-- On other pages, you can call: -->
<script>
  // Re-initialize if needed
  if (window.initSessionReplay) {
    window.initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }
</script>
`;

// Example 9: Integration with build tools (Webpack, Vite, etc.)
export const BuildToolIntegration = `
// main.js or index.js
import { initSessionReplay } from '@replica-replay/core';

// Initialize session replay
initSessionReplay({
  projectKey: 'PROJECT_KEY',
  secretKey: 'SECRET_KEY'
});

// Your other application code
console.log('Application started');
`;

// Example 10: Integration with jQuery
export const JQueryIntegration = `
<!-- Add to your HTML head -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function() {
    import('@replica-replay/core').then(({ initSessionReplay }) => {
      initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
    });
  });
</script>
`;

// Example 11: Integration with existing analytics
export const AnalyticsIntegration = `
<!-- Add to your HTML head -->
<script>
  // Initialize session replay alongside other analytics
  Promise.all([
    import('@replica-replay/core'),
    // Other analytics imports
  ]).then(([sessionReplay, otherAnalytics]) => {
    // Initialize session replay
    sessionReplay.initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });

    // Initialize other analytics
    // otherAnalytics.init();
  });
</script>
`;

// Example 12: Integration with service worker
export const ServiceWorkerIntegration = `
<!-- Add to your HTML head -->
<script>
  // Initialize session replay
  import('@replica-replay/core').then(({ initSessionReplay }) => {
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
`;

// Default export with all examples
export default {
  BasicScriptTagIntegration,
  DynamicImportIntegration,
  DOMReadyIntegration,
  WindowLoadIntegration,
  ConditionalLoading,
  ErrorHandlingIntegration,
  ConfigurationObjectIntegration,
  MultiPageIntegration,
  BuildToolIntegration,
  JQueryIntegration,
  AnalyticsIntegration,
  ServiceWorkerIntegration
};
