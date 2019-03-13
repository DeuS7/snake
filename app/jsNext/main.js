/*firstGameCond.snake.push(getRandomPosition(firstGameCond, sets));
firstGameCond.food = getRandomPosition(firstGameCond, sets);*/

document.getElementById("anim").onclick = function() {
	setInterval(animate.bind(null, firstGameCond, sets), 100);
	//animate(firstGameCond, sets);
}

init(firstGameCond, sets);