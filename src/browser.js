/**
 * Browser-specific utilities for session replay
 * Handles browser detection, feature support, and environment checks
 */

/**
 * Detect the current browser and version
 * @returns {Object} Browser information
 */
export function detectBrowser() {
  const userAgent = navigator.userAgent;
  
  const browsers = {
    chrome: /Chrome\/(\d+)/,
    firefox: /Firefox\/(\d+)/,
    safari: /Safari\/(\d+)/,
    edge: /Edg\/(\d+)/,
    opera: /OPR\/(\d+)/
  };
  
  for (const [name, regex] of Object.entries(browsers)) {
    const match = userAgent.match(regex);
    if (match) {
      return {
        name,
        version: parseInt(match[1]),
        userAgent
      };
    }
  }
  
  return {
    name: 'unknown',
    version: 0,
    userAgent
  };
}

/**
 * Check if the browser supports required features
 * @returns {Object} Feature support information
 */
export function checkFeatureSupport() {
  const features = {
    // Core features
    es6Modules: typeof Symbol !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    promises: typeof Promise !== 'undefined',
    
    // DOM features
    querySelector: typeof document.querySelector === 'function',
    addEventListener: typeof document.addEventListener === 'function',
    
    // Storage features
    localStorage: typeof localStorage !== 'undefined',
    sessionStorage: typeof sessionStorage !== 'undefined',
    
    // Performance features
    performance: typeof performance !== 'undefined',
    requestAnimationFrame: typeof requestAnimationFrame !== 'function',
    
    // Modern features
    intersectionObserver: typeof IntersectionObserver !== 'undefined',
    mutationObserver: typeof MutationObserver !== 'undefined'
  };
  
  return features;
}

/**
 * Check if the current environment is suitable for session replay
 * @returns {Object} Environment check results
 */
export function checkEnvironment() {
  const browser = detectBrowser();
  const features = checkFeatureSupport();
  
  const isSupported = 
    features.es6Modules &&
    features.fetch &&
    features.promises &&
    features.querySelector &&
    features.addEventListener;
  
  const warnings = [];
  
  if (!features.localStorage) {
    warnings.push('localStorage not available - session persistence may be limited');
  }
  
  if (!features.performance) {
    warnings.push('Performance API not available - timing data may be limited');
  }
  
  if (browser.name === 'safari' && browser.version < 14) {
    warnings.push('Older Safari version detected - some features may not work');
  }
  
  if (browser.name === 'firefox' && browser.version < 60) {
    warnings.push('Older Firefox version detected - some features may not work');
  }
  
  return {
    isSupported,
    browser,
    features,
    warnings
  };
}

/**
 * Get device information
 * @returns {Object} Device information
 */
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset()
  };
}

/**
 * Check if the page is in a secure context
 * @returns {boolean}
 */
export function isSecureContext() {
  return window.isSecureContext || location.protocol === 'https:';
}

/**
 * Get network information if available
 * @returns {Object|null}
 */
export function getNetworkInfo() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }
  
  return null;
}

/**
 * Detect if the page is likely in an iframe
 * @returns {boolean}
 */
export function isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

/**
 * Get page visibility state
 * @returns {string}
 */
export function getVisibilityState() {
  return document.visibilityState || 'visible';
}

/**
 * Check if the page is currently visible
 * @returns {boolean}
 */
export function isPageVisible() {
  return getVisibilityState() === 'visible';
}

// Default export
export default {
  detectBrowser,
  checkFeatureSupport,
  checkEnvironment,
  getDeviceInfo,
  isSecureContext,
  getNetworkInfo,
  isInIframe,
  getVisibilityState,
  isPageVisible
};
