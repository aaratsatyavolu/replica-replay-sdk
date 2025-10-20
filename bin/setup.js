#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

async function setup() {
  console.log(chalk.blue.bold('\n🎬 Session Replay Setup\n'));
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectKey',
      message: 'Enter your Project Key:',
      validate: input => {
        if (!input || input.trim().length === 0) {
          return 'Project Key is required';
        }
        if (input.length < 2) {
          return 'Project Key should be at least 2 characters';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'secretKey',
      message: 'Enter your Secret Key:',
      validate: input => {
        if (!input || input.trim().length === 0) {
          return 'Secret Key is required';
        }
        if (input.length < 2) {
          return 'Secret Key should be at least 2 characters';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'framework',
      message: 'What framework are you using?',
      choices: [
        { name: 'React', value: 'react' },
        { name: 'Vue.js', value: 'vue' },
        { name: 'Next.js', value: 'nextjs' },
        { name: 'Vanilla JavaScript', value: 'vanilla' }
      ]
    },
    {
      type: 'list',
      name: 'keyMethod',
      message: 'How would you like to provide your keys?',
      choices: [
        { name: 'Hardcoded in code (simple)', value: 'hardcoded' },
        { name: 'Environment variables (recommended)', value: 'env' }
      ]
    },
    {
      type: 'confirm',
      name: 'autoInstall',
      message: 'Would you like to generate integration code?',
      default: true
    }
  ]);

  const spinner = ora('Setting up session replay...').start();
  
  try {
    const projectKey = answers.projectKey.trim();
    const secretKey = answers.secretKey.trim();
    
    spinner.succeed('Setup complete!');
    
    console.log(chalk.green('\n✅ Setup complete!'));
    
    if (answers.autoInstall) {
      console.log(chalk.yellow('\n📋 Add this code to your application:\n'));
      
      // Generate integration code based on framework and key method
      const template = generateTemplate(answers.framework, answers.keyMethod, projectKey, secretKey);
      console.log(chalk.cyan(template));
      
      // Handle environment variables if chosen
      if (answers.keyMethod === 'env') {
        const envVars = generateEnvVars(answers.framework, projectKey, secretKey);
        console.log(chalk.yellow('\n📄 Create a .env file with these variables:\n'));
        console.log(chalk.cyan(envVars));
        
        // Update .gitignore
        updateGitignore();
      }
    }
    
    console.log(chalk.gray('\n📚 Next Steps:'));
    console.log(chalk.gray('1. Copy the code above into your application'));
    console.log(chalk.gray('2. Test your integration by visiting your website'));
    console.log(chalk.gray('3. Check your dashboard for session data'));
    console.log(chalk.gray('4. Visit: https://rrweb-ingest-825071668012.us-central1.run.app/view/' + projectKey + '/[sessionId]'));
    
    if (answers.keyMethod === 'hardcoded') {
      console.log(chalk.yellow('\n⚠️  Note: Your keys are visible in the client-side code. This is normal for session replay.'));
    } else {
      console.log(chalk.green('\n🔒 Security: Your keys are stored in environment variables (not in git).'));
    }
    
    console.log(chalk.blue('\n🎉 Session replay is ready to use!'));
    
  } catch (error) {
    spinner.fail('Setup failed: ' + error.message);
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

function generateTemplate(framework, keyMethod, projectKey, secretKey) {
  const getConfig = () => {
    if (keyMethod === 'env') {
      const envPrefix = getEnvPrefix(framework);
      return `{
    projectKey: process.env.${envPrefix}_REPLAY_PROJECT_KEY,
    secretKey: process.env.${envPrefix}_REPLAY_SECRET_KEY
  }`;
    } else {
      return `{
    projectKey: '${projectKey}',
    secretKey: '${secretKey}'
  }`;
    }
  };

  const templates = {
    react: `// Add to your main App.js or index.js
import { initSessionReplay } from '@replica-replay/core';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    initSessionReplay(${getConfig()});
  }, []);
  
  return (
    <div>
      {/* Your app content */}
    </div>
  );
}`,
    
    vue: `// Add to your main.js
import { createApp } from 'vue';
import { SessionReplayPlugin } from '@replica-replay/core';
import App from './App.vue';

const app = createApp(App);

// Initialize session replay
app.use(SessionReplayPlugin, ${getConfig()});

app.mount('#app');`,
    
    nextjs: `// Add to pages/_app.js
import { useEffect } from 'react';
import { initSessionReplay } from '@replica-replay/core';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSessionReplay(${getConfig()});
  }, []);

  return <Component {...pageProps} />;
}`,
    
    vanilla: `<!-- Add to your HTML head -->
<script type="module">
  import { initSessionReplay } from '@replica-replay/core';
  
  initSessionReplay(${getConfig()});
</script>

<!-- Or as a regular script tag -->
<script>
  // Load the module first
  import('@replica-replay/core').then(({ initSessionReplay }) => {
    initSessionReplay(${getConfig()});
  });
</script>`
  };
  
  return templates[framework];
}

function generateEnvVars(framework, projectKey, secretKey) {
  const prefix = getEnvPrefix(framework);
  return `${prefix}_REPLAY_PROJECT_KEY=${projectKey}
${prefix}_REPLAY_SECRET_KEY=${secretKey}`;
}

function getEnvPrefix(framework) {
  const prefixes = {
    react: 'REACT_APP',
    nextjs: 'NEXT_PUBLIC',
    vue: 'VITE',
    vanilla: 'VITE' // Default to Vite for vanilla JS
  };
  return prefixes[framework] || 'VITE';
}

function updateGitignore() {
  const gitignorePath = '.gitignore';
  const envEntry = '\n# Environment variables\n.env\n.env.local\n.env.*.local\n';
  
  try {
    let gitignore = '';
    if (fs.existsSync(gitignorePath)) {
      gitignore = fs.readFileSync(gitignorePath, 'utf8');
    }
    
    if (!gitignore.includes('.env')) {
      fs.writeFileSync(gitignorePath, gitignore + envEntry);
      console.log(chalk.green('✅ Updated .gitignore to exclude .env files'));
    }
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not update .gitignore automatically'));
  }
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  console.error(chalk.red('\n❌ Unexpected error:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(chalk.red('\n❌ Unexpected error:'), error.message);
  process.exit(1);
});

// Run setup if this file is executed directly
if (require.main === module) {
  setup();
}

module.exports = { setup };
