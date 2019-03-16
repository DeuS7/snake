var firstSnakeField = document.getElementById("firstSnakeField");
var secondSnakeField = document.getElementById("secondSnakeField");
var firstGameCtx = firstSnakeField.getContext("2d");
var secondGameCtx = secondSnakeField.getContext("2d");

var firstGameContainer = document.getElementById("firstGameContainer");
var secondGameContainer = document.getElementById("secondGameContainer");

var countdownWrapper = document.getElementById("countdown");
var gameOverWrapper = document.getElementById("gameOver");

var dimension = 400;
const block = 20;
var snakeColor = "crimson";
var snakeHeadColor = "red";
var foodColor = "green";
var obstacleColor = "grey";
var stepOverMode = "soft";

var obstacleMaps = {
	cube: ["0|0", "1|0", "0|1", "1|1"],
	lineHor: ["0|0", "1|0", "2|0", "3|0"],
	lineVer: ["0|0", "0|1", "0|2", "0|3"],
	lineMini: ["0|0", "1|0"]
}
var sets = {
	dimension: dimension,
	block: block,
	warpMode: true,
	stepOverMode: stepOverMode,
	obstacleMaps: obstacleMaps,
	amountOfObstacles: 1,
	playGameDelay: 1500,
	stepDelay: 100,
	countdownWrapper: countdownWrapper,
	gameOverWrapper: gameOverWrapper
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
	snakeTail: {
		color: snakeColor,
		segmentWidth: block - 4,
		delta: 1
	},
	snakeNeck: {
		color: snakeColor,
		segmentWidth: block - 4,
		delta: 1
	},
	food: {
		color: foodColor,
		segmentWidth: block,
		delta: 1
	},
	obstacle: {
		color: obstacleColor,
		segmentWidth: block,
		delta: 1
	}
}
for (var key in blockTypes) {
	blockTypes[key].delta = (block - blockTypes[key].segmentWidth) / 2;
}

//We need "Initial Move" so that in the first move player can choose
//EVERY direction, including down
var firstGameCond = {
	snake: [],
	food: [],
	lastMove: "InitialMove",
	obstacles: [],
	snakeField: firstSnakeField,
	ctx: firstGameCtx,
	containingBlock: firstGameContainer,
	snakeTimerId: -1
}
var secondGameCond = {
	snake: [],
	food: [],
	lastMove: "InitialMove",
	obstacles: [],
	snakeField: secondSnakeField,
	ctx: secondGameCtx,
	containingBlock: secondGameContainer,
	snakeTimerId: -1
}
var objX = {
	currentActiveGame: undefined,
	currentInactiveGame: undefined,
	isGameStopped: true,
	currentIterationCount: 0,
	totalIterationCount: 0,
	currentScore: 0,
	currentDirection: "Up"
}