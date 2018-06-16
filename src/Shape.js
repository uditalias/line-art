export default class Shape {
    constructor() {
        this._data = {};
        this._element = null;
    }

    get $() {
        return this._element;
    }

    setData(props) {
        Object.keys(props).map(k => this.setData(k, props[k]));
    }

    setDataProp(key, value) {
        this._data[key] = value;
        return value;
    }

    getDataProp(key) {
        if (!key) return this._data;
        return this._data[key];
    }

    setTransform(x, y, rotate, width, height) {
        this.setData({ x, y, rotate });

        this._element.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate} ${width / 2} ${height / 2})`);
    }
}