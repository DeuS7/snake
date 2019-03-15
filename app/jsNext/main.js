document.getElementById("anim").onclick = function() {
	startGame(firstGameCond, secondGameCond, sets, objX);
}
document.getElementById("pause").onclick = function() {
	pauseGame(objX);
}



init(firstGameCond, sets);
init(secondGameCond, sets);

function startGame(firstGameCond, secondGameCond, sets, objX) {
	objX.isGamePaused = false;

	if (objX.currentActiveGame == undefined) {
		objX.currentActiveGame = firstGameCond; //Should be Random;
		objX.currentInactiveGame = secondGameCond;
	}

	showCountdown(sets);
	
	setTimeout(function() {
		objX.totalIterationCount = randInRange(10,30);
		setTimeout(function anon() {
			if (objX.isGamePaused) {
				return;
			}
			
			animate(objX.currentActiveGame, sets);
			objX.currentIterationCount++;

			if (objX.currentIterationCount > objX.totalIterationCount) {
				objX.currentIterationCount = 0;
				objX.totalIterationCount = randInRange(10,30);

				var temp = objX.currentInactiveGame;
				objX.currentInactiveGame = objX.currentActiveGame;
				objX.currentActiveGame = temp;
			}

			setTimeout(anon, sets.stepDelay);
		}, sets.stepDelay);
	}, sets.playGameDelay);
}
function pauseGame(objX) {
	objX.isGamePaused = true;
}

function showCountdown(sets) {
	var oneStepDelay = sets.playGameDelay / 3;
	var span = countdownWrapper.children[0];

	sets.countdownWrapper.classList.add("showCountdown");
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
			sets.countdownWrapper.classList.remove("showCountdown");
		}
	}, oneStepDelay)
}