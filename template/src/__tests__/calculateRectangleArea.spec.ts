import { calculateRectangleArea } from "../calculateRectangleArea";

describe("calculateRectangleArea", () => {
  it("should correctly calculate the area of a rectangle", () => {
    expect(calculateRectangleArea(5, 10)).toBe(50);
  });

  it("should throw an error if given negative width", () => {
    expect(() => calculateRectangleArea(-5, 10)).toThrow(
      "Width and height should be non-negative values."
    );
  });

  it("should throw an error if given negative height", () => {
    expect(() => calculateRectangleArea(5, -10)).toThrow(
      "Width and height should be non-negative values."
    );
  });
});
