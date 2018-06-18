# Line Art

# <img src='https://raw.githubusercontent.com/uditalias/line-art/master/assets/lineart.png' alt='Line Art' />

### Beautifully crafted SVG animations 👨‍🎨

![line-art](https://img.shields.io/npm/v/line-art.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/uditalias/line-art.svg?style=flat-square)](https://travis-ci.org/uditalias/line-art)


## Demo
A working [demo](https://uditalias.github.io/line-art/)


## Install
Install via npm with
```sh
$ npm install --save line-art
```

## Creating a line art
```javascript
import LineArt from "line-art";

let art = LineArt.create({
    container: document.querySelector(".demo-1"),
    bgColor: "#5c469f",
    count: 100
});
```

## API
**LineArt.create(options)**

Create a line art with the given options.

 container: document.body,
    count: 50,
    shapeFactory: defaultShapeFactory,
    colorFactory: getRandomColor,
    autoPlay: true,
    animDurationRange: [5, 25],
    shapeWidthRange: [50, 100],
    shapeHeightRange: [5, 10]

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| container | DOM Element | true | - | the art container |
| shapeFactory | Function | false | `{ shapeFactory } from "src/defaults"` | override this function if you want to control the art shapes, see `src/defatuls.js` for example |
| colorFactory | Function | false | `{ getRandomColor } from "src/utils"` | a function to generate a shape color` |
| autoPlay | Boolean | false | true | should the animation start playing once art created |
| animDurationRange | Array | false | [5, 25] | array of min and max values for animation duration |
| shapeWidthRange | Array | false | [50, 100] | array of min and max values for shape width |
| shapeHeightRange | Array | false | [5, 10] | array of min and max values for shape height |

**LineArt.destroy(art)**

Destroy and dispose a given art resources.

## Create your custom shape

If you want, you can control the animated shapes by creating your own shape and provide it from a shape factory.  
All you need to do is inherit from the `Shape` class and implement the `createElement` method.  
Here is an example:

```javascript
// Circle.js
import { Shape, SVG_NS } from "line-art";

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

// In your options, override the `shapeFactory`
LineArt.create({
    ...
    shapeFactory: (options) => new Circle(options),
    ...
})
```

## Todo

- [ ] Add tests
- [X] Add options validator
- [ ] Add ts typings
- [ ] Add more examples
- [ ] Add more docs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
