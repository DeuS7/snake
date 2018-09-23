(function init() {
	canvas.width = width;
	canvas.height = height;
	btn.onclick = startGame;
	createFood();
	createSnake();
})();

function startGame() {
	//var timerId = setInterval(function() {
		makeMove(nextMove);
	//}, delay);
}
function gameOver() {
	alert("You lost");
}

document.onkeydown = function(e) {
	e.preventDefault();
	switch (e.keyCode) {
		case 38:
			nextMove = "up";
			break;
		case 40:
			nextMove = "down";
			break;
		case 37:
			nextMove = "left";
			break;
		case 39:
			nextMove = "right";
			break;
	}
}