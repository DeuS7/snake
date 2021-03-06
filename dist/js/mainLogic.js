function initGame(firstGameCond, secondGameCond, sets, objX) {
	if (sets.displayKeyboard == "true") {
		sets.keyBoard.classList.add("visible");
	}
	emptyGameConditions(firstGameCond, objX);
	emptyGameConditions(secondGameCond, objX);

	sets.gameOverWrapper.addEventListener("click", function(e) {
		initGame(firstGameCond, secondGameCond, sets, objX);
	})

	initField(firstGameCond, sets, objX);
	initField(secondGameCond, sets, objX);

	objX.currentScore = 0;
	objX.isGameStopped = true;
	objX.totalIterationCount = 0;
	objX.currentIterationCount = 0;

	refreshScoreBoard(sets, objX);
	sets.gameOverWrapper.classList.remove("showWrapper");
}
//If pattern doesn't exist, it clones given condition into newly created field.
//In this case it can only be the first call before all games.
//If it does, it uses pattern to empty given condition.
//!DOES NOT WORK WITH OBJECTS, since there's no need yet!
function emptyGameConditions(someGameCond, objX) {
	if (!objX.pattern) {
		objX.pattern = {};

		for (var key in someGameCond) {
			var tp = getProperType(someGameCond[key]);
			if (tp == "Number" || tp == "String" || tp == "Boolean") {
				objX.pattern[key] = someGameCond[key];
			}
			if (tp == "Array") {
				objX.pattern[key] = someGameCond[key].slice(0);
			}
		} 
	} else {
		for (var key in objX.pattern) {
			var tp = getProperType(objX.pattern[key]);

			if (tp == "Array") {
				someGameCond[key] = objX.pattern[key].slice(0);
			} else {
				someGameCond[key] = objX.pattern[key];
			}
		}
	}
}

function startGame(firstGameCond, secondGameCond, sets, objX) {
	objX.isGameStopped = false;
	
	//Start game is used both after pause and to actually start game first time.
	//So if it's the first time, randomize total amount of iterations and field
	if (objX.currentActiveGame == undefined) {
		/*objX.totalIterationCount = randInRange(35,40);*/
		//Probably better to make it random.
		objX.totalIterationCount = sets.amountOfSteps;

		//Obivously it's not the best solution, butt it's easy to implement
		//And that factor is decisive, since I'll barely expand the game to more fields.
		if (randInRange(0,1000) > 500) {
			objX.currentActiveGame = firstGameCond;
			objX.currentInactiveGame = secondGameCond;
		} else {
			objX.currentActiveGame = secondGameCond;
			objX.currentInactiveGame = firstGameCond;
		}
	}

	refreshGameStyles(objX, sets);
	refreshControlKeysStyles(sets.controlKeys, objX, sets);
	showCountdown(sets);
	
	setTimeout(function() {
		setTimeout(function anon() {
			if (objX.isGameStopped) {
				return;
			}

			animate(objX.currentActiveGame, sets, objX);
			objX.currentIterationCount++;

			if (objX.currentIterationCount > objX.totalIterationCount) {
				objX.currentIterationCount = 0;
				/*objX.totalIterationCount = randInRange(35,40);*/
				objX.totalIterationCount = sets.amountOfSteps;

				//The moment of switch!
				var temp = objX.currentInactiveGame;
				objX.currentInactiveGame = objX.currentActiveGame;
				objX.currentActiveGame = temp;

				refreshGameStyles(objX, sets);

				//Otherwise during the switch a snake can go backwards,
				//Cause where it goes is determined only by objX.direction.
				//During the game it can't go back, because when you hit a 
				//Controll button, it checks (In initField). But it can't perform that check 
				//without you hitting the button, which may not happen in case of 
				//switching fields.
				if (objX.currentActiveGame.lastMove == "Up" 
					&& objX.currentDirection == "Down") {
					objX.currentDirection = "Up";
			} 
			if (objX.currentActiveGame.lastMove == "Down" 
				&& objX.currentDirection == "Up") {
				objX.currentDirection = "Down";
		} 
		if (objX.currentActiveGame.lastMove == "Left" 
			&& objX.currentDirection == "Right") {
			objX.currentDirection = "Left";
	} 
	if (objX.currentActiveGame.lastMove == "Right" 
		&& objX.currentDirection == "Left") {
		objX.currentDirection = "Right";
}
}

setTimeout(anon, sets.stepDelay);
}, sets.stepDelay);
	}, sets.playGameDelay);
}
function pauseGame(objX) {
	objX.isGameStopped = true;

	refreshGameStyles(objX, sets);
	refreshControlKeysStyles(sets.controlKeys, objX, sets);
}
function gameOver(sets, objX, looseReason) {
	objX.isGameStopped = true;

	refreshGameStyles(objX, sets);
	refreshControlKeysStyles(sets.controlKeys, objX, sets);
	toggleControlButton(startButton);

	sets.gameOverWrapper.classList.add("showWrapper");
	var span = sets.gameOverWrapper.children[0];

	span.innerHTML = sets.looseMessages.basicLooseMessage;
	span.innerHTML += '\n';
	span.innerHTML += sets.looseMessages[looseReason];
	span.innerHTML += " Your score is " + objX.currentScore;

	objX.currentActiveGame = undefined;
	objX.currentInactiveGame = undefined;
}



function showCountdown(sets) {
	var oneStepDelay = sets.playGameDelay / 3;
	var span = countdownWrapper.children[0];

	sets.countdownWrapper.classList.add("showWrapper");
	span.classList.add("countdownWrapperAnim");

	setTimeout(function anon() {
		span.innerHTML -= 1;
		span.classList.remove("countdownWrapperAnim");

		if (span.innerHTML != 0) {
			setTimeout(function() {
				span.classList.add("countdownWrapperAnim");
			}, 50);
			setTimeout(anon, oneStepDelay);
		} else {
			//span.classList.remove("countdownWrapperAnim");
			span.innerHTML = 3;
			sets.countdownWrapper.classList.remove("showWrapper");
		}
	}, oneStepDelay)
}

function refreshGameStyles(objX, sets) {
	if (objX.isGameStopped == false) {
		objX.currentInactiveGame.containingBlock.classList.add("inactiveGame");
		objX.currentActiveGame.containingBlock.classList.remove("inactiveGame");
	} else {
		objX.currentInactiveGame.containingBlock.classList.add("inactiveGame");
		objX.currentActiveGame.containingBlock.classList.add("inactiveGame");
	}
}

function refreshScoreBoard(sets, objX) {
	sets.scoreBoard.innerHTML = objX.currentScore;
}

function toggleControlButton(button) {
	if (button.disabled == true) {
		button.disabled = false;
		pauseStart[button.id].disabled = true;
	} else {
		button.disabled = true;
		pauseStart[button.id].disabled = false;
	}
}
function refreshControlKeysStyles(keys, objX, sets) {
	if (sets.displayKeyboard == "false") {
		return;
	}
	for (var key in keys) {
		keys[key].classList.remove("activatedControlKey");
	}
	if (objX.isGameStopped) {
		sets.keyBoard.classList.remove("activeKeyBoard");
	} else {
		sets.keyBoard.classList.add("activeKeyBoard");
	}
}

function adjustFieldsSize(sets) {
	var contentBoxWidth = firstGameContainer.clientWidth - 2*sets.minFieldMargin;

	while(sets.dimension > contentBoxWidth) {
		sets.dimension -= sets.block;
	}
}