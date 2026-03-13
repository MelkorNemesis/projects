import fs from 'fs/promises';

async function detectImageMimeType(imagePath) {
  try {
    // Read the first 12 bytes (enough for all our signatures)
    const fileHandle = await fs.open(imagePath, 'r');
    const buffer = Buffer.alloc(12);
    await fileHandle.read(buffer, 0, 12, 0);
    await fileHandle.close();

    // Check JPEG signature
    if ([0xff, 0xd8, 0xff].every((b, i) => buffer[i] === b)) {
      return 'image/jpeg';
    }

    // Check PNG signature
    if ([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => buffer[i] === b)) {
      return 'image/png';
    }

    // Check GIF signature
    if ([0x47, 0x49, 0x46, 0x38].every((b, i) => buffer[i] === b)) {
      return 'image/gif';
    }
    
    // ... more signatures ...

    return null;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
}

async function main() {
  const imagePath = process.argv[2];

  if (!imagePath) {
    console.error('Usage: node detect-mime.js <image-path>');
    process.exit(1);
  }

  const mimeType = await detectImageMimeType(imagePath);

  if (mimeType) {
    console.log(`MIME type: ${mimeType}`);
  } else {
    console.log('Unknown or unsupported image type');
  }
}

main();
