#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

console.log('🚀 Auto-deploying Sanity Studio...\n');

// Set environment variables
process.env.SANITY_AUTH_TOKEN = 'skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko';
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'dgwzv4lg';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

const deploy = spawn('npx', ['sanity', 'deploy', '--host', 'ariostudio'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true,
  env: process.env
});

// Handle output
deploy.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  
  // Auto-respond to common prompts
  if (output.includes('hostname') || output.includes('Hostname') || output.includes('host')) {
    deploy.stdin.write('ariostudio\n');
  }
  if (output.includes('yes') || output.includes('Yes') || output.includes('confirm')) {
    deploy.stdin.write('yes\n');
  }
});

deploy.stderr.on('data', (data) => {
  process.stderr.write(data.toString());
});

deploy.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Studio deployed successfully!');
    console.log('🌐 Available at: https://ariostudio.sanity.studio');
  } else {
    console.log(`\n⚠️  Process exited with code ${code}`);
    console.log('💡 You may need to run: npx sanity login');
  }
  process.exit(code);
});

// Handle errors
deploy.on('error', (error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

