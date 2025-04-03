const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  {
    input: 'src/assets/original/bible-header.jpg',
    output: 'src/assets/bible-header.jpg',
    options: {
      width: 1920,
      height: 500,
      fit: 'cover',
      quality: 80
    }
  },
  {
    input: 'src/assets/original/scroll-pattern.png',
    output: 'src/assets/scroll-pattern.png',
    options: {
      width: 400,
      height: 400,
      quality: 60
    }
  },
  {
    input: 'src/assets/original/parchment-texture.jpg',
    output: 'src/assets/parchment-texture.jpg',
    options: {
      width: 800,
      height: 800,
      quality: 75
    }
  },
  {
    input: 'src/assets/original/light-parchment.jpg',
    output: 'src/assets/light-parchment.jpg',
    options: {
      width: 600,
      height: 600,
      quality: 75
    }
  },
  {
    input: 'src/assets/original/scroll-corner.png',
    output: 'src/assets/scroll-corner.png',
    options: {
      width: 100,
      height: 100,
      quality: 60
    }
  }
];

async function optimizeImages() {
  for (const image of images) {
    await sharp(image.input)
      .resize(image.options.width, image.options.height, {
        fit: image.options.fit || 'contain'
      })
      .jpeg({ quality: image.options.quality })
      .toFile(image.output);
    
    console.log(`Optimized: ${image.output}`);
  }
}

optimizeImages().catch(console.error); 