/**
 * CDN Entry Point for Replica Replay SDK
 * 
 * This file provides a standalone browser bundle that can be loaded via script tag.
 * It exposes the session replay functionality on the global window object.
 */

import { initSessionReplay, SessionReplayPlugin, isSessionReplayAvailable, getSessionReplayConfig } from './index.js';

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
  version: '1.0.0'
};

// Also expose individual functions for convenience
window.initSessionReplay = initSessionReplay;
window.SessionReplayPlugin = SessionReplayPlugin;
window.isSessionReplayAvailable = isSessionReplayAvailable;
window.getSessionReplayConfig = getSessionReplayConfig;

// Auto-initialize if config is provided via data attributes
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[src*="replica-replay"]');
  if (script) {
    const projectKey = script.dataset.projectKey;
    const secretKey = script.dataset.secretKey;
    const serverUrl = script.dataset.serverUrl;
    
    if (projectKey && secretKey) {
      window.ReplicaReplay.init({
        projectKey,
        secretKey,
        serverUrl
      });
    }
  }
});
