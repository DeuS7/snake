document.getElementById("anim").onclick = function() {
	firstGameCond.snakeTimerId = setInterval(animate.bind(null, firstGameCond, sets), 100);
}
document.getElementById("pause").onclick = function() {
	pauseGame(firstGameCond, sets);
}



initWholeGame(firstGameCond, secondGameCond, sets);