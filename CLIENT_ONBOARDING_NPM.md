# Client Onboarding Guide - NPM Package

This guide explains how to onboard new clients to use the session replay system via the npm package.

## Overview

The npm package provides a professional, framework-aware integration for session replay. Clients can install it directly from Git and use a CLI setup wizard to configure their integration.

**Note**: Keys are provided directly in the client code (standard for session replay tools like Google Analytics). The server validates requests by domain/origin for security.

## Client Onboarding Process

### 1. Generate Project Keys

When a new client signs up:

1. **Create company record in Supabase:**
   ```sql
   INSERT INTO companies (name, project_key, secret_key) 
   VALUES ('Client Company Name', '003', '0003');
   ```

2. **Provide keys to client:**
   - Project Key: `003`
   - Secret Key: `0003`
   - Server URL: `https://rrweb-ingest-825071668012.us-central1.run.app`

### 2. Client Installation

The client installs the package:

```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay.git
```

### 3. Client Setup

The client runs the setup wizard:

```bash
npx replay-setup
```

The wizard will prompt for:
- Project Key: `003`
- Secret Key: `0003`
- Framework: React/Vue/Next.js/Vanilla JS
- Generate integration code: Yes

### 4. Integration

The client copies the generated code into their application based on their chosen framework.

## Framework-Specific Instructions

### React

**Installation:**
```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay.git
npx replay-setup
```

**Integration:**
```javascript
// App.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

function App() {
  useEffect(() => {
    initSessionReplay({
      projectKey: '003',
      secretKey: '0003'
    });
  }, []);

  return <div>Your app content</div>;
}
```

### Vue.js

**Installation:**
```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay.git
npx replay-setup
```

**Integration:**
```javascript
// main.js
import { createApp } from 'vue';
import { initSessionReplay } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);

initSessionReplay({
  projectKey: '003',
  secretKey: '0003'
});

app.mount('#app');
```

### Next.js

**Installation:**
```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay.git
npx replay-setup
```

**Integration:**
```javascript
// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSessionReplay({
      projectKey: '003',
      secretKey: '0003'
    });
  }, []);

  return <Component {...pageProps} />;
}
```

### Vanilla JavaScript

**Installation:**
```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay.git
npx replay-setup
```

**Integration:**
```html
<!-- Add to HTML head -->
<script type="module">
  import { initSessionReplay } from '@replica-replay/core';
  
  initSessionReplay({
    projectKey: '003',
    secretKey: '0003'
  });
</script>
```

## Verification Steps

### 1. Check Installation

Verify the package is installed:

```bash
npm list @replica-replay/core
```

### 2. Test Integration

1. **Add the integration code** to the client's application
2. **Deploy or run** the application locally
3. **Visit the website** and perform some interactions
4. **Check the dashboard** for session data

### 3. Verify Data Flow

Check that data is flowing correctly:

1. **GCS Bucket**: Look for new files in `003/dt=YYYY-MM-DD/sessionId=.../`
2. **Supabase**: Check the `sessions` table for new records with `project_key = '003'`
3. **Replay Viewer**: Visit `https://rrweb-ingest-825071668012.us-central1.run.app/view/003/[sessionId]`

## Troubleshooting

### Common Issues

**Package installation fails:**
- Ensure Git is installed and accessible
- Check network connectivity
- Verify the repository URL is correct

**Setup wizard fails:**
- Check that Node.js version is 14 or higher
- Ensure npm is up to date
- Try running with `--verbose` flag

**No data appearing:**
- Verify project key and secret key are correct
- Check browser console for errors
- Ensure the website is receiving traffic
- Check that ad blockers aren't blocking the script

**Framework-specific issues:**
- React: Ensure useEffect is used correctly
- Vue: Check that the plugin is installed properly
- Next.js: Verify the code is in `_app.js` or `_app.tsx`
- Vanilla JS: Ensure the script is in the HTML head

### Debug Mode

Enable debug logging for troubleshooting:

```javascript
initSessionReplay({
  projectKey: '003',
  secretKey: '0003',
  debug: true
});
```

## Support Process

### 1. Initial Support

- Provide the client with their project key and secret key
- Share the installation and setup instructions
- Offer to help with the initial integration

### 2. Ongoing Support

- Monitor the client's data flow
- Provide updates when new features are released
- Help with any integration issues

### 3. Escalation

For complex issues:
- Check server logs in Google Cloud Console
- Verify Supabase database records
- Test with the client's specific configuration

## Client Communication

### Email Template

```
Subject: Session Replay Integration - Your Project Keys

Hi [Client Name],

Thank you for signing up for session replay! Here are your integration details:

Project Key: 003
Secret Key: 0003
Server URL: https://rrweb-ingest-825071668012.us-central1.run.app

Installation:
1. npm install git+https://github.com/aaratsatyavolu/replica-replay.git
2. npx replay-setup
3. Follow the setup wizard prompts

Documentation: https://github.com/aaratsatyavolu/replica-replay

Let me know if you need any help with the integration!

Best regards,
[Your Name]
```

### Follow-up Checklist

- [ ] Client has installed the package
- [ ] Client has run the setup wizard
- [ ] Client has integrated the code
- [ ] Data is flowing to GCS and Supabase
- [ ] Client can view session replays
- [ ] Client understands how to use the dashboard

## Backward Compatibility

Existing clients using the script tag method can continue using it:

```html
<script src="https://rrweb-ingest-825071668012.us-central1.run.app/s/002/0002/init.js"></script>
```

No migration is required, but they can upgrade to the npm package for better integration and framework support.

## Success Metrics

Track the success of the npm package onboarding:

- **Installation rate**: How many clients successfully install the package
- **Integration rate**: How many clients complete the setup wizard
- **Data flow rate**: How many clients have data flowing to Supabase/GCS
- **Support tickets**: Number of support requests related to npm package
- **Client satisfaction**: Feedback from clients about the onboarding process
