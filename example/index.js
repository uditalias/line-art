import LineArt, { getRandomColor } from "line-art";

const $pauseBtn = document.querySelector("#pause");
const $playBtn = document.querySelector("#play");
const $addShapeBtn = document.querySelector("#add");
const $removeShapeBtn = document.querySelector("#remove");
const $restartBtn = document.querySelector("#restart");
const $count = document.querySelector("#count");

const options = {
    container: document.querySelector(".demo-1"),
    bgColor: "#5c469f",
    count: 100
};

let art = LineArt.create(options);

$pauseBtn.addEventListener("click", () => art.pause(), false);
$playBtn.addEventListener("click", () => art.play(), false);
$addShapeBtn.addEventListener("click", () => art.addShape(), false);
$removeShapeBtn.addEventListener("click", () => art.removeShape(), false);

$restartBtn.addEventListener("click", () => {
    LineArt.destroy(art);
    art = LineArt.create(options);
}, false);

$count.addEventListener("change", (e) => {
    options.count = e.target.value;
    art.setOption("count", options.count);
}, false);

$count.value = options.count;