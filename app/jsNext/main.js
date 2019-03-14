document.getElementById("anim").onclick = function() {
	startGame(firstGameCond, secondGameCond, sets);
}
document.getElementById("pause").onclick = function() {
	pauseGame(firstGameCond, sets);
}



init(firstGameCond, sets);
init(secondGameCond, sets);

function startGame(firstGameCond, secondGameCond, sets) {
	if (objX.currentActiveGame == undefined) {
		objX.currentActiveGame = firstGameCond; //Should be Random;
		objX.currentInactiveGame = secondGameCond;
	}

	//wrap inactive field
	//wrap with 3..2..1.... During which you can control
	
	setTimeout(function() {
		objX.totalIterationCount = randInRange(10,30);
		objX.currentTimerId = setTimeout(function anon() {
			animate(objX.currentActiveGame, sets);
			objX.currentIterationCount++;

			if (objX.currentIterationCount > objX.totalIterationCount) {
				objX.currentIterationCount = 0;
				objX.totalIterationCount = randInRange(10,30);

				var temp = objX.currentInactiveGame;
				objX.currentInactiveGame = objX.currentActiveGame;
				objX.currentActiveGame = temp;
			}

			setTimeout(anon, 200);
		}, 200);
	}, 1500);
}

//startGame(firstGameCond, secondGameCond, sets);