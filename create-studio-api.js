#!/usr/bin/env node

/**
 * Create Sanity Studio via Management API
 */

const https = require('https');

const PROJECT_ID = 'dgwzv4lg';
const API_TOKEN = 'skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko';
const HOSTNAME = 'ariostudio';

console.log('🚀 Creating Sanity Studio via API...\n');

// Try different API endpoints
const endpoints = [
  {
    path: `/v1/projects/${PROJECT_ID}/studios`,
    method: 'POST',
    data: { name: HOSTNAME, hostname: HOSTNAME }
  },
  {
    path: `/v2021-06-07/projects/${PROJECT_ID}/studios`,
    method: 'POST',
    data: { name: HOSTNAME, hostname: HOSTNAME, type: 'internal' }
  },
  {
    path: `/v1/projects/${PROJECT_ID}/deployments`,
    method: 'POST',
    data: { hostname: HOSTNAME, type: 'studio' }
  }
];

let attempt = 0;

function tryEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.sanity.io',
      port: 443,
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    console.log(`📡 Trying: ${endpoint.method} ${endpoint.path}`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ Success!');
          console.log('Response:', data);
          resolve({ success: true, data });
        } else {
          console.log('Response:', data);
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`   Error: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.write(JSON.stringify(endpoint.data));
    req.end();
  });
}

async function tryAllEndpoints() {
  for (const endpoint of endpoints) {
    const result = await tryEndpoint(endpoint);
    if (result.success) {
      console.log('\n🎉 Studio created successfully!');
      console.log(`🌐 Available at: https://${HOSTNAME}.sanity.studio`);
      return;
    }
    console.log('');
  }
  
  console.log('❌ All API endpoints failed.');
  console.log('\n💡 The Sanity Management API may not support direct studio creation.');
  console.log('   Studio deployment must be done via CLI: npx sanity deploy');
}

tryAllEndpoints();

