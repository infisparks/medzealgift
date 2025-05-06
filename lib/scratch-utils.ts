/**
 * Calculates the percentage of a canvas that has been scratched (made transparent)
 * @param ctx Canvas rendering context
 * @param width Canvas width
 * @param height Canvas height
 * @returns Percentage of scratched area (0-1)
 */
export function calculateScratchPercentage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): number {
  // Get the image data to analyze transparent pixels
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  
  // Count transparent pixels (alpha channel = 0)
  let transparentPixels = 0;
  const totalPixels = width * height;
  
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) {
      transparentPixels++;
    }
  }
  
  // Return percentage of transparent pixels
  return transparentPixels / totalPixels;
}

/**
 * Creates an array of particle properties for animation
 * @param count Number of particles to generate
 * @param container Container element dimensions
 * @returns Array of particle objects
 */
export function generateParticles(
  count: number,
  container: { width: number; height: number }
) {
  const colors = ["#ffeb3b", "#ff5722", "#03a9f4", "#4caf50", "#ffffff"];
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      x: Math.random() * container.width,
      y: Math.random() * container.height,
      angle: Math.random() * Math.PI * 2,
      velocity: Math.random() * 150 + 100,
    });
  }
  
  return particles;
}