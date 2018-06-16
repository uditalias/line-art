import { SVG_NS, getRandomColor, random, raf, caf, bindToContext } from "./utils";
import defaultShapeFactory from "./shapeFactory";
import Stage from "./Stage";
import Rect from "./Rect";

const autobindMethods = ["_onWindowResize", "_removeShape", "_tick", "pause", "play", "addShape", "scrumble", "removeShape", "setOption"],
    defaultOptions = {
        container: document.body,
        count: 50,
        shapeFactory: defaultShapeFactory,
        getColor: getRandomColor,
        autoPlay: true,
        debug: false,
        animDurationRange: [5, 25],
        lineWidthRange: [50, 100],
        lineHeightRange: [5, 10]
    };

export default class LineArt {
    static lineArts = [];

    static create(options) {
        const la = new LineArt(options);

        LineArt.lineArts.push(la);

        return la;
    }

    static destroy(lineArt) {
        lineArt.destroy();
        LineArt.lineArts.splice(LineArt.lineArts.indexOf(lineArt), 1);
    }

    constructor(options) {
        this._options = Object.assign({}, defaultOptions, options);
        this._container = options.container;
        this._containerRect = this._container.getBoundingClientRect();
        this._debug = options.debug;
        this._isPlaying = false;
        this._rafId = 0;
        this._lines = [];
        this._lastFrame = 0;

        this._configure();
    }

    _configure() {

        bindToContext(autobindMethods, this);

        this._createStage();

        this.addShapes(this._options.count);

        this._bindEvents();

        if (this._options.autoPlay) {
            this.play();
        }
    }

    _bindEvents() {
        window.addEventListener("resize", this._onWindowResize, { passive: true });
    }

    _onWindowResize() {
        raf(() => {
            this._containerRect = this._container.getBoundingClientRect();
            const { width, height } = this._containerRect;
            this._stage.setViewBox(width, height);
        });
    }

    _createStage() {
        const { width, height } = this._containerRect;

        this._stage = new Stage({ width, height, bgColor: this._options.bgColor });

        this._stage.appendTo(this._container);
    }

    _createRandomShape() {
        const width = this._getRandomByRange(this._options.lineWidthRange)
            , height = this._getRandomByRange(this._options.lineHeightRange)
            , rotateDoration = this._getRandomDurationMiliseconds()
            , translateDoration = this._getRandomDurationMiliseconds()
            , x = random(0 - width, this._containerRect.width)
            , y = random(0 - height, this._containerRect.height)
            , rotate = random(0, 360);

        const shape = this._options.shapeFactory({
            width, height, x, y, rotate, rotateDoration, translateDoration
        });

        shape.setTransform(x, y, rotate, width, height);

        this._stage.addShape(shape);
    }

    _createRandomLine() {
        const width = this._getRandomByRange(this._options.lineWidthRange);
        const height = this._getRandomByRange(this._options.lineHeightRange);
        const rotateDoration = this._getRandomDurationMiliseconds();
        const translateDoration = this._getRandomDurationMiliseconds();

        const line = this._createLine(width, height, rotateDoration, translateDoration);

        let x = random(0 - width, this._containerRect.width);
        let y = random(0 - height, this._containerRect.height);
        let rotate = random(0, 360);

        this._transformLine(line, x, y, rotate, width, height);

        this._stage.addItem(line);
    }

    _transformLine(line, x, y, rotate, width, height) {
        this._setLineData(line, "x", x);
        this._setLineData(line, "y", y);
        this._setLineData(line, "rotate", rotate);

        line.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate} ${width / 2} ${height / 2})`);
    }

    _setLineData(line, key, value) {
        line.__data__ = line.__data__ || {};
        line.__data__[key] = value;
        return value;
    }

    _getLineData(line, key) {
        line.__data__ = line.__data__ || {};
        if (!key) return line.__data__;
        return line.__data__[key];
    }

    _createLine(width, height, rotateDoration, translateDoration) {
        const rect = document.createElementNS(SVG_NS, "rect");

        rect.__data__ = { width, height, rotateDoration, translateDoration };
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", this._options.getColor());

        this._lines.push(rect);

        return rect;
    }

    _getRandomDurationMiliseconds() {
        return this._getRandomByRange(this._options.animDurationRange) * 1000;
    }

    _getRandomByRange(range) {
        return random.apply(null, range);
    }

    addShape() {
        this.addShapes(1);
    }

    removeShape() {
        this.removeShapes(1)
    }

    addShapes(count) {
        for (let i = 0; i < count; i++) {
            this._createRandomShape();
        }
    }

    removeShapes(count) {
        if (this._lines.length < count) {
            count = this._lines.length;
        }

        this._lines
            .slice(this._lines.length - count)
            .map(this._removeShape);
    }

    setOption(key, value) {
        this._options[key] = value;

        if (key === "bgColor") {
            this._stage.setBackgroundColor(value);
        }

        this.scrumble();
    }

    scrumble() {
        this._removeAllLines();

        this.addShapes(this._options.count);
    }

    pause() {
        if (!this._isPlaying) {
            return;
        }

        this._isPlaying = false;
        this._lastFrame = 0;

        caf(this._rafId);
    }

    play() {
        if (this._isPlaying) {
            return;
        }

        this._isPlaying = true;
        this._rafId = raf(this._tick);
    }

    destroy() {
        this.pause();
        window.removeEventListener("resize", this._onWindowResize);
    }

    _tick(frame) {
        for (let i = 0, len = this._lines.length; i < len; i++) {
            const line = this._lines[i];
            this._renderFrame(line, frame, this._lastFrame);
        }

        this._lastFrame = frame;
        this._rafId = raf(this._tick);
    }

    _removeAllLines() {
        this._lines.concat().map(this._removeShape);
    }

    _removeShape(shape) {
        this._stage.removeShape(shape);
        this._lines.splice(this._lines.indexOf(shape), 1);
    }

    _renderFrame(line, frame, lastFrame) {
        const data = this._getLineData(line);

        let newX, newRotateDeg;

        if (data.x > this._containerRect.width) {
            newX = 0 - data.width;
            newRotateDeg = data.rotate;
        } else {
            newX = data.x + (this._containerRect.width / (60 * (data.translateDoration / 1000)));
            newRotateDeg = data.rotate + (360 / (60 * (data.rotateDoration / 1000)));
        }

        this._transformLine(line, newX, data.y, newRotateDeg, data.width, data.height);
    }
}