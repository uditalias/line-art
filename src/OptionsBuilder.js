import { defaultOptions } from "./defaults";
import { throwIf, isFunction, bindToContext } from "./utils";

const autobindMethods = ["_validateOption"];

const validators = {
    container: (value) => throwIf(!(value instanceof Element), "`container` must be a valid DOM element"),
    bgColor: (value) => throwIf(typeof (value) !== "string", "`bgColor` must be a string"),
    count: (value) => throwIf(isNaN(value) || value <= 0, "`count` must be a positive number"),
    shapeFactory: (value) => throwIf(!isFunction(value), "`shapeFactory` must be a function"),
    colorFactory: (value) => throwIf(!isFunction(value), "`colorFactory` must be a function"),
    animDurationRange: (value) => throwIf(!(value instanceof Array) || value.length !== 2, "`animDurationRange` must be an array with min and max values"),
    shapeWidthRange: (value) => throwIf(!(value instanceof Array) || value.length !== 2, "`shapeWidthRange` must be an array with min and max values"),
    shapeHeightRange: (value) => throwIf(!(value instanceof Array) || value.length !== 2, "`shapeHeightRange` must be an array with min and max values")
}

class OptionsBuilder {
    constructor(options) {
        this._options = Object.assign({}, defaultOptions, options);

        bindToContext(autobindMethods, this);

        this._validate();
    }

    _validate() {
        Object
            .keys(this._options)
            .map(this._validateOption);
    }

    _validateOption(option) {
        if (validators[option]) {
            validators[option](this._options[option])
        }
    }

    setOption(key, value) {
        this._options[key] = value;

        this._validateOption(key);
    }

    get container() {
        return this._options.container;
    }

    get bgColor() {
        return this._options.bgColor;
    }

    get count() {
        return this._options.count;
    }

    get shapeFactory() {
        return this._options.shapeFactory;
    }

    get colorFactory() {
        return this._options.colorFactory;
    }

    get autoPlay() {
        return this._options.autoPlay;
    }

    get animDurationRange() {
        return this._options.animDurationRange;
    }

    get shapeWidthRange() {
        return this._options.shapeWidthRange;
    }

    get shapeHeightRange() {
        return this._options.shapeHeightRange;
    }
}

export default (options) => new OptionsBuilder(options);