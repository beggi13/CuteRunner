// =====
// SCORE
// =====

"use strict"

var score_canvas = document.getElementById("scoreCanvas");
var score_ctx = score_canvas.getContext("2d");

var lives = 5,
	score = 0,
	length = 5;
var rank = [500,400,300,200,100];

function score_init() {
	score_ctx.rect(0, 0, score_canvas.width, score_canvas.height);
	score_ctx.fillStyle = "#FFBDDE";
	score_ctx.fill();
	loadHighScores();
	render_score(score_ctx);
};

function render_score(ctx) {
	util.clearScoreCanvas(ctx);
	
	util.fillText(ctx, 20, 350, "bold 40px Arial", 'Score: ' + score, 'black');
	util.fillText(ctx, 20, 500, "bold 40px Arial", 'Lives: ', 'black');
	util.fillText(ctx, 20, 40, "bold 40px Arial", 'High Scores: ', 'black');
	
	for(var i = 0; i < lives; i++) {
		g_sprites.ship.drawCentredAt(ctx, 70+i*50, 550, 0);
	}
	
	for(var k = 0; k < length; k++) {
		util.fillText(ctx, 40, (80+(40*k)), '30px Arial', rank[k], 'black');
	}
}

function sortHighScores() {
	rank.sort(function(a,b){return b-a});
}

function saveHighScore(number) {
	for(var i = 0; i < length; i++) {
		if(rank[i] < number) {
			rank.splice(i, 0, number);
			break;
		}
	}
	sortHighScores();
	localStorage.setItem("HighScores", JSON.stringify(rank));
	localStorage.setItem("first_save", false);
}

function loadHighScores() {
	if(localStorage.getItem('first_save') === 'false') {
		rank = JSON.parse(localStorage.getItem("HighScores"));
	}
}