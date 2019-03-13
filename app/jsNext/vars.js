var snakeField = document.getElementById("snakeField");
var mainGameCtx = snakeField.getContext("2d");

var dimension = 400;
const block = 20;
//var segmentWidth = block - 2;
var snakeColor = "crimson";
var snakeHeadColor = "red";
var foodColor = "green";
var blockColor = "gray";
var stepOverMode = "soft";

var sets = {
	dimension: dimension,
	block: block,
	segmentWidth: block-2,
	snakeColor: snakeColor,
	snakeHeadColor: snakeHeadColor,
	foodColor: foodColor,
	blockColor: blockColor,
	ctx: mainGameCtx,
	warpMode: true,
	stepOverMode: stepOverMode
}
//Settings of each type of block
//Then init deltas - number, you need to sum with X||Y,
//To show elem. at the center of a block.
var blockTypes = {
	snake: {
		color: snakeColor,
		segmentWidth: block - 2,
		delta: 1
	},
	snakeHead: {
		color: snakeHeadColor,
		segmentWidth: block - 6,
		delta: 1
	},
	food: {
		color: foodColor,
		segmentWidth: block,
		delta: 1
	}
}
for (var key in blockTypes) {
	blockTypes[key].delta = (block - blockTypes[key].segmentWidth) / 2;
}


var firstGameCond = {
	snake: [],
	food: [],
	currentDirection: "Up",
	lastMove: "W",
	block: []
}