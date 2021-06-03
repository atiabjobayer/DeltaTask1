var url_string = window.location.href
var url = new URL(url_string);
var mode = url.searchParams.get("mode");

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

var colors = ["purple", "blue", "yellow", "red", "green"];

var container = document.getElementById("container");
var targetContainer = document.getElementById("targetContainer");
var moveCounter = document.getElementById("moveCounter");

var blankBlockRow, blankBlockCol, elements, targetElements;

var moveCount = 0;

var gridSize = mode == "hard" ? 6 : 5;

if (gridSize == 6) {
    container.style.width = "360px";
    container.style.height = "360px";

    targetContainer.style.width = "120px";
    targetContainer.style.height = "120px";
}

var snd = new Audio("success.mp3");

init();
function init() { // buffers automatically when created
    document.getElementById("gameRules").innerHTML = "Given a " + gridSize + "x" + gridSize + " grid made with tiles of 6 different colors, your goal is to try and make this " + (gridSize - 2) + "x" + (gridSize - 2) + " grid in its center. Out of the " + (gridSize * gridSize) + " tiles, one is empty which can be swapped with any of the four adjacent tiles.";

    url = window.location.href;
    rawUrl = url.split("?")[0];

    document.getElementById("difficultySwitcher").innerHTML = "Difficulty: <font style='color:" + (gridSize == 6 ? "red" : "green") + ";'>" + (gridSize == 6 ? "Hard" : "Easy") + "</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + (rawUrl + "?mode=" + (gridSize == 6 ? "easy" : "hard")) + "'>Switch to " + (gridSize == 6 ? "Easy" : "Hard") + "</a>";

    targetElements = [...Array(gridSize - 2)].map(x => Array(gridSize - 2).fill(0));

    for (var i = 0; i < gridSize - 2; i++) {
        for (var j = 0; j < gridSize - 2; j++) {
            var item = colors.random();
            targetElements[i][j] = item;
            // container.appendChild(block);
        }
    }
    renderTarget();

    blankBlockRow = Math.floor((Math.random() * gridSize));
    blankBlockCol = Math.floor((Math.random() * gridSize));

    elements = [...Array(gridSize)].map(x => Array(gridSize).fill(0));

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var item = colors.random();
            elements[i][j] = item;
            // container.appendChild(block);

            if (i == blankBlockRow && j == blankBlockCol) {
                elements[i][j] = "grey";
            }
        }
    }

    render();
}


start();

function resetGame() {
    init();
    reset();
    start();
}

function checkWin() {
    var flag = true;

    for (var i = 1; i < gridSize - 1; i++) {
        for (var j = 1; j < gridSize - 1; j++) {
            if (elements[i][j] != targetElements[i - 1][j - 1]) {
                flag = false;
            }
        }
    }

    if (flag == true) {
        snd.play();
        var score = Math.floor(5000 - (moveCount * 5) - (totalSecond - 0.5));
        alert("You Won!\n\nYour Score:" + score);
        pause();
    }
}