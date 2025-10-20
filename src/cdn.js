/**
 * CDN Entry Point for Replica Replay SDK
 * 
 * This file provides a standalone browser bundle that can be loaded via script tag.
 * It exposes the session replay functionality on the global window object.
 */

import { initSessionReplay, SessionReplayPlugin, isSessionReplayAvailable, getSessionReplayConfig } from './index.js';

/**
 * Get URL parameters from the script tag
 * @returns {Object} URL parameters
 */
function getUrlParams() {
  const script = document.currentScript || 
    document.querySelector('script[src*="replica-replay"]');
  if (script && script.src) {
    try {
      const url = new URL(script.src);
      return {
        projectKey: url.searchParams.get('projectKey'),
        secretKey: url.searchParams.get('secretKey'),
        serverUrl: url.searchParams.get('serverUrl'),
        autoInit: url.searchParams.get('autoInit') !== 'false',
        debug: url.searchParams.get('debug') === 'true'
      };
    } catch (error) {
      console.warn('Could not parse URL parameters:', error);
    }
  }
  return {};
}

/**
 * Get data attributes from the script tag
 * @returns {Object} Data attributes
 */
function getDataAttributes() {
  const script = document.currentScript || 
    document.querySelector('script[src*="replica-replay"]');
  if (script) {
    return {
      projectKey: script.dataset.projectKey,
      secretKey: script.dataset.secretKey,
      serverUrl: script.dataset.serverUrl,
      debug: script.dataset.debug === 'true'
    };
  }
  return {};
}

/**
 * Enable debug mode if conditions are met
 * @param {boolean} debug - Whether debug mode should be enabled
 */
function enableDebugMode(debug) {
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.search.includes('debug=true');
  
  if (debug || isLocalhost) {
    window.ReplicaReplay.debug = true;
    console.log('%c🎬 Replica Replay Debug Mode', 
      'color: #00ff00; font-weight: bold; font-size: 16px');
  }
}

/**
 * Auto-initialize session replay if configuration is available
 */
function autoInitialize() {
  const urlParams = getUrlParams();
  const dataAttrs = getDataAttributes();
  
  // Enable debug mode if requested
  enableDebugMode(urlParams.debug || dataAttrs.debug);
  
  // Check if auto-initialization is enabled and we have credentials
  if (urlParams.autoInit !== false && (urlParams.projectKey || dataAttrs.projectKey)) {
    const config = { 
      ...dataAttrs, 
      ...urlParams,
      onSuccess: (message) => {
        if (window.ReplicaReplay.debug) {
          console.log('✅ Session replay initialized:', message);
        }
      },
      onError: (error) => {
        console.error('❌ Session replay failed:', error);
      }
    };
    
    if (window.ReplicaReplay.debug) {
      console.log('🚀 Auto-initializing session replay with config:', {
        ...config,
        secretKey: config.secretKey ? '***' : undefined
      });
    }
    
    window.ReplicaReplay.init(config);
  } else if (window.ReplicaReplay.debug) {
    console.log('ℹ️ Session replay loaded but not auto-initialized. Call ReplicaReplay.init() manually.');
  }
}

/**
 * Global namespace for Replica Replay
 */
window.ReplicaReplay = {
  /**
   * Initialize session replay
   * @param {Object} config - Configuration object
   * @param {string} config.projectKey - Project key for identification
   * @param {string} config.secretKey - Secret key for authentication
   * @param {string} [config.serverUrl] - Server URL (optional)
   * @param {Function} [config.onSuccess] - Success callback
   * @param {Function} [config.onError] - Error callback
   * @returns {Promise<void>}
   */
  init: initSessionReplay,
  
  /**
   * Vue plugin for session replay
   */
  SessionReplayPlugin,
  
  /**
   * Check if session replay is available
   * @returns {boolean}
   */
  isAvailable: isSessionReplayAvailable,
  
  /**
   * Get current session replay configuration
   * @returns {Object|null}
   */
  getConfig: getSessionReplayConfig,
  
  /**
   * Version information
   */
  version: '1.0.0',
  
  /**
   * Debug mode flag
   */
  debug: false
};

// Also expose individual functions for convenience
window.initSessionReplay = initSessionReplay;
window.SessionReplayPlugin = SessionReplayPlugin;
window.isSessionReplayAvailable = isSessionReplayAvailable;
window.getSessionReplayConfig = getSessionReplayConfig;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInitialize);
} else {
  autoInitialize();
}
