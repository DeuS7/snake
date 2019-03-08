var snakeField = document.getElementById("snakeField");
var mainGameCtx = snakeField.getContext("2d");

var dimension = 400;
var block = 20;
var segmentWidth = block - 2;
var snakeColor = "crimson";
var foodColor = "green";
var blockColor = "gray";
var nullColor = "white";

var sets = {
	dimension: dimension,
	block: block,
	segmentWidth: block-2,
	snakeColor: snakeColor,
	foodColor: foodColor,
	blockColor: blockColor,
	nullColor: nullColor,
	ctx: mainGameCtx
}
var firstGameCond = {
	snake: [],
	food: [],
	currentActiveControlButton: "W",
	blockedFields: []
}