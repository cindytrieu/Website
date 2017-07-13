/*

--------------- SIDESCROLLER.JS ----------------
Author: Cindy Trieu
Copyright 2017

*/
"use strict";

// get the canvas to draw on it
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var g = ctx;

var bgColor = '#738293';
var dropColor = '#aec2ca';
var playerColor = '#f3f7fc';

var mouseX = canvas.width/2;
var playerWidth = 150;
var playerHeight = 75;

// ------------ MAKE DROPLETS ----------------
var dropWidth = 2;
var numDrops = 1000;
var droplets = [];
// create droplets
for(var i = 0; i < numDrops; i++){
	var speed = Math.random()*5 + 3;
	var startX = Math.random()*canvas.width;
	var startY = Math.random()*canvas.height;
	var height = Math.random()*17 + 10;
	droplets[i] = { x: startX, y: startY, speed: speed, height: height};
}

// ----------------- PLAYER -----------------
function Player(){
	this.x = canvas.width/2;
	this.y = canvas.height - 200;
}

Player.prototype.update = function(){
	this.x = mouseX;
};

Player.prototype.draw = function(){
	
	// umbrella top
	g.beginPath();
	g.arc(this.x, this.y, playerHeight, Math.PI, 0);
	g.fillStyle = playerColor;
	g.fill();
	g.closePath();
	
	// umbrella handle
	g.fillStyle = playerColor;
	g.fillRect(this.x, this.y, 5, 60);
	g.beginPath();
	g.arc(this.x + 12.5, this.y + 60, 10, 0, Math.PI);
	g.strokeStyle = playerColor;
	g.lineWidth = 5;
	g.stroke();
	g.closePath();
}

var player = new Player();

// ------------------ KITTY -------------------
var kittyWidth = 50;
var kittyHeight = 30;
var dir = 10;
var calmColor = '#50bee7';
var madColor =  '#b21e1e';

function Kitty(){
	this.x = canvas.width/2;
	this.y = canvas.height - kittyHeight;
	this.dir = dir;
}

Kitty.prototype.update = function(){
	var newDir = Math.random();
	var move = Math.random();
	
	if(newDir < .25){
		this.dir = -this.dir;
	}
	
	if(move < .25){
		var tempMove = this.x + this.dir;
		if (tempMove > kittyWidth/2 && tempMove < canvas.width - kittyWidth/2){
			this.x = tempMove;
		} else {
			this.dir = -this.dir;
		}
	}
}

Kitty.prototype.draw = function(){
	if(this.x > mouseX - playerWidth/2 && this.x < mouseX + playerWidth/2){
		g.fillStyle = calmColor;
	} else {
		g.fillStyle = madColor;
	}
	g.fillRect(this.x, this.y, kittyWidth, kittyHeight);
}

var kitty = new Kitty();

// ------------------ FUNCTIONS ---------------
function draw(){
	g.fillStyle = bgColor;
	g.fillRect(0,0, canvas.width, canvas.height);
	
	for( var i = 0; i < numDrops; i++){
		var d = droplets[i];
		g.fillStyle = dropColor;
		g.fillRect(d.x, d.y, dropWidth, d.height);
	}
	player.draw();
	kitty.draw();
}

function moveDroplets(){
	for( var i = 0; i < numDrops; i++){
		var d = droplets[i];
		d.y = d.y + d.speed;
		if(d.y > canvas.height){
			d.y = 0 - d.height;
		}
	}
}

function update() {
	moveDroplets();
	player.update();
	kitty.update();
}

function run(){
	update();
	draw();
}

setInterval(run, 1000/30);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX >= playerWidth/2 && relativeX <= canvas.width - playerWidth/2){
		mouseX = relativeX;
	}
}