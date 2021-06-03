function moveUp() {
    if (blankBlockRow + 1 > (gridSize - 1)) return;
    // var temp = elements[blankBlockRow + 1][blankBlockCol];
    // blankBlockRow++;
    // elements[blankBlockRow - 1][blankBlockCol] = temp;
    temp = elements[blankBlockRow + 1][blankBlockCol];
    elements[blankBlockRow + 1][blankBlockCol] = elements[blankBlockRow][blankBlockCol];
    elements[blankBlockRow][blankBlockCol] = temp;

    blankBlockRow++;

    moveCount++;
}

function moveDown() {
    if (blankBlockRow - 1 < 0) return;

    temp = elements[blankBlockRow - 1][blankBlockCol];
    elements[blankBlockRow - 1][blankBlockCol] = elements[blankBlockRow][blankBlockCol];
    elements[blankBlockRow][blankBlockCol] = temp;

    blankBlockRow--;

    moveCount++;
}

function moveLeft() {
    if (blankBlockCol + 1 > (gridSize - 1)) return;
    // var temp = elements[blankBlockRow][blankBlockCol + 1];
    // blankBlockCol++;
    // elements[blankBlockRow][blankBlockCol - 1] = temp;
    temp = elements[blankBlockRow][blankBlockCol + 1];
    elements[blankBlockRow][blankBlockCol + 1] = elements[blankBlockRow][blankBlockCol];
    elements[blankBlockRow][blankBlockCol] = temp;

    blankBlockCol++;

    moveCount++;
}

function moveRight() {
    if (blankBlockCol - 1 < 0) return;
    // var temp = elements[blankBlockRow][blankBlockCol - 1];
    // blankBlockCol--;
    // elements[blankBlockRow][blankBlockCol + 1] = temp;
    temp = elements[blankBlockRow][blankBlockCol - 1];
    elements[blankBlockRow][blankBlockCol - 1] = elements[blankBlockRow][blankBlockCol];
    elements[blankBlockRow][blankBlockCol] = temp;

    blankBlockCol--;

    moveCount++;
}

function render() {
    container.innerHTML = "";
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var block = document.createElement("div");
            block.className = "gameBlock";

            //console.log(item);
            block.style = "background-color:" + elements[i][j] + ";";
            container.appendChild(block);
        }
    }

    moveCounter.innerHTML = moveCount;

    checkWin();
}

function renderTarget() {
    targetContainer.innerHTML = "";
    for (var i = 0; i < gridSize - 2; i++) {
        for (var j = 0; j < gridSize - 2; j++) {
            var block = document.createElement("div");
            block.className = "targetBlock";
            //console.log(item);
            block.style = "background-color:" + targetElements[i][j] + ";";

            targetContainer.appendChild(block);
        }
    }
}