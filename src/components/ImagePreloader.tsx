import { useEffect } from 'react';

const images = [
  {
    src: '/src/assets/bible-header.jpg',
    priority: 'high'
  },
  {
    src: '/src/assets/scroll-pattern.png',
    priority: 'low'
  },
  {
    src: '/src/assets/parchment-texture.jpg',
    priority: 'medium'
  },
  {
    src: '/src/assets/light-parchment.jpg',
    priority: 'medium'
  },
  {
    src: '/src/assets/scroll-corner.png',
    priority: 'low'
  }
];

export function ImagePreloader() {
  useEffect(() => {
    // Load high priority images first
    const highPriority = images.filter(img => img.priority === 'high');
    const mediumPriority = images.filter(img => img.priority === 'medium');
    const lowPriority = images.filter(img => img.priority === 'low');

    // Load in sequence based on priority
    Promise.all(highPriority.map(img => {
      const image = new Image();
      image.src = img.src;
      return image.decode();
    }))
      .then(() => Promise.all(mediumPriority.map(img => {
        const image = new Image();
        image.src = img.src;
        return image.decode();
      })))
      .then(() => Promise.all(lowPriority.map(img => {
        const image = new Image();
        image.src = img.src;
        return image.decode();
      })));
  }, []);

  return null;
} 