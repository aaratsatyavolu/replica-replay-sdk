# CDN Implementation Guide

**Complete guide for implementing Replica Replay via CDN**

## Overview

The CDN implementation provides the fastest way to add session replay to any website. With just one script tag, you can start recording user sessions in under 30 seconds.

## Available Builds

### Production Builds

- **`replica-replay.min.js`** - Full production build (recommended)
  - Size: ~45KB gzipped
  - Features: All functionality, auto-initialization, error handling
  - Use for: Production websites

- **`replica-replay-minimal.min.js`** - Minimal production build
  - Size: ~35KB gzipped
  - Features: Core functionality only
  - Use for: Performance-critical applications

### Development Builds

- **`replica-replay-dev.js`** - Development build with debugging
  - Size: ~60KB (unminified)
  - Features: All functionality + debug logging
  - Use for: Development and testing

- **`replica-replay.js`** - Unminified production build
  - Size: ~80KB (unminified)
  - Features: All functionality, readable code
  - Use for: Debugging production issues

## Implementation Methods

### Method 1: Auto-Initialize with URL Parameters

**Best for:** Simple websites, landing pages, quick implementations

```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET" 
  crossorigin="anonymous">
</script>
```

**Features:**
- ✅ Automatic initialization
- ✅ No additional JavaScript required
- ✅ Works immediately on page load
- ✅ Supports debug mode: `&debug=true`

**Example with debug mode:**
```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET&debug=true" 
  crossorigin="anonymous">
</script>
```

### Method 2: Auto-Initialize with Data Attributes

**Best for:** Clean HTML, semantic markup, when you prefer attributes over URL params

```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js" 
  data-project-key="YOUR_KEY" 
  data-secret-key="YOUR_SECRET"
  data-debug="true"
  crossorigin="anonymous">
</script>
```

**Features:**
- ✅ Automatic initialization
- ✅ Clean, semantic HTML
- ✅ No URL parameters
- ✅ Supports debug mode: `data-debug="true"`

### Method 3: Manual Initialization

**Best for:** Advanced control, custom callbacks, conditional loading

```html
<script src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js"></script>
<script>
  ReplicaReplay.init({
    projectKey: 'YOUR_KEY',
    secretKey: 'YOUR_SECRET',
    onSuccess: (message) => {
      console.log('✅ Session replay ready:', message);
      // Custom success handling
    },
    onError: (error) => {
      console.error('❌ Session replay failed:', error);
      // Custom error handling
    }
  });
</script>
```

**Features:**
- ✅ Full control over initialization timing
- ✅ Custom success/error callbacks
- ✅ Conditional loading logic
- ✅ Integration with existing JavaScript

## Advanced Usage

### Custom Server URL

```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET&serverUrl=https://custom-server.com" 
  crossorigin="anonymous">
</script>
```

### Conditional Loading

```html
<script>
  // Only load on production
  if (window.location.hostname !== 'localhost') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
</script>
```

### Integration with Analytics

```html
<script src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js"></script>
<script>
  // Initialize after Google Analytics
  gtag('config', 'GA_MEASUREMENT_ID', {
    custom_map: {
      'custom_parameter_1': 'session_replay'
    }
  });
  
  ReplicaReplay.init({
    projectKey: 'YOUR_KEY',
    secretKey: 'YOUR_SECRET',
    onSuccess: () => {
      gtag('event', 'session_replay_loaded', {
        event_category: 'engagement',
        event_label: 'replica_replay'
      });
    }
  });
</script>
```

## Framework Integration

### React (CDN)

```html
<!DOCTYPE html>
<html>
<head>
  <script 
    src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET" 
    crossorigin="anonymous">
  </script>
</head>
<body>
  <div id="root"></div>
  <!-- React app loads here -->
</body>
</html>
```

### Vue (CDN)

```html
<!DOCTYPE html>
<html>
<head>
  <script 
    src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET" 
    crossorigin="anonymous">
  </script>
</head>
<body>
  <div id="app"></div>
  <!-- Vue app loads here -->
</body>
</html>
```

### WordPress

Add to your theme's `header.php` or use a plugin:

```php
// In header.php, before closing </head> tag
?>
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=<?php echo get_option('replica_project_key'); ?>&secretKey=<?php echo get_option('replica_secret_key'); ?>" 
  crossorigin="anonymous">
</script>
<?php
```

### Shopify

Add to your theme's `theme.liquid`:

```liquid
<!-- In theme.liquid, before closing </head> tag -->
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey={{ settings.replica_project_key }}&secretKey={{ settings.replica_secret_key }}" 
  crossorigin="anonymous">
</script>
```

## Debugging and Troubleshooting

### Enable Debug Mode

Add `debug=true` to see detailed logging:

```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay-dev.js?projectKey=YOUR_KEY&secretKey=YOUR_SECRET&debug=true" 
  crossorigin="anonymous">
</script>
```

### Check Initialization Status

```javascript
// Check if ReplicaReplay is available
if (window.ReplicaReplay) {
  console.log('ReplicaReplay loaded:', window.ReplicaReplay.version);
  
  // Check if initialized
  if (window.ReplicaReplay.isAvailable()) {
    console.log('Session replay is active');
    console.log('Config:', window.ReplicaReplay.getConfig());
  } else {
    console.log('Session replay not initialized');
  }
} else {
  console.error('ReplicaReplay not loaded');
}
```

### Common Issues

#### 1. Script Not Loading

**Symptoms:** No console messages, ReplicaReplay undefined

**Solutions:**
- Check network tab for 404 errors
- Verify URL is correct
- Check CORS settings
- Try different CDN (jsDelivr, unpkg, etc.)

#### 2. Auto-Initialization Not Working

**Symptoms:** Script loads but no initialization messages

**Solutions:**
- Check projectKey and secretKey are correct
- Verify parameters are properly encoded
- Check browser console for errors
- Try manual initialization

#### 3. CORS Errors

**Symptoms:** Cross-origin request blocked

**Solutions:**
- Add `crossorigin="anonymous"` to script tag
- Check server CORS configuration
- Use same-origin script if possible

## Performance Considerations

### Script Loading

- **Async loading:** Scripts load asynchronously by default
- **Defer execution:** Initialization waits for DOM ready
- **Minimal impact:** ~45KB gzipped, loads in background

### Best Practices

1. **Load early:** Place script in `<head>` for faster initialization
2. **Use production build:** Use `.min.js` for production
3. **Enable compression:** Ensure gzip/brotli compression
4. **Monitor performance:** Check Core Web Vitals impact

### Bundle Size Comparison

| Build | Size (gzipped) | Use Case |
|-------|----------------|----------|
| replica-replay.min.js | ~45KB | Production (recommended) |
| replica-replay-minimal.min.js | ~35KB | Performance-critical |
| replica-replay-dev.js | ~60KB | Development only |
| replica-replay.js | ~80KB | Debugging |

## Security Considerations

### Client-Side Keys

- Keys are visible in client code (standard for analytics)
- Server validates requests by domain/origin
- No sensitive data is exposed
- Similar to Google Analytics implementation

### HTTPS Only

- Always use HTTPS in production
- CDN serves over HTTPS by default
- Mixed content warnings if HTTP

### Content Security Policy

If using CSP, add to your policy:

```
script-src 'self' https://cdn.jsdelivr.net;
connect-src 'self' https://rrweb-ingest-825071668012.us-central1.run.app;
```

## Migration from NPM

### From NPM to CDN

**Before (NPM):**
```javascript
import { initSessionReplay } from '@replica-replay/core';
initSessionReplay({
  projectKey: 'your-key',
  secretKey: 'your-secret'
});
```

**After (CDN):**
```html
<script 
  src="https://cdn.jsdelivr.net/gh/aaratsatyavolu/replica-replay-sdk@main/build/cdn/replica-replay.min.js?projectKey=your-key&secretKey=your-secret" 
  crossorigin="anonymous">
</script>
```

### Benefits of Migration

- ✅ Faster setup (30 seconds vs 2 minutes)
- ✅ No build process required
- ✅ Automatic updates via CDN
- ✅ Smaller bundle size
- ✅ Better caching

## Examples and Demos

### Live Examples

Visit the examples directory for interactive demos:

- [Auto-init with URL params](build/cdn/examples/auto-init-url.html)
- [Auto-init with data attributes](build/cdn/examples/auto-init-data.html)
- [Manual initialization](build/cdn/examples/manual-init.html)
- [Advanced usage](build/cdn/examples/advanced.html)

### Test Your Implementation

1. **Load the script** with your credentials
2. **Interact with the page** (click, type, scroll)
3. **Check console** for initialization messages
4. **Verify recording** in your dashboard

## Support and Resources

### Documentation

- [Main README](README.md) - Complete SDK documentation
- [Client Onboarding](CLIENT_ONBOARDING_NPM.md) - Step-by-step setup guide
- [API Reference](README.md#api-reference) - Function documentation

### Getting Help

1. **Check console** for error messages
2. **Enable debug mode** for detailed logging
3. **Try examples** to verify setup
4. **Contact support** with specific error details

### Updates

- CDN automatically serves latest version
- Check [releases](https://github.com/aaratsatyavolu/replica-replay-sdk/releases) for updates
- Subscribe to notifications for new features

---

**Ready to get started?** Choose your implementation method above and start recording user sessions in under 30 seconds!
