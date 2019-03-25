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
	about: "<p>The purpose of the game is quite clear. It's a simple snake game, where you eat food for growing and avoid unwanted actions (More about them in further sections). The game will continue untill you lose.</p>",
	twoFields: " <p>Two fields is a useless idea of mine, which was only thought of and created! since I wanted to write snake, but with more complexity. </p> <p>This might though be quite of use for some reaction training. </p><p> This is how it works: you chose number of steps, and game switches the fields every N steps. As of now no random.</p>",  
	warpMode: "<p>Warp mode is responsible for whether the field is cycled or not. If the setting is 'True', when you hit the wall, you just appear from the opposite wall, as if it was a portal.</p>",
	stepOverMode: "<p> Step Over Mode is a setting, responsible for how the snake interacts with itself.</p><p>Soft means, that it just bites off part of it's body, but you can continue the game</p><p>Hard - you just lose instantly</p><p>Step Over - nothing happens, you can go anywhere, aside from backwards</p>",
	amountOfSteps: "<p>With this setting you can chose approximate amount of steps per turn.</p><p>Just like with Snake Speed, I didn't want to write exact numbers, since the whole point of the game was abruptness of process. You should learn to 'feel', when the switch is going to happen</p><p>Also it's very interesting to risk those last couple of steps for food, which may be fatal, if the other snake is headed towards the obstacle.</p>",
	switchRules: "<p>As already mentioned, the switch happens every N steps. When the switch happens, the direction is saved, which means, for instance, that if one snake is headed down, after switch the other will be too, even if before it was headed in different direction. The only exception is that the snake obviously can't go backwards</p>",
	notes: "<p>Note that some settings may need reloading/losing to take effect</p><p>At the initial move you can chose every direction. You have about 1.5 seconds to make a decision.</p>"
}
//"true" - one of the stupidest things I've ever done. Agree on that.
var sets = {
	dimension: 600,
	block: 25,
	minFieldMargin: 50,
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