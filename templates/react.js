/**
 * React integration template for session replay
 * This file contains example code for integrating session replay with React applications
 */

// Example 1: Basic integration in App component
export const BasicReactIntegration = `
// App.js
import React, { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

function App() {
  useEffect(() => {
    initSessionReplay({
      projectKey: '{{PROJECT_KEY}}',
      secretKey: '{{SECRET_KEY}}'
    });
  }, []);

  return (
    <div className="App">
      {/* Your app content */}
    </div>
  );
}

export default App;
`;

// Example 2: Using environment variables
export const ReactEnvIntegration = `
// App.js
import React, { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

function App() {
  useEffect(() => {
    initSessionReplay({
      projectKey: process.env.REACT_APP_REPLAY_PROJECT_KEY,
      secretKey: process.env.REACT_APP_REPLAY_SECRET_KEY
    });
  }, []);

  return (
    <div className="App">
      {/* Your app content */}
    </div>
  );
}

export default App;
`;

// Example 3: Custom hook with configuration
export const CustomReactHook = `
// hooks/useSessionReplay.js
import { useEffect, useState } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export function useSessionReplay(config) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config.projectKey || !config.secretKey) {
      setError('Project key and secret key are required');
      return;
    }

    try {
      initSessionReplay(config);
      setIsInitialized(true);
    } catch (err) {
      setError(err.message);
    }
  }, [config.projectKey, config.secretKey]);

  return { isInitialized, error };
}

// App.js
import React from 'react';
import { useSessionReplay } from './hooks/useSessionReplay';

function App() {
  const { isInitialized, error } = useSessionReplay({
    projectKey: 'PROJECT_KEY',
    secretKey: 'SECRET_KEY'
  });

  return (
    <div className="App">
      {error && <div>Error: {error}</div>}
      {isInitialized && <div>Session replay initialized</div>}
      {/* Your app content */}
    </div>
  );
}

export default App;
`;

// Example 4: Integration with React Router
export const ReactRouterIntegration = `
// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initSessionReplay } from '@replica-replay/core';

function App() {
  useEffect(() => {
    // Initialize session replay once when app loads
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* More routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
`;

// Example 5: Conditional loading based on environment
export const ConditionalLoading = `
// App.js
import React, { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

function App() {
  useEffect(() => {
    // Only load in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENABLE_REPLAY === 'true') {
      initSessionReplay({
        projectKey: process.env.REACT_APP_REPLAY_PROJECT_KEY,
        secretKey: process.env.REACT_APP_REPLAY_SECRET_KEY
      });
    }
  }, []);

  return (
    <div className="App">
      {/* Your app content */}
    </div>
  );
}

export default App;
`;

// Default export with all examples
export default {
  BasicReactIntegration,
  ReactHookIntegration,
  CustomReactHook,
  ReactRouterIntegration,
  ConditionalLoading
};
