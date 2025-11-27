#!/usr/bin/env node

/**
 * Create Sanity Studio Deployment via API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'dgwzv4lg';
const API_TOKEN = 'skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko';
const HOSTNAME = 'ariostudio';

console.log('🚀 Creating Sanity Studio Deployment...\n');
console.log('Project ID:', PROJECT_ID);
console.log('Hostname:', HOSTNAME);
console.log('Target URL: https://' + HOSTNAME + '.sanity.studio\n');

// The Sanity Management API endpoint for creating studio deployments
// Note: This may require different authentication or endpoints
const options = {
  hostname: 'api.sanity.io',
  port: 443,
  path: `/v1/projects/${PROJECT_ID}/studios`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  }
};

const postData = JSON.stringify({
  name: HOSTNAME,
  hostname: HOSTNAME,
  dataset: 'production'
});

console.log('📡 Sending deployment request...\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ Studio deployment created successfully!');
      console.log('🌐 Your studio should be available at: https://' + HOSTNAME + '.sanity.studio');
      try {
        const response = JSON.parse(data);
        console.log('\nResponse:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('\nResponse:', data);
      }
    } else {
      console.log('❌ Deployment failed with status:', res.statusCode);
      console.log('Response:', data);
      console.log('\n💡 This API endpoint may not be available.');
      console.log('   Please use: npx sanity deploy');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
  console.log('\n💡 The Management API may not support direct studio creation.');
  console.log('   Please use the CLI: npx sanity deploy');
});

req.write(postData);
req.end();

