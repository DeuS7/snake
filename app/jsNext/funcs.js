function drawSegment([x,y], type, sets) {
    //Gets type, and asks in sets its color
    sets["ctx"].fillStyle = sets[type + "Color"];
    sets["ctx"].fillRect(x+1,y+1,sets["segmentWidth"],sets["segmentWidth"]);
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
    for (var snakeElem of gameCond.snake) {
        if (snakeElem[0] == x && snakeElem[1] == y) {
            return true;
        }
    }
    return false;
}

function randInRange(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init(gameCond, sets) {
    var snake = gameCond.snake;
    var food = gameCond.food;

    redrawField(gameCond, sets);

    document.addEventListener("keydown", function(e) {
        var cur = gameCond.currentActiveControlButton;
        switch(e.keyCode) {
            case 87:
            if (gameCond.lastMove != "S") {
                gameCond.currentActiveControlButton = "W";
            }
            break;
            case 83:
            if (gameCond.lastMove != "W") {
                gameCond.currentActiveControlButton = "S";
            }
            break;
            case 65:
            if (gameCond.lastMove != "D") {
                gameCond.currentActiveControlButton = "A";
            }
            break;
            case 68:
            if (gameCond.lastMove != "A") {
                gameCond.currentActiveControlButton = "D";
            }
            break;
        }
    })
}

function redrawField(gameCond, sets) {
    drawSegment(gameCond.food, "food", sets);
    for (var segment of gameCond.snake) {
        drawSegment(segment, "snake", sets);
    }
}

function animate(gameCond, sets) {
    var snake = gameCond.snake;
    var food = gameCond.food;

    var headCoord = snake[0];
    var tailIndex = snake.length - 1;

    if (gameCond.currentActiveControlButton == "W") {
        var toBeChanged = headCoord[1] - block;
        if (sets.warpMode) {
            toBeChanged %= sets.dimension;
            if (toBeChanged < 0) {
                toBeChanged = sets.dimension - sets.block;
            }
        } else if (toBeChanged < 0 || toBeChanged > gameCond.dimension) {
            gameOver();
            return;
        }

        snake.unshift([headCoord[0], toBeChanged]);
    }
    if (gameCond.currentActiveControlButton == "A") {
        var toBeChanged = headCoord[0] - block;
        if (sets.warpMode) {
            toBeChanged %= sets.dimension;
            if (toBeChanged < 0) {
                toBeChanged = sets.dimension - sets.block;
            }
        } else if (toBeChanged < 0 || toBeChanged > gameCond.dimension) {
            gameOver();
            return;
        }

        snake.unshift([toBeChanged, headCoord[1]]);
    }
    if (gameCond.currentActiveControlButton == "S") {
        var toBeChanged = headCoord[1] + block;
        if (sets.warpMode) {
            toBeChanged %= sets.dimension;
            if (toBeChanged < 0) {
                toBeChanged = sets.dimension - sets.block;
            }
        } else if (toBeChanged < 0 || toBeChanged > gameCond.dimension) {
            gameOver();
            return;
        }

        snake.unshift([headCoord[0], toBeChanged]);
    }
    if (gameCond.currentActiveControlButton == "D") {
        var toBeChanged = headCoord[0] + block;
        if (sets.warpMode) {
            toBeChanged %= sets.dimension;
            if (toBeChanged < 0) {
                toBeChanged = sets.dimension - sets.block;
            }
        } else if (toBeChanged < 0 || toBeChanged > gameCond.dimension) {
            gameOver();
            return;
        }
        
        snake.unshift([toBeChanged, headCoord[1]]);
    }
    gameCond.lastMove = gameCond.currentActiveControlButton;

    //Remove Tail
    if (isOnFood(snake[0], gameCond)) {
        gameCond.food = getRandomPosition(gameCond, sets);
    } else {
        drawSegment(snake.pop(), "null", sets);
    }

    redrawField(gameCond, sets);
}