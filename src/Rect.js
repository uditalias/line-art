import { SVG_NS } from "./utils";
import Shape from "./Shape";

export default class Rect extends Shape {
    createElement() {
        const { width, height, color } = this.getDataProp();

        this._element = document.createElementNS(SVG_NS, "rect");

        this.setSize(width, height);

        this.setFillColor(color);
    }
}