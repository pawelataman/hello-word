export function isContrastLight(colorHex: string): boolean {
  const R = parseInt(colorHex.substring(1, 3), 16);
  const G = parseInt(colorHex.substring(3, 5), 16);
  const B = parseInt(colorHex.substring(5, 7), 16);
  const A = parseInt(colorHex.substring(7, 9), 16) / 255;

  const brightness = R * 0.299 + G * 0.587 + B * 0.114 + (1 - A) * 255;

  return brightness <= 186;
}
