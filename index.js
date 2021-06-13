var url_string = window.location.href
var url = new URL(url_string);
var mode = url.searchParams.get("mode");
var gameId = url.searchParams.get("id");

window.addEventListener("keydown", function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
});

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

var playerName;

var colors = ["purple", "blue", "yellow", "red", "green", "violet"];

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


var nameButton = document.getElementById("nameButton");

nameButton.addEventListener("click", function (e) {
    var nameField = document.getElementById("player_name");
    playerName = nameField.value;

    if (playerName.length > 0) {
        makeAllVisible();
        document.getElementById("showNameBlock").innerHTML = "<h2>Player: " + playerName + "</h2>";
        document.getElementById("nameInputBlock").innerHTML = "";
        init();

        document.getElementById("scoreblock").style.visibility = "hidden";
    }
});


//init();
function init() {
    var newGame = false;

    if (gameId == null) {
        gameId = makeId(8);
        newGame = true;
    }

    document.getElementById("gameRules").innerHTML = "Given a " + gridSize + "x" + gridSize + " grid made with tiles of 6 different colors, your goal is to try and make this " + (gridSize - 2) + "x" + (gridSize - 2) + " grid in its center. Out of the " + (gridSize * gridSize) + " tiles, one is empty which can be swapped with any of the four adjacent tiles.";

    url = window.location.href;
    rawUrl = url.split("?")[0];

    console.log(gameId);

    document.getElementById("difficultySwitcher").innerHTML = "Difficulty: <font style='color:" + (gridSize == 6 ? "red" : "green") + ";'>" + (gridSize == 6 ? "Hard" : "Easy") + "</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + (rawUrl + "?mode=" + (gridSize == 6 ? "easy" : "hard")) + "'>Switch to " + (gridSize == 6 ? "Easy" : "Hard") + "</a>";

    if (newGame) {
        // targetElements = [...Array(gridSize - 2)].map(x => Array(gridSize - 2).fill(0));

        // for (var i = 0; i < gridSize - 2; i++) {
        //     for (var j = 0; j < gridSize - 2; j++) {
        //         var item = colors.random();
        //         targetElements[i][j] = item;
        //         // container.appendChild(block);
        //     }
        // }

        // blankBlockRow = Math.floor((Math.random() * gridSize));
        // blankBlockCol = Math.floor((Math.random() * gridSize));

        // elements = [...Array(gridSize)].map(x => Array(gridSize).fill(0));

        // for (var i = 0; i < gridSize; i++) {
        //     for (var j = 0; j < gridSize; j++) {
        //         var item = colors.random();
        //         elements[i][j] = item;
        //         // container.appendChild(block);

        //         if (i == blankBlockRow && j == blankBlockCol) {
        //             elements[i][j] = "grey";
        //         }
        //     }
        // }

        putBlocks();

        var gameData = {
            target: targetElements,
            board: elements,
            blankRow: blankBlockRow,
            blankCol: blankBlockCol,
        };
    } else {
        var gameData = JSON.parse(window.localStorage.getItem('game_data_' + gameId));

        targetElements = gameData.target;
        elements = gameData.board;
        blankBlockRow = gameData.blankRow;
        blankBlockCol = gameData.blankCol;
    }

    renderTarget();
    render();

    start();
}

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
        sleep(1000);

        snd.play();
        var score = Math.floor(5000 - (moveCount * 5) - (totalSecond - 0.5));
        //alert("You Won!\n\nYour Score:" + score);
        document.getElementById("scoreblock").style.visibility = "visible";
        document.getElementById("scoreblock").innerHTML = "<h3>You Won!<br>Your Score: " + score + "</h3><br><a href='leaderboard.html'>See Scoreboard</a><br><br>";
        document.getElementById("gameBlock").innerHTML = "";

        var scoreboardData = {
            username: playerName,
            score: score,
        };

        var prevScoreString = window.localStorage.getItem("ColorTileScores");

        var scores = [];

        if (prevScoreString != null) scores = JSON.parse(prevScoreString);

        scores.push(scoreboardData);

        window.localStorage.setItem('ColorTileScores', JSON.stringify(scores));

        reset();
    }
}

function makeId(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

function makeAllVisible() {
    var cols = document.getElementsByClassName('initiallyHidden');
    for (i = 0; i < cols.length; i++) {
        cols[i].style.visibility = 'visible';
    }
}

function putBlocks() {
    targetElements = [...Array(gridSize - 2)].map(x => Array(gridSize - 2).fill(0));

    //["purple", "blue", "yellow", "red", "green", "violet"];
    var purpleCount = 0, purpleCount2 = 0;
    var blueCount = 0, blueCount2 = 0;
    var yellowCount = 0, yellowCount2 = 0;
    var redCount = 0, redCount2 = 0;
    var greenCount = 0, greenCount2 = 0;
    var violetCount = 0, violetCount2 = 0;

    for (var i = 0; i < gridSize - 2; i++) {
        for (var j = 0; j < gridSize - 2; j++) {
            var item = colors.random();
            targetElements[i][j] = item;
            // container.appendChild(block);

            switch (item) {
                case "purple":
                    purpleCount++;
                    break;
                case "blue":
                    blueCount++;
                    break;
                case "yellow":
                    yellowCount++;
                    break;
                case "red":
                    redCount++;
                    break;
                case "green":
                    greenCount++;
                    break;
                case "violet":
                    violetCount++;
                    break;
                default:
                    break;
            }
        }
    }

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
            } else {
                switch (item) {
                    case "purple":
                        purpleCount2++;
                        break;
                    case "blue":
                        blueCount2++;
                        break;
                    case "yellow":
                        yellowCount2++;
                        break;
                    case "red":
                        redCount2++;
                        break;
                    case "green":
                        greenCount2++;
                        break;
                    case "violet":
                        violetCount2++;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //["purple", "blue", "yellow", "red", "green", "violet"];

    if (purpleCount > purpleCount2 || blueCount > blueCount2 || yellowCount > yellowCount2 || redCount > redCount2 || greenCount > greenCount2 || violetCount > violetCount2) {
        putBlocks();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
