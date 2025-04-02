
#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Starting Vite development server...');

try {
  // Use npx to ensure we're using the correct vite binary
  execSync('npx vite', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start Vite development server:', error.message);
  process.exit(1);
}
