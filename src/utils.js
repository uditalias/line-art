export const SVG_NS = "http://www.w3.org/2000/svg";

export const getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[random(0, 16)];
    }
    return color;
}

export const random = function (min, max) {
    return Math.floor(max - Math.random() * (max - min));
};

export const bindToContext = function (bind, context) {
    if (!(bind instanceof Array)) {
        bind = [bind];
    }

    bind.map(fn => context[fn] = context[fn].bind(context));
}

export const raf = window.requestAnimationFrame;

export const caf = window.cancelAnimationFrame;