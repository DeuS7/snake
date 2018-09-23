var width = 400;
var height = 400;
var blockSize = 20;
var timerId;
var delay = 500;
var nextMove = "up";
var moves = [nextMove];
var snake = [[9,9]];
var currentLength = 1;
var colors = {
	snakeColor: "crimson",
	fieldColor: "white",
	foodColor: "green"
}
var foodCoords;
var lastTailPosition;
var isCyclingAllowed = false;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var totalBlocksInRow = width / blockSize;
var totalBlocksInCol = height / blockSize;

var btn = document.getElementById("btn");

var score = 0;
