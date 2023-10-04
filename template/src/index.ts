import { calculateRectangleArea } from "./calculateRectangleArea";

const width = 5;
const height = 10;

const rectangleArea = calculateRectangleArea(width, height);

console.log(
  `Area of rectangle with width ${width} and height ${height} is: ${rectangleArea}`
);
