var table = document.getElementById("leaderboard_table");

var scoreString = window.localStorage.getItem("ColorTileScores");

var scores = JSON.parse(scoreString);

scores.sort(function (a, b) {
    return a.score - b.score;
});

scores.reverse();

for (var i = 0; i < scores.length; i++) {
    var myHtmlContent = "<td>" + (i + 1) + "</td>" + "<td>" + scores[i].username + "</td>" + "<td>" + scores[i].score + "</td>"
    var tableRef = table.getElementsByTagName('tbody')[0];

    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = myHtmlContent;
}