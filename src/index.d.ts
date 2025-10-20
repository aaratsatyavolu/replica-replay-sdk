/**
 * @replica-replay/core - Session Replay SDK Type Definitions
 */

/**
 * Configuration object for session replay initialization
 */
export interface SessionReplayConfig {
  /** Project key for identification */
  projectKey: string;
  /** Secret key for authentication */
  secretKey: string;
  /** Server URL (optional, defaults to production) */
  serverUrl?: string;
}

/**
 * Initialize session replay with required configuration
 * @param config - Configuration object with projectKey and secretKey
 * @returns Promise that resolves when initialization is complete
 */
export function initSessionReplay(config: SessionReplayConfig): Promise<void>;

/**
 * Vue plugin for session replay
 */
export interface SessionReplayPlugin {
  install(app: any, config: SessionReplayConfig): Promise<void>;
}

export const SessionReplayPlugin: SessionReplayPlugin;

/**
 * Check if session replay is available in the current environment
 * @returns true if session replay can be initialized
 */
export function isSessionReplayAvailable(): boolean;

/**
 * Get the current session replay configuration from loaded script
 * @returns Configuration object if session replay is loaded, null otherwise
 */
export function getSessionReplayConfig(): SessionReplayConfig | null;

/**
 * Default export containing all session replay functions
 */
declare const _default: {
  initSessionReplay: typeof initSessionReplay;
  SessionReplayPlugin: SessionReplayPlugin;
  isSessionReplayAvailable: typeof isSessionReplayAvailable;
  getSessionReplayConfig: typeof getSessionReplayConfig;
};

export default _default;
