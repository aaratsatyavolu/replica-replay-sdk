/**
 * Vue.js integration template for session replay
 * This file contains example code for integrating session replay with Vue applications
 */

// Example 1: Basic integration in main.js
export const BasicVueIntegration = `
// main.js
import { createApp } from 'vue';
import { initSessionReplay } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);

// Initialize session replay
initSessionReplay({
  projectKey: '{{PROJECT_KEY}}',
  secretKey: '{{SECRET_KEY}}'
});

app.mount('#app');
`;

// Example 2: Using Vue plugin
export const VuePluginIntegration = `
// main.js
import { createApp } from 'vue';
import { SessionReplayPlugin } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);

// Install session replay plugin
app.use(SessionReplayPlugin, {
  projectKey: '{{PROJECT_KEY}}',
  secretKey: '{{SECRET_KEY}}'
});

app.mount('#app');
`;

// Example 3: Integration in Vue component
export const VueComponentIntegration = `
// App.vue
<template>
  <div id="app">
    <div v-if="replayError" class="error">
      Session replay error: {{ replayError }}
    </div>
    <div v-if="replayInitialized" class="success">
      Session replay active
    </div>
    <!-- Your app content -->
  </div>
</template>

<script>
import { initSessionReplay } from '@replica-replay/core';

export default {
  name: 'App',
  data() {
    return {
      replayInitialized: false,
      replayError: null
    };
  },
  mounted() {
    try {
      initSessionReplay({
        projectKey: 'PROJECT_KEY',
        secretKey: 'SECRET_KEY'
      });
      this.replayInitialized = true;
    } catch (error) {
      this.replayError = error.message;
    }
  }
};
</script>
`;

// Example 4: Vue 3 Composition API
export const VueCompositionAPI = `
// App.vue
<template>
  <div id="app">
    <div v-if="error" class="error">
      Session replay error: {{ error }}
    </div>
    <div v-if="isInitialized" class="success">
      Session replay active
    </div>
    <!-- Your app content -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initSessionReplay } from '@replica-replay/core';

const isInitialized = ref(false);
const error = ref(null);

onMounted(async () => {
  try {
    await initSessionReplay({
      projectKey: 'PROJECT_KEY',
      secretKey: 'SECRET_KEY'
    });
    isInitialized.value = true;
  } catch (err) {
    error.value = err.message;
  }
});
</script>
`;

// Example 5: Vue Router integration
export const VueRouterIntegration = `
// main.js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { initSessionReplay } from '@replica-replay/core';
import App from './App.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

// Initialize session replay before mounting
initSessionReplay({
  projectKey: 'PROJECT_KEY',
  secretKey: 'SECRET_KEY'
});

app.use(router);
app.mount('#app');
`;

// Example 6: Conditional loading with environment variables
export const ConditionalVueLoading = `
// main.js
import { createApp } from 'vue';
import { initSessionReplay } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);

// Only load in production or when explicitly enabled
if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_REPLAY === 'true') {
  initSessionReplay({
    projectKey: import.meta.env.VITE_REPLAY_PROJECT_KEY,
    secretKey: import.meta.env.VITE_REPLAY_SECRET_KEY
  });
}

app.mount('#app');
`;

// Example 7: Custom Vue plugin
export const CustomVuePlugin = `
// plugins/sessionReplay.js
import { initSessionReplay } from '@replica-replay/core';

export default {
  install(app, options) {
    const config = {
      projectKey: options.projectKey,
      secretKey: options.secretKey,
      ...options
    };

    try {
      initSessionReplay(config);
      
      // Add global properties
      app.config.globalProperties.$replay = {
        initialized: true,
        config
      };
      
      // Provide for composition API
      app.provide('replay', {
        initialized: true,
        config
      });
    } catch (error) {
      console.error('Failed to initialize session replay:', error);
      app.config.globalProperties.$replay = {
        initialized: false,
        error: error.message
      };
    }
  }
};

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import SessionReplayPlugin from './plugins/sessionReplay';

const app = createApp(App);

app.use(SessionReplayPlugin, {
  projectKey: 'PROJECT_KEY',
  secretKey: 'SECRET_KEY'
});

app.mount('#app');
`;

// Default export with all examples
export default {
  BasicVueIntegration,
  VuePluginIntegration,
  VueComponentIntegration,
  VueCompositionAPI,
  VueRouterIntegration,
  ConditionalVueLoading,
  CustomVuePlugin
};
