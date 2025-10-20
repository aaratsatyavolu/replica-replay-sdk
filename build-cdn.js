#!/usr/bin/env node

/**
 * Build script for CDN distribution bundle
 * 
 * Creates a standalone browser bundle that can be loaded via script tag.
 * Uses esbuild to create a minified, self-contained JavaScript file.
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function buildCDN() {
  console.log('🏗️  Building CDN bundle...');
  
  // Ensure build directory exists
  const buildDir = path.join(__dirname, 'build', 'cdn');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  try {
    // Build the CDN bundle
    await esbuild.build({
      entryPoints: ['src/cdn.js'],
      bundle: true,
      minify: true,
      sourcemap: false,
      target: ['es2015', 'chrome58', 'firefox57', 'safari11'],
      format: 'iife',
      globalName: 'ReplicaReplay',
      outfile: path.join(buildDir, 'replica-replay.min.js'),
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      banner: {
        js: '/*! @replica-replay/core v1.0.0 - CDN Bundle */'
      }
    });
    
    // Also create a non-minified version for development
    await esbuild.build({
      entryPoints: ['src/cdn.js'],
      bundle: true,
      minify: false,
      sourcemap: true,
      target: ['es2015', 'chrome58', 'firefox57', 'safari11'],
      format: 'iife',
      globalName: 'ReplicaReplay',
      outfile: path.join(buildDir, 'replica-replay.js'),
      define: {
        'process.env.NODE_ENV': '"development"'
      },
      banner: {
        js: '/*! @replica-replay/core v1.0.0 - CDN Bundle (Development) */'
      }
    });
    
    // Create a simple HTML example
    const exampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Replica Replay CDN Example</title>
</head>
<body>
    <h1>Replica Replay CDN Example</h1>
    <p>Open browser console to see session replay initialization.</p>
    
    <!-- Method 1: Load script and initialize manually -->
    <script src="./replica-replay.min.js"></script>
    <script>
        ReplicaReplay.init({
            projectKey: 'YOUR_PROJECT_KEY',
            secretKey: 'YOUR_SECRET_KEY'
        });
    </script>
    
    <!-- Method 2: Auto-initialize with data attributes -->
    <!-- 
    <script 
        src="./replica-replay.min.js" 
        data-project-key="YOUR_PROJECT_KEY" 
        data-secret-key="YOUR_SECRET_KEY">
    </script>
    -->
</body>
</html>`;
    
    fs.writeFileSync(path.join(buildDir, 'example.html'), exampleHTML);
    
    console.log('✅ CDN bundle built successfully!');
    console.log(`📁 Output directory: ${buildDir}`);
    console.log('📄 Files created:');
    console.log('   - replica-replay.min.js (production)');
    console.log('   - replica-replay.js (development)');
    console.log('   - example.html (usage example)');
    console.log('');
    console.log('🚀 Usage:');
    console.log('   <script src="./replica-replay.min.js"></script>');
    console.log('   <script>ReplicaReplay.init({ projectKey: "key", secretKey: "secret" });</script>');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build if this script is executed directly
if (require.main === module) {
  buildCDN();
}

module.exports = { buildCDN };
