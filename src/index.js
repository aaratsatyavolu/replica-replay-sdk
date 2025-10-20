/**
 * @replica-replay/core - Session Replay SDK
 * 
 * Main entry point for the session replay package.
 * Provides framework-agnostic session recording functionality.
 */

/**
 * Detect environment variables for different frameworks
 * @returns {Object} Environment configuration
 */
function detectEnvironmentVariables() {
  const prefixes = ['REACT_APP_', 'NEXT_PUBLIC_', 'VITE_', 'PUBLIC_'];
  
  for (const prefix of prefixes) {
    const projectKey = process.env[`${prefix}REPLAY_PROJECT_KEY`];
    const secretKey = process.env[`${prefix}REPLAY_SECRET_KEY`];
    
    if (projectKey && secretKey) {
      return { projectKey, secretKey };
    }
  }
  
  return {};
}

/**
 * Load the session replay script with retry logic
 * @param {Object} config - Configuration object
 * @returns {Promise<void>}
 */
async function loadScript(config) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${config.serverUrl}/s/${config.projectKey}/${config.secretKey}/init.js`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (config.onSuccess) {
        config.onSuccess('Session replay initialized successfully');
      } else {
        console.log('✅ Session replay initialized successfully');
      }
      resolve();
    };
    
    script.onerror = (error) => {
      const errorMessage = `Failed to load session replay script: ${error.message || 'Unknown error'}`;
      if (config.onError) {
        config.onError(errorMessage);
      } else {
        console.error(errorMessage);
      }
      reject(new Error(errorMessage));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Initialize session replay with required configuration
 * @param {Object} config - Configuration object
 * @param {string} [config.projectKey] - Project key for identification
 * @param {string} [config.secretKey] - Secret key for authentication
 * @param {string} [config.serverUrl] - Server URL (defaults to production)
 * @param {Function} [config.onSuccess] - Success callback
 * @param {Function} [config.onError] - Error callback
 * @returns {Promise<void>}
 */
export async function initSessionReplay(config = {}) {
  // Auto-detect environment variables if config is empty or incomplete
  if (!config.projectKey || !config.secretKey) {
    const envConfig = detectEnvironmentVariables();
    config = { ...envConfig, ...config };
  }
  
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
  const finalConfig = { ...config, serverUrl };
  
  // Add retry logic
  const maxRetries = 3;
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      await loadScript(finalConfig);
      return;
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        const delay = 1000 * (i + 1); // Exponential backoff
        console.warn(`Session replay load attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // All retries failed
  const errorMessage = `Session replay failed to load after ${maxRetries} attempts: ${lastError.message}`;
  if (finalConfig.onError) {
    finalConfig.onError(errorMessage);
  } else {
    console.error(errorMessage);
  }
  throw lastError;
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
