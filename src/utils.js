const LETTERS = "0123456789ABCDEF";
export const SVG_NS = "http://www.w3.org/2000/svg";

export const getRandomColor = function () {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += LETTERS[random(0, 16)];
    }
    return color;
};

export const random = function (min, max) {
    return Math.floor(max - Math.random() * (max - min));
};

export const bindToContext = function (bind, context) {
    if (!(bind instanceof Array)) {
        bind = [bind];
    }

    bind.map(fn => context[fn] = context[fn].bind(context));
};
