Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

var colors = ["purple", "blue", "yellow", "red", "green"];

var container = document.getElementById("container");
var targetContainer = document.getElementById("targetContainer");
var moveCounter = document.getElementById("moveCounter");

var blankBlockRow, blankBlockCol, elements, targetElements;

var moveCount = 0;

// console.log(blankBlockRow);
// console.log(blankBlockCol);

init();
function init() {
    blankBlockRow = Math.floor((Math.random() * 5));
    blankBlockCol = Math.floor((Math.random() * 5));

    elements = [...Array(5)].map(x => Array(5).fill(0));

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var item = colors.random();
            elements[i][j] = item;
            // container.appendChild(block);
        }
    }

    render();

    targetElements = [...Array(3)].map(x => Array(3).fill(0));

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var item = colors.random();
            targetElements[i][j] = item;
            // container.appendChild(block);
        }
    }
    renderTarget();
}

function moveUp() {
    if (blankBlockRow + 1 > 4) return;
    var temp = elements[blankBlockRow + 1][blankBlockCol];
    blankBlockRow++;
    elements[blankBlockRow - 1][blankBlockCol] = temp;

    moveCount++;
}

function moveDown() {
    if (blankBlockRow - 1 < 0) return;
    var temp = elements[blankBlockRow - 1][blankBlockCol];
    blankBlockRow--;
    elements[blankBlockRow + 1][blankBlockCol] = temp;

    moveCount++;
}

function moveLeft() {
    if (blankBlockCol + 1 > 4) return;
    var temp = elements[blankBlockRow][blankBlockCol + 1];
    blankBlockCol++;
    elements[blankBlockRow][blankBlockCol - 1] = temp;

    moveCount++;
}

function moveRight() {
    if (blankBlockCol - 1 < 0) return;
    var temp = elements[blankBlockRow][blankBlockCol - 1];
    blankBlockCol--;
    elements[blankBlockRow][blankBlockCol + 1] = temp;

    moveCount++;
}

function render() {
    container.innerHTML = "";
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var block = document.createElement("div");
            block.className = "gameBlock";

            //console.log(item);
            block.style = "background-color:" + elements[i][j] + ";";

            if (i == blankBlockRow && j == blankBlockCol) {
                block.style = "background-color:grey;";
            }
            container.appendChild(block);
        }
    }

    moveCounter.innerHTML = moveCount;
}

function renderTarget() {
    targetContainer.innerHTML = "";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var block = document.createElement("div");
            block.className = "targetBlock";
            //console.log(item);
            block.style = "background-color:" + elements[i][j] + ";";

            targetContainer.appendChild(block);
        }
    }
}

function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 40, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX <= 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY <= 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}


swipedetect(container, function (swipedir) {
    //swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir == 'left') {
        moveLeft();
        console.log('You just swiped left!');
    }
    else if (swipedir == 'right') {
        moveRight();
        console.log('You just swiped right!');
    }

    else if (swipedir == 'up') {
        moveUp();
        console.log('You just swiped up!');
    }

    else if (swipedir == 'down') {
        moveDown();
        console.log('You just swiped down!');
    }

    render();
});

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            // console.log("Upre");
            // console.log(blankBlockRow + 1);
            moveUp();
            break;
        case 'ArrowDown':
            // console.log("Niche");
            // console.log(blankBlockRow - 1);
            moveDown();
            break;
        case 'ArrowLeft':
            // console.log("Baame");
            // console.log(blankBlockCol + 1);
            moveLeft();
            break;
        case 'ArrowRight':
            // console.log("Daane");
            // console.log(blankBlockCol - 1);
            moveRight();

    }

    render();
};

// ---------------- Stopwatch -------------------

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
}

// Create function to display buttons

function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
// Create event listeners

// let playButton = document.getElementById("playButton");
// let pauseButton = document.getElementById("pauseButton");
// let resetButton = document.getElementById("resetButton");

// playButton.addEventListener("click", start);
// pauseButton.addEventListener("click", pause);
// resetButton.addEventListener("click", reset);

start();
