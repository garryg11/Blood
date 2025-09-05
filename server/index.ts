#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting LabClear development servers...');
console.log('📱 Frontend will be available at: http://localhost:3000');
console.log('🔧 Backend API will be available at: http://localhost:8000');
console.log('📖 API docs will be available at: http://localhost:8000/docs');
console.log('');
console.log('Press Ctrl+C to stop both servers');
console.log('-'.repeat(50));

// Start the Python development script
const pythonProcess = spawn('python', ['run_dev.py'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⏹️  Stopping development servers...');
  pythonProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  pythonProcess.kill('SIGTERM');
  process.exit(0);
});

pythonProcess.on('close', (code) => {
  console.log(`\n⏹️  Development servers stopped with code ${code}`);
  process.exit(code || 0);
});

pythonProcess.on('error', (error) => {
  console.error('❌ Error starting development servers:', error);
  process.exit(1);
});