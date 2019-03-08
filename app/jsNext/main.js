snakeField.width = sets["dimension"];
snakeField.height = sets["dimension"];

firstGameCond.snake.push(getRandomPosition(firstGameCond, sets));
firstGameCond.food = getRandomPosition(firstGameCond, sets);

document.getElementById("anim").onclick = function() {
	animate(firstGameCond, sets);
}

init(firstGameCond, sets);