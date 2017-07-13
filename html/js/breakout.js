/*

--------------- BREAKOUT.JS ----------------
Author: Cindy Trieu
Copyright 2017

*/

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var g = ctx;

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 4;
var brickColumnCount = 10;
var brickRadius = 15;
/*
var brickWidth = 75;
var brickHeight = 20;
*/
var brickPadding = 25;
var brickOffsetTop = 50;
var brickOffsetSide = 50;

//create bricks
var bricks = [];
for( var c = 0; c < brickColumnCount; c++){
	bricks[c] = [];
	for( var r = 0; r < brickRowCount; r++){
		var tempR = Math.round(Math.random()*255);
		var tempG = Math.round(Math.random()*255);
		var tempB = Math.round(Math.random()*255);
		bricks[c][r] = { x: 0, y: 0, doDraw: true, r: tempR, g: tempG, b: tempB};
	}
}

var score = 0;

var lives = 3;



function drawBall(){
	g.beginPath();
	g.arc(x,y,ballRadius,0, Math.PI*2);
	g.fillStyle = "#0095DD";
	g.fill();
	g.closePath();
}

function drawPaddle(){
	g.fillStyle = "#0095DD";
	g.fillRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
}

function drawBricks(){
	for( c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			if(bricks[c][r].doDraw) {
				var brickX = (c*(brickRadius+brickPadding))+brickOffsetSide;
				var brickY = (r*(brickRadius+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				g.beginPath();
				g.arc(brickX, brickY, brickRadius, 0, Math.PI*2);
				g.fillStyle = "rgb(" + bricks[c][r].r + 
					"," + bricks[c][r].g + "," + bricks[c][r].b +")";
				g.fill();
				g.closePath();
			}
		}
	}
}

function collisionDetection(){
	for( c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			b = bricks[c][r];
			var distX = b.x - x;
			var distY = b.y - y;
			var dist = Math.sqrt(distX*distX + distY*distY);
			if(b.doDraw){
				if(dist < ballRadius + brickRadius){
					dy = -dy
					b.doDraw = false;
					score++;
					if(score == brickRowCount * brickColumnCount){
						alert("You win! Congratulations! Close this dialogue box to play again.");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore(){
	g.font = "16px Arial";
	g.fillStyle = "#0095DD";
	g.fillText("Score: " + score, 8, 20);
}

function drawLives(){
	g.font = "16px Arial";
	g.fillStyle = "#0095DD";
	g.fillText("Lives: " + lives, canvas.width-65, 20);
}

function draw() {
	g.clearRect(0,0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawLives();
	
	if(y + dy < ballRadius){
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth){
			var distX = x - (paddleX + paddleWidth/2);
			dx = dx + (distX/paddleWidth * 2);
			dy = -dy;
		} else {
			lives--;
			if(lives <= 0){
				alert("GAME OVER");
				document.location.reload();
			} else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
		dx = -dx;
	}
	
	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	}
	if (leftPressed && paddleX > 0){
		paddleX -= 7;
	}
	
	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();

function keyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	} else if (e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	} else if (e.keyCode == 37){
		leftPressed = false;
	}
}

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - paddleWidth/2;
	}
}







