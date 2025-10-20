/**
 * @replica-replay/core - Session Replay SDK
 * 
 * Main entry point for the session replay package.
 * Provides framework-agnostic session recording functionality.
 */

/**
 * Initialize session replay with required configuration
 * @param {Object} config - Configuration object
 * @param {string} config.projectKey - Project key for identification
 * @param {string} config.secretKey - Secret key for authentication
 * @param {string} [config.serverUrl] - Server URL (defaults to production)
 * @returns {Promise<void>}
 */
export async function initSessionReplay(config) {
  // Validate required configuration
  if (!config || typeof config !== 'object') {
    throw new Error('Configuration object is required. Example: initSessionReplay({ projectKey: "your-key", secretKey: "your-secret" })');
  }
  
  if (!config.projectKey || typeof config.projectKey !== 'string') {
    throw new Error('projectKey is required. Example: initSessionReplay({ projectKey: "your-key", secretKey: "your-secret" })');
  }
  
  if (!config.secretKey || typeof config.secretKey !== 'string') {
    throw new Error('secretKey is required. Example: initSessionReplay({ projectKey: "your-key", secretKey: "your-secret" })');
  }
  
  // Set default server URL
  const serverUrl = config.serverUrl || 'https://rrweb-ingest-825071668012.us-central1.run.app';
  
  // Create and load the stealth script
  const script = document.createElement('script');
  script.src = `${serverUrl}/s/${config.projectKey}/${config.secretKey}/init.js`;
  script.async = true;
  script.defer = true;
  
  // Add error handling
  script.onerror = (error) => {
    console.error('Failed to load session replay script:', error);
  };
  
  script.onload = () => {
    console.log('✅ Session replay initialized successfully');
  };
  
  // Append to head
  document.head.appendChild(script);
  
  return Promise.resolve();
}


/**
 * Vue plugin for session replay
 */
export const SessionReplayPlugin = {
  async install(app, config) {
    // Initialize session replay when plugin is installed
    try {
      await initSessionReplay(config);
      app.config.globalProperties.$replay = {
        initialized: true,
        config
      };
    } catch (error) {
      console.error('Failed to initialize session replay plugin:', error);
      app.config.globalProperties.$replay = {
        initialized: false,
        error: error.message
      };
    }
  }
};

/**
 * Check if session replay is available in the current environment
 * @returns {boolean}
 */
export function isSessionReplayAvailable() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Get the current session replay configuration
 * @returns {Object|null}
 */
export function getSessionReplayConfig() {
  try {
    const configScript = document.querySelector('script[src*="/s/"]');
    if (configScript && configScript.src) {
      const url = new URL(configScript.src);
      const pathParts = url.pathname.split('/');
      const projectKey = pathParts[2];
      const secretKey = pathParts[3];
      
      return {
        projectKey,
        secretKey,
        serverUrl: url.origin
      };
    }
  } catch (error) {
    console.warn('Could not extract session replay config:', error);
  }
  
  return null;
}

// Default export for convenience
export default {
  initSessionReplay,
  SessionReplayPlugin,
  isSessionReplayAvailable,
  getSessionReplayConfig
};
