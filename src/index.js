import LineArt from "./LineArt";
import { getRandomColor } from "./utils";

const $pauseBtn = document.querySelector("#pause");
const $playBtn = document.querySelector("#play");
const $addLineBtn = document.querySelector("#add");
const $removeLineBtn = document.querySelector("#remove");
const $count = document.querySelector("#count");

const options = {
    container: document.querySelector(".demo-1"),
    bgColor: getRandomColor(),
    count: 50,
    debug: true
};

const art = LineArt.create(options);

$pauseBtn.addEventListener("click", art.pause, false);
$playBtn.addEventListener("click", art.play, false);
$addLineBtn.addEventListener("click", art.addLine, false);
$removeLineBtn.addEventListener("click", art.removeLine, false);
$count.addEventListener("change", (e) => art.setOption("count", e.target.value));
$count.value = options.count;