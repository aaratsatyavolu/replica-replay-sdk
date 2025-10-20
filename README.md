# @replica-replay/core

**Zero-config session replay and user behavior analytics**

## 🚀 Quick Start

### 1. Install

```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay-sdk.git
```

### 2. Setup (One-time)

```bash
npx replay-setup
```

Enter your Project Key and Secret Key when prompted. The setup wizard will generate integration code for your framework.

### 3. Add to Your App

**React:**
```javascript
import { initSessionReplay } from '@replica-replay/core';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    initSessionReplay({
      projectKey: 'your-project-key',
      secretKey: 'your-secret-key'
    });
  }, []);
  
  return <div>Your app content</div>;
}
```

**Vue:**
```javascript
import { createApp } from 'vue';
import { SessionReplayPlugin } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);
app.use(SessionReplayPlugin, {
  projectKey: 'your-project-key',
  secretKey: 'your-secret-key'
});
app.mount('#app');
```

**Next.js:**
```javascript
// pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSessionReplay({
      projectKey: 'your-project-key',
      secretKey: 'your-secret-key'
    });
  }, []);

  return <Component {...pageProps} />;
}
```

**Vanilla JS:**
```html
<script type="module">
  import { initSessionReplay } from '@replica-replay/core';
  initSessionReplay({
    projectKey: 'your-project-key',
    secretKey: 'your-secret-key'
  });
</script>
```

## 🔒 Security Features

- ✅ **Environment variable support** for production deployments
- ✅ **Client-side keys** (standard for session replay - like Google Analytics)
- ✅ **Server-side validation** by domain/origin
- ✅ **CDN distribution** for easy script tag integration
- ✅ **Backward compatibility** with existing script tag integrations

## 🌍 Environment Variables

For production deployments, use environment variables:

**React:**
```bash
# .env
REACT_APP_REPLAY_PROJECT_KEY=your-project-key
REACT_APP_REPLAY_SECRET_KEY=your-secret-key
```

```javascript
initSessionReplay({
  projectKey: process.env.REACT_APP_REPLAY_PROJECT_KEY,
  secretKey: process.env.REACT_APP_REPLAY_SECRET_KEY
});
```

**Next.js:**
```bash
# .env.local
NEXT_PUBLIC_REPLAY_PROJECT_KEY=your-project-key
NEXT_PUBLIC_REPLAY_SECRET_KEY=your-secret-key
```

**Vue (Vite):**
```bash
# .env
VITE_REPLAY_PROJECT_KEY=your-project-key
VITE_REPLAY_SECRET_KEY=your-secret-key
```

## 🌐 CDN Distribution

For simple integration without npm, use the CDN version:

```html
<!-- Load the script -->
<script src="https://your-cdn.com/replica-replay.min.js"></script>

<!-- Initialize -->
<script>
  ReplicaReplay.init({
    projectKey: 'your-project-key',
    secretKey: 'your-secret-key'
  });
</script>
```

Or auto-initialize with data attributes:

```html
<script 
  src="https://your-cdn.com/replica-replay.min.js"
  data-project-key="your-project-key"
  data-secret-key="your-secret-key">
</script>
```

## 🛠️ Advanced Configuration

### Custom Server URL

```javascript
initSessionReplay({
  projectKey: 'your-project-key',
  secretKey: 'your-secret-key',
  serverUrl: 'https://custom-server.com'
});
```

## 📊 What Gets Recorded

Session replay automatically captures:

- **Page navigation** and URL changes
- **Mouse clicks** and touch interactions  
- **Scrolling** behavior
- **Form inputs** and interactions
- **DOM changes** and mutations
- **Console errors** and warnings

## 🔧 Troubleshooting

### "projectKey is required" Error

Make sure you're passing the required configuration:

```javascript
initSessionReplay({
  projectKey: 'your-project-key',  // Required
  secretKey: 'your-secret-key'     // Required
});
```

### Environment Variables Not Working

1. **React**: Use `REACT_APP_` prefix
2. **Next.js**: Use `NEXT_PUBLIC_` prefix  
3. **Vue**: Use `VITE_` prefix
4. Restart your development server after adding env vars
5. Check that `.env` file is in your project root

### No Data in Dashboard

1. Verify your Project Key and Secret Key are correct
2. Check browser console for error messages
3. Ensure ad blockers aren't blocking the script
4. Test with the [bypass methods](https://github.com/aaratsatyavolu/replica-replay/blob/main/ADBLOCKER_BYPASS_GUIDE.md)
5. Verify the script loads from: `https://rrweb-ingest-825071668012.us-central1.run.app/s/{projectKey}/{secretKey}/init.js`

## 🔄 Migration from Script Tag

If you're currently using the script tag method:

```html
<!-- Old method -->
<script src="https://rrweb-ingest-825071668012.us-central1.run.app/s/002/0002/init.js"></script>
```

Migrate to the npm package:

```bash
npm install git+https://github.com/aaratsatyavolu/replica-replay-sdk.git
npx replay-setup
```

The npm package provides the same functionality with better security and framework support.

## 📚 API Reference

### `initSessionReplay(config)`

Initialize session replay with required configuration.

**Parameters:**
- `config` (object, required): Configuration object
  - `projectKey` (string, required): Project key for identification
  - `secretKey` (string, required): Secret key for authentication  
  - `serverUrl` (string, optional): Server URL (defaults to production)

**Example:**
```javascript
import { initSessionReplay } from '@replica-replay/core';

initSessionReplay({
  projectKey: 'your-project-key',
  secretKey: 'your-secret-key'
});
```

### `SessionReplayPlugin` (Vue)

Vue plugin for session replay integration.

**Example:**
```javascript
import { createApp } from 'vue';
import { SessionReplayPlugin } from '@replica-replay/core';

const app = createApp(App);

app.use(SessionReplayPlugin, {
  projectKey: 'your-project-key',
  secretKey: 'your-secret-key'
});
```

## 🆘 Support

- **Documentation**: [GitHub Repository](https://github.com/aaratsatyavolu/replica-replay-sdk)
- **Issues**: [GitHub Issues](https://github.com/aaratsatyavolu/replica-replay-sdk/issues)
- **Ad Blocker Bypass**: [Bypass Guide](https://github.com/aaratsatyavolu/replica-replay/blob/main/ADBLOCKER_BYPASS_GUIDE.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
