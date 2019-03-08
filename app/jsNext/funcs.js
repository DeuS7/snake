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
    } while(![x,y] in gameCond["blockedFields"]);
    

    return [x,y];
}

function randInRange(min,max) 
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init(gameCond, sets) {
    var snake = gameCond.snake;
    var food = gameCond.food;

    for (var segment of snake) {
        drawSegment(segment, "snake", sets);
    }
    drawSegment(food, "food", sets);

    document.addEventListener("keydown", function(e) {
        switch(e.keyCode) {
            case 87:
                gameCond.currentActiveControlButton = "W";
                break;
            case 83:
                gameCond.currentActiveControlButton = "S";
                break;
            case 65:
                gameCond.currentActiveControlButton = "A";
                break;
            case 68:
                gameCond.currentActiveControlButton = "D";
                break;
        }
    })
}

function animate(gameCond, sets) {
    var snake = gameCond.snake;
    var food = gameCond.food;

    var headCoord = snake[0];
    var tailIndex = snake.length - 1;

    if (gameCond.currentActiveControlButton == "W") {
        gameCond.snake.unshift([headCoord[0], headCoord[1] - block]);
    }
    if (gameCond.currentActiveControlButton == "A") {
        gameCond.snake.unshift([headCoord[0] - block, headCoord[1]]);
    }
    if (gameCond.currentActiveControlButton == "S") {
        gameCond.snake.unshift([headCoord[0], headCoord[1] + block]);
    }
    if (gameCond.currentActiveControlButton == "D") {
        gameCond.snake.unshift([headCoord[0] + block, headCoord[1]]);
    }

    //Remove Tail
    drawSegment(gameCond.snake.pop(), "null", sets);
    for (var segment of gameCond.snake) {
        drawSegment(segment, "snake", sets);
    }


}