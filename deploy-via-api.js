#!/usr/bin/env node

/**
 * Deploy Sanity Studio via Management API
 */

const https = require('https');

const PROJECT_ID = 'dgwzv4lg';
const API_TOKEN = 'skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko';
const HOSTNAME = 'ariostudio';

console.log('🚀 Attempting to deploy Sanity Studio via Management API...');
console.log('Project ID:', PROJECT_ID);
console.log('Hostname:', HOSTNAME);

// Note: The Sanity Management API for studio deployments might require different endpoints
// This is a placeholder - the actual deployment typically requires the CLI
console.log('\n⚠️  Note: Studio deployment via API is not directly supported.');
console.log('The Sanity CLI is required for studio deployment.');
console.log('\n📝 To deploy manually, run:');
console.log('   1. npx sanity login');
console.log('   2. npx sanity deploy');
console.log('   3. When prompted, enter hostname: ariostudio');
console.log('\n✅ Your studio will be available at: https://ariostudio.sanity.studio');

