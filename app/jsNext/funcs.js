//Aux funcs
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getCoords(e) {
    return [Math.ceil(e.offsetX/blockSize), Math.ceil(e.offsetY/blockSize)];
}
function fillCoords(x, y, color) {
    ctx.fillStyle = colors[color];
    ctx.fillRect((x-1)*blockSize,(y-1)*blockSize, blockSize, blockSize);
}
function unfillCoords(x, y, color) {
    ctx.fillStyle = colors[color];
    ctx.fillRect((x-1)*blockSize,(y-1)*blockSize, blockSize, blockSize);
}
function createFood() {
    var x = getRandomInt(1, totalBlocksInRow);
    var y = getRandomInt(1, totalBlocksInCol);
    fillCoords(x,y, "foodColor");
    foodCoords = x + "," + y;
}
function createSnake() {
    var x = getRandomInt(1, totalBlocksInRow);
    var y = getRandomInt(1, totalBlocksInCol);
    fillCoords(x,y, "snakeColor");
    snake[0] = [x,y];
    lastTailPosition = [x,y];
}

function makeMove(direction) {
    moves.unshift(nextMove);
    moves.length = snake.length;
    //If food is eaten, this cell will be the new part.
    lastTailPosition = [snake[snake.length-1][0], snake[snake.length-1][1]];
    for (let i=0;i<snake.length;i++) {
        unfillCoords(snake[i][0], snake[i][1], "fieldColor");
        var currentMove = moves[i];
        if (currentMove == "up") {
            snake[i][1] -= 1;
            if (snake[i][1] < 1) {
                snake[i][1] = totalBlocksInCol;
            }
        }
        if (currentMove == "down") {
            snake[i][1] += 1;
            if (snake[i][1] > totalBlocksInCol) {
                snake[i][1] = 1;
            }
        }
        if (currentMove == "right") {
            snake[i][0] += 1;
            if (snake[i][0] > totalBlocksInRow) {
                snake[i][0] = 1;
            }
        }
        if (currentMove == "left") {
            snake[i][0] -= 1;
            if (snake[i][0] < 1) {
                snake[i][0] = totalBlocksInRow;
            }
        }
        console.log(snake[i][0], snake[i][1]);
        fillCoords(snake[i][0], snake[i][1], "snakeColor");
    }
    //Food is eaten
    if (snake[0] == foodCoords) {
        snake.push(lastTailPosition);
        fillCoords(lastTailPosition[0], lastTailPosition[1], "snakeColor");
        createFood();
    }
}

