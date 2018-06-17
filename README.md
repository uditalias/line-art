# line-art

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
    getColor: getRandomColor,
    autoPlay: true,
    animDurationRange: [5, 25],
    shapeWidthRange: [50, 100],
    shapeHeightRange: [5, 10]

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| container | DOM Element | true | - | the art container |
| shapeFactory | Function | false | `{ shapeFactory } from "src/defaults"` | override this function if you want to control the art shapes, see `src/defatuls.js` for example |
| getColor | Function | false | `{ getRandomColor } from "src/utils"` | a function to generate a shape color` |
| autoPlay | Boolean | false | true | should the animation start playing once art created |
| animDurationRange | Array | false | [5, 25] | array of min and max values for animation duration |
| shapeWidthRange | Array | false | [50, 100] | array of min and max values for shape width |
| shapeHeightRange | Array | false | [5, 10] | array of min and max values for shape height |

**LineArt.destroy(art)**

Destroy and dispose a given art resources.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
