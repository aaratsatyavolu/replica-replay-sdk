/**
 * Stealth script loader for session replay
 * Handles loading the rrweb library with multiple fallback methods
 */

/**
 * Load the session replay script using multiple fallback methods
 * @param {string} scriptUrl - URL of the script to load
 * @returns {Promise<void>}
 */
export async function loadSessionReplayScript(scriptUrl) {
  const methods = [
    () => loadViaScriptTag(scriptUrl),
    () => loadViaFetch(scriptUrl),
    () => loadViaXHR(scriptUrl),
    () => loadViaDynamicImport(scriptUrl)
  ];

  for (const method of methods) {
    try {
      await method();
      if (window.rrweb) {
        console.log('✅ Session replay script loaded successfully');
        return;
      }
    } catch (error) {
      console.warn('Script loading method failed:', error.message);
      continue;
    }
  }

  throw new Error('All script loading methods failed');
}

/**
 * Load script via traditional script tag
 * @param {string} scriptUrl - URL of the script
 * @returns {Promise<void>}
 */
function loadViaScriptTag(scriptUrl) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script tag loading failed'));
    
    document.head.appendChild(script);
  });
}

/**
 * Load script via fetch and eval
 * @param {string} scriptUrl - URL of the script
 * @returns {Promise<void>}
 */
async function loadViaFetch(scriptUrl) {
  const response = await fetch(scriptUrl);
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }
  
  const scriptContent = await response.text();
  eval(scriptContent);
}

/**
 * Load script via XMLHttpRequest
 * @param {string} scriptUrl - URL of the script
 * @returns {Promise<void>}
 */
function loadViaXHR(scriptUrl) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', scriptUrl, true);
    xhr.responseType = 'text';
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        eval(xhr.responseText);
        resolve();
      } else {
        reject(new Error(`XHR failed: ${xhr.status}`));
      }
    };
    
    xhr.onerror = () => reject(new Error('XHR request failed'));
    xhr.send();
  });
}

/**
 * Load script via dynamic import (for ES modules)
 * @param {string} scriptUrl - URL of the script
 * @returns {Promise<void>}
 */
async function loadViaDynamicImport(scriptUrl) {
  // Convert to ES module if possible
  const moduleUrl = scriptUrl.replace('.js', '.mjs');
  try {
    await import(moduleUrl);
  } catch (error) {
    // Fallback to regular script loading
    throw new Error('Dynamic import not supported');
  }
}

/**
 * Check if rrweb is available
 * @returns {boolean}
 */
export function isRrwebAvailable() {
  return typeof window !== 'undefined' && typeof window.rrweb !== 'undefined';
}

/**
 * Wait for rrweb to be available
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<void>}
 */
export function waitForRrweb(timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (isRrwebAvailable()) {
      resolve();
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isRrwebAvailable()) {
        clearInterval(checkInterval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('Timeout waiting for rrweb'));
      }
    }, 100);
  });
}

/**
 * Initialize session recording with rrweb
 * @param {Object} config - Recording configuration
 * @returns {Object} Recording instance
 */
export function startRecording(config = {}) {
  if (!isRrwebAvailable()) {
    throw new Error('rrweb is not available');
  }

  const defaultConfig = {
    emit: (event) => {
      console.log('Session event recorded:', event.type);
    },
    recordCanvas: false,
    recordCrossOriginIframes: false,
    recordAfter: 'DOMContentLoaded',
    inlineStylesheet: true,
    collectFonts: false,
    maskAllInputs: false,
    maskInputOptions: {},
    slimDOMOptions: {},
    recordInputs: true,
    recordClicks: true,
    recordScrolls: true,
    recordMutations: true
  };

  const recordingConfig = { ...defaultConfig, ...config };
  
  return window.rrweb.record(recordingConfig);
}

/**
 * Stop session recording
 * @param {Object} stopFn - Stop function returned by rrweb.record
 */
export function stopRecording(stopFn) {
  if (typeof stopFn === 'function') {
    stopFn();
  }
}

// Default export
export default {
  loadSessionReplayScript,
  isRrwebAvailable,
  waitForRrweb,
  startRecording,
  stopRecording
};
