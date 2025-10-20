/**
 * Next.js integration template for session replay
 * This file contains example code for integrating session replay with Next.js applications
 */

// Example 1: Basic integration in _app.js
export const BasicNextjsIntegration = `
// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSessionReplay({
      projectKey: '{{PROJECT_KEY}}',
      secretKey: '{{SECRET_KEY}}'
    });
  }, []);

  return <Component {...pageProps} />;
}
`;

// Example 2: Integration with App Router (Next.js 13+)
export const NextjsAppRouterIntegration = `
// app/layout.js
'use client';

import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function RootLayout({ children }) {
  useEffect(() => {
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

// Example 3: Custom hook for Next.js
export const NextjsCustomHook = `
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

// pages/_app.js
import { useSessionReplay } from '../hooks/useSessionReplay';

export default function App({ Component, pageProps }) {
  const { isInitialized, error } = useSessionReplay({
    projectKey: 'PROJECT_KEY',
    secretKey: 'SECRET_KEY'
  });

  if (error) {
    console.error('Session replay error:', error);
  }

  return <Component {...pageProps} />;
}
`;

// Example 4: Environment-based configuration
export const NextjsEnvironmentConfig = `
// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Only load in production or when explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_REPLAY === 'true') {
      initSessionReplay({
        projectKey: process.env.NEXT_PUBLIC_REPLAY_PROJECT_KEY,
        secretKey: process.env.NEXT_PUBLIC_REPLAY_SECRET_KEY
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

// .env.local
NEXT_PUBLIC_ENABLE_REPLAY=true
NEXT_PUBLIC_REPLAY_PROJECT_KEY=your_project_key
NEXT_PUBLIC_REPLAY_SECRET_KEY=your_secret_key
`;

// Example 5: Integration with Next.js middleware
export const NextjsMiddlewareIntegration = `
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add session replay script to response
  const response = NextResponse.next();
  
  // You can add custom headers or modify response here
  response.headers.set('X-Session-Replay', 'enabled');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }, []);

  return <Component {...pageProps} />;
}
`;

// Example 6: TypeScript integration
export const NextjsTypeScriptIntegration = `
// pages/_app.tsx
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { initSessionReplay } from '@replica-replay/core';

interface SessionReplayConfig {
  projectKey: string;
  secretKey: string;
  serverUrl?: string;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const config: SessionReplayConfig = {
      projectKey: process.env.NEXT_PUBLIC_REPLAY_PROJECT_KEY || '',
      secretKey: process.env.NEXT_PUBLIC_REPLAY_SECRET_KEY || ''
    };

    if (config.projectKey && config.secretKey) {
      initSessionReplay(config);
    }
  }, []);

  return <Component {...pageProps} />;
}
`;

// Example 7: Integration with Next.js analytics
export const NextjsAnalyticsIntegration = `
// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize session replay
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });

    // Track route changes
    const handleRouteChange = (url) => {
      // Session replay will automatically track navigation
      console.log('Route changed to:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
`;

// Example 8: Server-side rendering considerations
export const NextjsSSRIntegration = `
// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

// Or with dynamic import to avoid SSR issues
// pages/_app.js
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const SessionReplay = dynamic(
  () => import('../components/SessionReplay'),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionReplay />
      <Component {...pageProps} />
    </>
  );
}

// components/SessionReplay.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function SessionReplay() {
  useEffect(() => {
    initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
  }, []);

  return null; // This component doesn't render anything
}
`;

// Default export with all examples
export default {
  BasicNextjsIntegration,
  NextjsAppRouterIntegration,
  NextjsCustomHook,
  NextjsEnvironmentConfig,
  NextjsMiddlewareIntegration,
  NextjsTypeScriptIntegration,
  NextjsAnalyticsIntegration,
  NextjsSSRIntegration
};
