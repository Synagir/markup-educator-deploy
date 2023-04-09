import { toPixelData } from 'html-to-image';

export default async function compare(containerA, containerB) {
  const userPixels = await toPixelData(containerA);
  const answerPixels = await toPixelData(containerB);

  if (userPixels.length !== answerPixels.length) {
    console.error('Two canvas sizes are not identical');
  }

  // compare canvas
  const scoreSpectrum = calcSpectrum(userPixels, answerPixels);
  const scorePerfect = calcPixelPerfect(userPixels, answerPixels);
  console.log(scoreSpectrum, scorePerfect);

  return scoreSpectrum * scorePerfect * 100;
}

function calcSpectrum(userPixels, answerPixels) {
  const pixelLength = userPixels.length;
  const spectrum = new Array(256).fill(0);

  // 데스크톱에서 약 3ms 계산
  for (let i = 0; i < pixelLength; i += 1) {
    spectrum[userPixels[i]] += 1;
    spectrum[answerPixels[i]] -= 1;
  }

  const MAX_DIFF = pixelLength / 4;
  const difference = spectrum.reduce((acc, cur) => acc + Math.abs(cur), 0);
  return 1 - difference / MAX_DIFF;
}

function calcPixelPerfect(userPixels, answerPixels) {
  const pixelLength = userPixels.length;
  let identicalPixels = 0;
  for (let i = 0; i < pixelLength; i += 1) {
    if (userPixels[i] === answerPixels[i]) {
      identicalPixels += 1;
    }
  }

  return identicalPixels / pixelLength;
}
