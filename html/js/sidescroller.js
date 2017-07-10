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

// player object
function Player() {
	this.x = 0;
	this.y = 0;
}

// Player update()
Player.prototype.update = function(){
	
}

// Player draw()
Player.prototype.draw = function(g){
	g.fillStyle = 'blue';
	g.fillRect(this.x, this.y, 20, 20);
}

var player = new Player();
function run(){
	player.update();
	player.draw(g);
}

setInterval(run, 1000/30);