import { SVG_NS } from "./utils";
import Shape from "./Shape";

export default class Rect extends Shape {
    constructor(width, height, rotateDoration, translateDoration, color) {
        super();

        this.setData({ width, height, rotateDoration, translateDoration, color });

        this._configure();
    }

    _configure() {
        this._createElement();
    }

    _createElement() {
        const { width, height, color } = this.getDataProp();

        this._element = document.createElementNS(SVG_NS, "rect");

        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", color);
    }
}