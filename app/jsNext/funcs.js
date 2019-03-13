function drawSegment([x,y], type, sets) {
    //Recieves type, and asks in blockTypes its color and size;
    sets.ctx.fillStyle = blockTypes[type].color;
    var delta = blockTypes[type].delta;
    var segWidth = blockTypes[type].segmentWidth;
    sets.ctx.fillRect(x+delta,y+delta,segWidth,segWidth);
}

function getRandomPosition(gameCond, sets) {
    var dimensionInBlocks = sets.dimension / sets.block - 1;
    var x,y;

    do {
        x = randInRange(0,dimensionInBlocks) * sets.block;
        y = randInRange(0, dimensionInBlocks) * sets.block;
    } while(isFieldBlocked([x,y], gameCond));
    

    return [x,y];
}

function isFieldBlocked([x,y], gameCond) {
    return isOnFood([x,y], gameCond) || isOnBlock([x,y], gameCond) || isOnSnake([x,y], gameCond);
}
function isOnFood([x,y], gameCond) {
    if (gameCond.food[0] == x && gameCond.food[1] == y) {
        return true;
    }
    return false;
}
function isOnBlock([x,y], gameCond) {
    for (var blockElem of gameCond.block) {
        if (blockElem[0] == x && blockElem[1] == y) {
            return true;
        }
    }
    return false;
}
function isOnSnake([x,y], gameCond) {
    //Returns false or index of segment
    //STARTING FROM ONE!
    //That's to  get rid of bug, where 0 segment (Head) is said to be vacant
    //Since 0 is false in bool context
    for (var i = 0;i<gameCond.snake.length;i++) {
        if (gameCond.snake[i][0] == x && gameCond.snake[i][1] == y) {
            return i + 1;
        }
    }
    return false;
}

function randInRange(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init(gameCond, sets) {
    gameCond.snakeField.width = sets.dimension;
    gameCond.snakeField.height = sets.dimension;

    gameCond.snake.push(getRandomPosition(gameCond, sets));
    gameCond.food = getRandomPosition(gameCond, sets);

    redrawField(gameCond, sets);

    document.addEventListener("keydown", function(e) {
        var cur = gameCond.currentDirection;
        switch(e.keyCode) {
            //case upButtonKeyCode...
            case 87:
            if (gameCond.lastMove != "Down") {
                gameCond.currentDirection = "Up";
            }
            break;
            case 83:
            if (gameCond.lastMove != "Up") {
                gameCond.currentDirection = "Down";
            }
            break;
            case 65:
            if (gameCond.lastMove != "Right") {
                gameCond.currentDirection = "Left";
            }
            break;
            case 68:
            if (gameCond.lastMove != "Left") {
                gameCond.currentDirection = "Right";
            }
            break;
        }
    })
}

function redrawField(gameCond, sets) {
    clearField(gameCond, sets);
    drawSegment(gameCond.food, "food", sets);

    for (var [index, segment] of gameCond.snake.entries()) {
        //The order matters, since head and tail may be the same index.
        //In this case, of course, the head is preferable, so in code it's first
        switch(index) {
            case 0:
                drawSegment(segment, "snakeHead", sets);
                break;
            case 1:
                drawSegment(segment, "snakeNeck", sets);
                break;
            case gameCond.snake.length - 1:
                drawSegment(segment, "snakeTail", sets);
                break;
            default:
                drawSegment(segment, "snake", sets);
        }
    }
}
function clearField(gameCond, sets) {
    sets.ctx.clearRect(0,0,sets.dimension, sets.dimension);
}


function animate(gameCond, sets) {
    var snake = gameCond.snake;
    var food = gameCond.food;

    var headCoord = snake[0];
    var tailIndex = snake.length - 1;

    if (gameCond.currentDirection == "Up") {
        var newX = headCoord[0];
        var newY = headCoord[1] - block;
    }
    if (gameCond.currentDirection == "Left") {
        var newX = headCoord[0] - block;
        var newY = headCoord[1];
    }
    if (gameCond.currentDirection == "Down") {
        var newX = headCoord[0];
        var newY = headCoord[1] + block;
    }
    if (gameCond.currentDirection == "Right") {
        var newX = headCoord[0] + block;
        var newY = headCoord[1];
    }

    if (sets.warpMode) {
        newX %= sets.dimension;
        newY %= sets.dimension;
        if (newX < 0) {
            newX = sets.dimension - sets.block;
        }
        if (newY < 0) {
            newY = sets.dimension - sets.block;
        }
    } else if (newX < 0 || newX > gameCond.dimension
                || newY < 0 || newY > gameCond.dimension) {
        gameOver();
        return;
    }

    if (sets.stepOverMode != "stepOver") {
        var indexOfSegmentAt = isOnSnake([newX, newY], gameCond);

        if (indexOfSegmentAt) {
            if (sets.stepOverMode == "soft") {
                gameCond.snake.splice(indexOfSegmentAt);
            } 
            if (sets.stepOverMode == "hard") {
                gameOver();
            }
        }
    }

    snake.unshift([newX, newY]);
    gameCond.lastMove = gameCond.currentDirection;

    //Remove Tail
    if (isOnFood(snake[0], gameCond)) {
        gameCond.food = getRandomPosition(gameCond, sets);
    } else {
        snake.pop();
    }

    redrawField(gameCond, sets);
}