
const { execSync } = require('child_process');

console.log('Checking for required dependencies...');

try {
  // First ensure vite is installed locally
  console.log('Installing required dependencies if needed...');
  execSync('npm install --save-dev vite@latest @vitejs/plugin-react-swc lovable-tagger', { stdio: 'inherit' });
  
  console.log('Starting Vite development server...');
  // Use npx to ensure we're using the correct vite binary
  execSync('npx vite', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start Vite development server:', error.message);
  process.exit(1);
}
