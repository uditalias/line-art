import { bindToContext, random } from "./utils";

const autobindMethods = ["renderFrame"];

export default class Shape {
    constructor(width, height, rotateDoration, translateDoration, color, x, y, rotate) {
        this._data = { width, height, rotateDoration, translateDoration, color, x, y, rotate };

        bindToContext(autobindMethods, this);

        this.createElement();

        this.setTransform(x, y, rotate);
    }

    get $() {
        return this._element;
    }

    createElement() {
        throw new TypeError(`${this.constructor.name} 'createElement' method is missing`);
    }

    setDataProp(key, value) {
        this._data[key] = value;
    }

    getDataProp(key) {
        if (!key) return this._data;
        return this._data[key];
    }

    setElement(element) {
        this._element = element;
    }

    setSize(width, height) {
        this.setDataProp("width", width);
        this.setDataProp("height", height);

        this.setCenter(width / 2, height / 2);

        this._element.setAttribute("width", width);
        this._element.setAttribute("height", height);
    }

    setFillColor(color) {
        this.setDataProp("color", color);

        this._element.setAttribute("fill", color);
    }

    setCenter(cx, cy) {
        this.setDataProp("cx", cx);
        this.setDataProp("cy", cy);
    }

    setTransform(x, y, rotate) {
        this.setDataProp("x", x);
        this.setDataProp("y", y);
        this.setDataProp("rotate", rotate);
        const { cx, cy } = this.getDataProp();

        this._element.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate} ${cx} ${cy})`);
    }

    renderFrame(frame, prevFrame, containerWidth, containerHeight) {
        const data = this.getDataProp();

        let nextX, nextRotateDeg, nextY = data.y;

        if (data.x >= containerWidth) {
            nextX = 0 - data.width;
            nextY = random(0 - data.height, containerHeight)
            nextRotateDeg = data.rotate;
        } else {
            nextX = data.x + (containerWidth / (60 * (data.translateDoration / 1000)));
            nextRotateDeg = data.rotate + (360 / (60 * (data.rotateDoration / 1000)));
        }

        this.setTransform(nextX, nextY, nextRotateDeg);
    }
}