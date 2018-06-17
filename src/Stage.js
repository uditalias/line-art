import { SVG_NS, bindToContext } from "./utils";

const autobindMethods = ["removeShape"];

export default class Stage {
    constructor(options) {
        this._options = options;
        this._svg = null;
        this._shapes = [];

        this._configure();
    }

    get $() {
        return this._svg;
    }

    get shapesCount() {
        return this._shapes.length;
    }

    getShapeAt(index) {
        return this._shapes[index];
    }

    addShape(shape) {
        this._shapes.push(shape);
        this._svg.appendChild(shape.$);
    }

    removeShape(shape) {
        this._svg.removeChild(shape.$);
        this._shapes.splice(this._shapes.indexOf(shape), 1);
    }

    removeAllShapes() {
        this._shapes.concat().map(this.removeShape);
    }

    setBackgroundColor(color) {
        this._svg.style.backgroundColor = color;
    }

    setViewBox(width, height) {
        this._svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    destroy() {
        this.removeAllShapes();
    }

    _configure() {
        bindToContext(autobindMethods, this);

        this._createElement();
    }

    _createElement() {
        this._svg = document.createElementNS(SVG_NS, "svg");
        this._svg.style.width = "100%";
        this._svg.style.height = "100%";
        this._svg.style.display = "block";

        const { width, height, bgColor } = this._options;

        this.setViewBox(width, height);

        if (bgColor) {
            this.setBackgroundColor(bgColor);
        }
    }
}