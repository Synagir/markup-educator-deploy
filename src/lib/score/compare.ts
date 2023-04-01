import { toPixelData } from 'html-to-image';

export default async function compare(containerA, containerB): number {
  const userPixels = await toPixelData(containerA);
  const answerPixels = await toPixelData(containerB);

  // compare canvas
  const pixelLength = userPixels.length;
  let identicalPixels = 0;
  for (let i = 0; i < pixelLength; i++) {
    if (userPixels[i] === answerPixels[i]) identicalPixels++;
  }

  return (identicalPixels / pixelLength) * 100;
}
