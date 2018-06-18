import { SVG_NS } from "./utils";
import Shape from "./Shape";

export default class Circle extends Shape {
    createElement() {
        // the `createElement` method is called after the initialization of your shape
        // you can access the data by...
        const { width, height, rotateDoration, translateDoration, color, x, y, rotate, cx, cy } = this.getDataProp();
        // or
        const shapeWidth = this.getDataProp("width");
        const shapeHeight = this.getDataProp("height");

        // then, create SVG element and ref it to `this._element`
        this._element = document.createElementNS(SVG_NS, "circle");

        this._element.setAttribute("cx", cx);
        this._element.setAttribute("cy", cy);
        this._element.setAttribute("r", height / 2);

        this.setSize(width, height);

        this.setFillColor(color);
    }
}