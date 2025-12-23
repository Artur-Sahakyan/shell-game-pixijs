export function getScale(width: number): number {
  return width < 768 ? Math.min(1, width / 600) : 1;
}
