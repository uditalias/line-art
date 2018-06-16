import { SVG_NS } from "./utils";

export default class Stage {
    constructor(options) {
        this._options = options;
        this._svg = null;

        this._configure();
    }

    get $() {
        return this._svg;
    }

    appendTo(element) {
        element.appendChild(this._svg);
    }

    addShape(shape) {
        this._svg.appendChild(shape.$);
    }

    removeShape(shape) {
        this._svg.removeChild(shape.$);
    }

    setBackgroundColor(color) {
        this._svg.style.backgroundColor = color;
    }

    setViewBox(width, height) {
        this._svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    _configure() {
        this._createElement();
    }

    _createElement() {
        this._svg = document.createElementNS(SVG_NS, "svg");
        this._svg.style.width = "100%";
        this._svg.style.height = "100%";

        this.setViewBox(this._options.width, this._options.height);

        if (this._options.bgColor) {
            this.setBackgroundColor(this._options.bgColor);
        }
    }
}