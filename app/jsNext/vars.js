var firstSnakeField = document.getElementById("firstSnakeField");
var secondSnakeField = document.getElementById("secondSnakeField");
var firstGameCtx = firstSnakeField.getContext("2d");
var secondGameCtx = secondSnakeField.getContext("2d");

var firstGameContainer = document.getElementById("firstGameContainer");
var secondGameContainer = document.getElementById("secondGameContainer");

var countdownWrapper = document.getElementById("countdown");
var gameOverWrapper = document.getElementById("gameOver");

var scoreBoard = document.getElementById("scoreBoard");
var startButton = document.getElementById("startButton");
var pauseButton = document.getElementById("pauseButton");
var pauseStart = {
	startButton: pauseButton,
	pauseButton: startButton
}

var keyBoard = document.getElementById("controlKeys");
var wControlKey = document.getElementsByClassName("wControlKey")[0];
var aControlKey = document.getElementsByClassName("aControlKey")[0];
var sControlKey = document.getElementsByClassName("sControlKey")[0];
var dControlKey = document.getElementsByClassName("dControlKey")[0];

/*var dimension = 600;
var block = 25;
var snakeColor = "crimson";
var snakeHeadColor = "red";
var foodColor = "#4CAF50";
var obstacleColor = "grey";
var stepOverMode = "soft";
var warpMode = true;*/

//The numbers are relative to some random block. e.g 1|1 means
//+1 block on each axis is painted. Like this it's easy to 
//implement possibility to draw userFigures.
var obstacleMaps = {
	cube: ["0|0", "1|0", "0|1", "1|1"],
	lineHor: ["0|0", "1|0", "2|0", "3|0"],
	lineVer: ["0|0", "0|1", "0|2", "0|3"],
	lineMini: ["0|0", "1|0"]
}
var aboutInfo = {
	about: "Just some game",
	warpMode: "That is how it works...",
	stepOverMode: "And this works like this",
	test: "Just a test. Very long string, by the way."
}
var sets = {
	dimension: 600,
	block: 25,
	warpMode: "true",
	stepOverMode: "soft",
	obstacleMaps: obstacleMaps,
	amountOfObstacles: 2,
	playGameDelay: 1500,
	stepDelay: 100,
	amountOfSteps: 40,
	displayKeyboard: "true",
	countdownWrapper: countdownWrapper,
	gameOverWrapper: gameOverWrapper,
	scoreBoard: scoreBoard,
	controlKeys: {
		w: wControlKey,
		a: aControlKey,
		s: sControlKey,
		d: dControlKey
	},
	keyBoard: keyBoard,
	looseMessages: {
		wallCollision: "You hit the wall.",
		obstacleCollision: "You hit the obstacle.",
		stepOver: "You hit yourself.",
		basicLooseMessage: "Sorry, dude, you suck."
	}
}

//Settings of each type of block
//Then init deltas - number, you need to sum with X||Y,
//To show elem. at the center of a block.
var blockTypes = {
	snake: {
		color: "crimson",
		segmentWidth: sets.block - 2,
		delta: 1
	},
	snakeHead: {
		color: "red",
		segmentWidth: sets.block - 6,
		delta: 1
	},
	snakeTail: {
		color: "crimson",
		segmentWidth: sets.block - 4,
		delta: 1
	},
	snakeNeck: {
		color: "crimson",
		segmentWidth: sets.block - 4,
		delta: 1
	},
	food: {
		color: "#4CAF50",
		segmentWidth: sets.block,
		delta: 1
	},
	obstacle: {
		color: "grey",
		segmentWidth: sets.block - 2,
		delta: 1
	}
}
for (var key in blockTypes) {
	blockTypes[key].delta = (sets.block - blockTypes[key].segmentWidth) / 2;
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