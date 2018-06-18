import { SVG_NS, random, bindToContext } from "./utils";
import { defaultOptions } from "./defaults";
import Stage from "./Stage";
import optionsBuilder from "./OptionsBuilder";

const autobindMethods = ["_onWindowResize", "_tick", "pause", "play", "addShape", "scrumble", "removeShape", "setOption", "destroy"];

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
        this._options = optionsBuilder(options);
        this._container = this._options.container;
        this._containerRect = this._container.getBoundingClientRect();
        this._isPlaying = false;
        this._rafId = 0;
        this._prevFrame = 0;

        this._configure();
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
        if (this._stage.shapesCount < count) {
            count = this._stage.shapesCount;
        }

        while ((count--) > 0) {
            this._stage.removeShape(this._stage.getShapeAt(this._stage.shapesCount - 1));
        }
    }

    setOption(key, value) {
        try {
            this._options.setOption(key, value);
        } catch (e) {
            console.error(e);
        }

        if (key === "bgColor") {
            this._stage.setBackgroundColor(value);
        }

        this.scrumble();
    }

    scrumble() {
        this._stage.removeAllShapes();

        this.addShapes(this._options.count);
    }

    pause() {
        if (!this._isPlaying) {
            return;
        }

        this._isPlaying = false;
        this._prevFrame = 0;

        window.cancelAnimationFrame(this._rafId);
    }

    play() {
        if (this._isPlaying) {
            return;
        }

        this._isPlaying = true;
        this._rafId = window.requestAnimationFrame(this._tick);
    }

    destroy() {
        this.pause();

        this._stage.destroy();

        this._container.removeChild(this._stage.$);

        window.removeEventListener("resize", this._onWindowResize);
    }

    _configure() {
        bindToContext(autobindMethods, this);

        this._createStage();

        this._bindEvents();

        this.addShapes(this._options.count);

        if (this._options.autoPlay) {
            this.play();
        }
    }

    _bindEvents() {
        window.addEventListener("resize", this._onWindowResize, { passive: true });
    }

    _onWindowResize() {
        window.requestAnimationFrame(() => {
            this._containerRect = this._container.getBoundingClientRect();
            const { width, height } = this._containerRect;
            this._stage.setViewBox(width, height);
        });
    }

    _createStage() {
        const { width, height } = this._containerRect;

        this._stage = new Stage({ width, height, bgColor: this._options.bgColor });

        this._container.appendChild(this._stage.$);
    }

    _createRandomShape() {
        const width = this._getRandomByRange(this._options.shapeWidthRange)
            , height = this._getRandomByRange(this._options.shapeHeightRange)
            , color = this._options.colorFactory()
            , rotateDoration = this._getRandomDurationMiliseconds()
            , translateDoration = this._getRandomDurationMiliseconds()
            , x = random(0 - width, this._containerRect.width)
            , y = random(0 - height, this._containerRect.height)
            , rotate = random(0, 360);

        this._stage.addShape(this._options.shapeFactory({
            width, height, x, y, rotate, rotateDoration, translateDoration, color
        }));
    }

    _getRandomDurationMiliseconds() {
        return this._getRandomByRange(this._options.animDurationRange) * 1000;
    }

    _getRandomByRange(range) {
        return random.apply(null, range);
    }

    _tick(frame) {
        let count = this._stage.shapesCount;

        while ((count--) > 0) {
            this._stage
                .getShapeAt(count)
                .renderFrame(frame, this._prevFrame, this._containerRect.width, this._containerRect.height);
        }

        this._prevFrame = frame;
        this._rafId = window.requestAnimationFrame(this._tick);
    }
}