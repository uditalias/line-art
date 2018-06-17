import { getRandomColor } from "./utils";
import Rect from "./Rect";

export const defaultShapeFactory = ({ width, height, x, y, rotate, rotateDoration, translateDoration, color }) => {
    return new Rect(width, height, rotateDoration, translateDoration, color, x, y, rotate);
};

export const defaultOptions = {
    container: document.body,
    count: 50,
    shapeFactory: defaultShapeFactory,
    getColor: getRandomColor,
    autoPlay: true,
    animDurationRange: [5, 25],
    shapeWidthRange: [50, 100],
    shapeHeightRange: [5, 10]
};