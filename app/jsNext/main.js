startButton.onclick = function() {
	startGame(firstGameCond, secondGameCond, sets, objX);
	toggleControlButton(this);
}
pauseButton.onclick = function() {
	pauseGame(objX);
	toggleControlButton(this);
}


document.addEventListener("keydown", function(e) {
	var cur = objX.currentDirection;
	switch(e.keyCode) {
            //case upButtonKeyCode...
            case 87:
            if (objX.currentActiveGame.lastMove != "Down") {
            	objX.currentDirection = "Up";
            	refreshControlKeysStyles(sets.controlKeys, objX, sets);
            	sets.controlKeys.w.classList.add("activatedControlKey");
            }
            break;
            case 83:
            if (objX.currentActiveGame.lastMove != "Up") {
            	objX.currentDirection = "Down";
            	refreshControlKeysStyles(sets.controlKeys, objX, sets);
            	sets.controlKeys.s.classList.add("activatedControlKey");
            }
            break;
            case 65:
            if (objX.currentActiveGame.lastMove != "Right") {
            	objX.currentDirection = "Left";
            	refreshControlKeysStyles(sets.controlKeys, objX, sets);
            	sets.controlKeys.a.classList.add("activatedControlKey");
            }
            break;
            case 68:
            if (objX.currentActiveGame.lastMove != "Left") {
            	objX.currentDirection = "Right";
            	refreshControlKeysStyles(sets.controlKeys, objX, sets);
            	sets.controlKeys.d.classList.add("activatedControlKey");
            }
            break;
        }
    })



initGame(firstGameCond, secondGameCond, sets, objX);