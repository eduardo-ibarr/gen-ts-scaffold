export function calculateRectangleArea(width: number, height: number): number {
  if (width < 0 || height < 0) {
    throw new Error("Width and height should be non-negative values.");
  }
  return width * height;
}
