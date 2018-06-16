import Rect from "./Rect";

export default ({ width, height, x, y, rotate, rotateDoration, translateDoration, color }) => {
    return new Rect(width, height, rotateDoration, translateDoration, color);
}