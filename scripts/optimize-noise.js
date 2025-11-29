/**
 * Script to convert noise.png to optimized noise.avif
 * Run with: node scripts/optimize-noise.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/noise.png');
const outputPath = path.join(__dirname, '../public/noise.avif');

async function optimizeNoise() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Error: ${inputPath} not found`);
      process.exit(1);
    }

    console.log('Converting noise.png to noise.avif...');
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    console.log(`Original size: ${originalSizeKB} KB`);

    // Convert to AVIF with optimization
    // Target: 256x256 or 512x512, under 80KB
    // Try 256x256 first for smaller file size
    let outputSize = 256;
    let quality = 50; // Start with medium quality
    
    await sharp(inputPath)
      .resize(outputSize, outputSize, {
        fit: 'fill',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .avif({
        quality: quality,
        effort: 6, // Higher effort = better compression (0-9)
        chromaSubsampling: '4:2:0' // Better compression
      })
      .toFile(outputPath);

    // Check output file size
    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    
    console.log(`\n✅ Conversion complete!`);
    console.log(`Output size: ${outputSizeKB} KB`);
    console.log(`Size reduction: ${((1 - outputStats.size / originalStats.size) * 100).toFixed(1)}%`);
    
    if (outputStats.size > 80 * 1024) {
      console.log(`\n⚠️  Warning: File size (${outputSizeKB} KB) exceeds 80KB target.`);
      console.log(`   Consider reducing quality or size further.`);
    } else {
      console.log(`\n✅ File size is under 80KB target!`);
    }
    
    console.log(`\nFile saved to: ${outputPath}`);
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('sharp')) {
      console.error('\n❌ Error: sharp package not found.');
      console.log('\nPlease install sharp first:');
      console.log('  npm install sharp');
      console.log('\nOr use an online tool to convert:');
      console.log('  - https://squoosh.app/');
      console.log('  - https://convertio.co/png-avif/');
    } else {
      console.error('\n❌ Error converting image:', error.message);
    }
    process.exit(1);
  }
}

optimizeNoise();

