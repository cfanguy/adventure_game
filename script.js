var rects = [];
var snakes = [];
var score = 0;
var keyPressed = {};
var playerHealth = 3;
var areaName = "topLeft";

var frameNum = 0, frameSet = 0, numberOfFrames = 9;

document.onkeydown = function (e) { keyPressed[e.which] = true };
document.onkeyup = function (e) { keyPressed[e.which] = false };

// set initial player img
var img = document.getElementById("player_r");

var swRimg = document.getElementById('sword_r');
var swLimg = document.getElementById('sword_l');
var swUimg = document.getElementById('sword_u');
var swDimg = document.getElementById('sword_d');

var heart = document.getElementById('heart');
var heartPickup = document.getElementById('heartPickup');

var gameOver = false;

// player is a rectangle with extra properties
var player = null, sword;

(function(){
	loadGame();
})();


function snakeEnemy(x, y, w, h) {
    return { x: x, y: y, w: w, h: h };
}


function loadGame() {
	rects = [];
	snakes = [];
	healthPickups = [];
	score = 0;
	playerHealth = 3;
	if(player === null) {
		player = rect(390, 390, 26, 35);
	}
	sword = rect(30, 30, 40, 40);
	player.velocity = { x: 0, y: 0 };
	gameOver = false;

	loadArea();
	//createSnakes();
}


// draw the player area using levels script file
function loadArea() {
	var c = document.getElementById('screen').getContext('2d');
	c.clearRect(0, 0, c.width, c.height);
	
	for(var i = 0; i < areas[areaName].length; i++) {
		for(var n = 0; n < areas[areaName][i].length; n ++) {
			var block;
			switch (areas[areaName][i][n]) {
				case "+":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "boundary";
					rects.push(block);
					break;
				case "o":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "stone";
					rects.push(block);
					break;
				case "^":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "treeTop";
					rects.push(block);
					break;
				case "x":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "treeBottom";
					rects.push(block);
					break;
				case "-":
					break;
			}
		}
	}
}


function rect(x, y, w, h) {
	return { x: x, y: y, w: w, h: h }
}


function createSnakes() {
	snakes.push(snakeEnemy(160, 160, 25, 25));
	snakes[0].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(600, 160, 25, 25));
	snakes[1].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(160, 600, 25, 25));
	snakes[2].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(600, 600, 25, 25));
	snakes[3].velocity = { x: 0, y: 0 };
	
	snakes.push(snakeEnemy(200, 200, 25, 25));
	snakes[4].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(560, 200, 25, 25));
	snakes[5].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(200, 560, 25, 25));
	snakes[6].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(560, 560, 25, 25));
	snakes[7].velocity = { x: 0, y: 0 };
	
	snakes.push(snakeEnemy(180, 180, 25, 25));
	snakes[8].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(580, 180, 25, 25));
	snakes[9].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(180, 580, 25, 25));
	snakes[10].velocity = { x: 0, y: 0 };
	snakes.push(snakeEnemy(580, 580, 25, 25));
	snakes[11].velocity = { x: 0, y: 0 };
}


// Returns true iff a and b overlap
function overlap(a, b) {
	return a.x < b.x + b.w && a.x + a.w > b.x &&
		 a.y < b.y + b.h && a.y + a.h > b.y
}


// Move the rectangle p along vx then along vy, but only move
// as far as we can without colliding with a solid rectangle
function movePlayer(p, vx, vy) {
	var i, c;

	// move right
	if(p.x > 800) {
		if(areaName.indexOf("top") >= 0) {
			areaName = "topRight";
		}
		else {
			areaName = "bottomRight";
		}

		loadGame();
		p.x = 5;
	}

	// move left
	if(p.x < 0) {
		if(areaName.indexOf("top") >= 0) {
			areaName = "topLeft";
		}
		else {
			areaName = "bottomLeft";
		}

		loadGame();
		p.x = 795;
	}

	// move down	
	if(p.y > 800) {
		if(areaName.indexOf("Left") >= 0) {
			areaName = "bottomLeft";
		}
		else {
			areaName = "bottomRight";
		}

		loadGame();
		p.y = 5;
	}

	// move up
	if(p.y < 0) {
		if(areaName.indexOf("Left") >= 0) {
			areaName = "topLeft";
		}
		else {
			areaName = "topRight";
		}

		loadGame();
		p.y = 795;
	}

    // Move rectangle along x axis
	for (i = 0; i < rects.length; i++) {
		c = { x: p.x + vx, y: p.y, w: p.w, h: p.h }
		if (overlap(c, rects[i])) {
			if (vx < 0) vx = rects[i].x + rects[i].w - p.x
			else if (vx > 0) vx = rects[i].x - p.x - p.w
		}
	}
	p.x += vx

	// Move rectangle along y axis
	for (i = 0; i < rects.length; i++) {
		c = { x: p.x, y: p.y + vy, w: p.w, h: p.h }
		if (overlap(c, rects[i])) {
			if (vy < 0) vy = rects[i].y + rects[i].h - p.y
			else if (vy > 0) vy = rects[i].y - p.y - p.h
		}
	}
	p.y += vy

	for (i = 0; i < healthPickups.length; i++) {
		if (overlap(c, healthPickups[i])) {
			playerHealth++;
			healthPickups.splice(i, 1);
		}
	}
}


// move the snake
function moveSnake(p, vx, vy, index) {
    // move enemy along x axis
    for (var i = 0; i < rects.length; i++) {
        var c = { x: p.x + vx, y: p.y, w: p.w, h: p.h };
		if (overlap(c, rects[i])) {
			if (vx < 0) vx = rects[i].x + rects[i].w - p.x
			else if (vx > 0) vx = rects[i].x - p.x - p.w
		}
    }
    p.x += vx;
 
    // move enemy along y axis
    for (var i = 0; i < rects.length; i++) {
        var c = { x: p.x, y: p.y + vy, w: p.w, h: p.h };
		if (overlap(c, rects[i])) {
			if (vy < 0) vy = rects[i].y + rects[i].h - p.y
			else if (vy > 0) vy = rects[i].y - p.y - p.h
		}
    }
    p.y += vy;
	
	if (overlap(c, player)) {
		if(playerHealth > 1) {
			playerHealth--;
			snakes.splice(index, 1);
		}
		else {
			gameOver = true;
			playerHealth--;
		}
	}
    if (overlap(c, sword)) {
		score += 100;
		snakes.splice(index, 1);

		if(Math.floor((Math.random() * 10) + 1) == 9) {
			healthPickups.push(rect(p.x, p.y, 12, 12));
		}
	}
}


// Updates the state of the game for the next frame
function update() {
	frameNum += 1;

    player.velocity.x = 3 * (!!keyPressed[68] - !!keyPressed[65]);
    player.velocity.y = 3 * (!!keyPressed[83] - !!keyPressed[87]);

	movePlayer(player, player.velocity.x, player.velocity.y);
	
	for(var i = 0; i < snakes.length; i++) {
        if(frameNum === 1 || Math.round(Math.random()) === 1) {
            // set snakes to go random places
            if(frameNum % 40 === 0 || frameNum === 1) {
                snakes[i].velocity.x = Math.floor(Math.random() * 3 - 1);
                snakes[i].velocity.y = Math.floor(Math.random() * 3 - 1);
            }
        }
        moveSnake(snakes[i], snakes[i].velocity.x, snakes[i].velocity.y, i);
    }
    
    if(frameNum % 120 === 0 && frameNum !== 0) {
        var newSnakeX = Math.round(Math.random()) === 1 ? 700 : 260;
        var newSnakeY = Math.round(Math.random()) === 1 ? 700 : 260;
        
        snakes.push(snakeEnemy(newSnakeX, newSnakeY, 25, 25));
        snakes[snakes.length - 1].velocity = { x: 0, y: 0 };
    }
	
	document.getElementById("score").innerHTML = score.toString();
}


// renders a frame
function draw() {
	if(frameSet >= 1) {
		frameSet += 1;
	}
	if(frameSet > 45) {
		frameSet = 0;
	}

	var c = document.getElementById('screen').getContext('2d');

	// draw background
	c.fillStyle = '#000';
	c.fillRect(0, 0, c.canvas.width, c.canvas.height);

	drawHealth(c);
	
	// draw player
	if(!gameOver) {
		if(keyPressed[68]) {
			img = document.getElementById("player_r");
		}
		else
			if(keyPressed[65]) {
				img = document.getElementById("player_l");
			}
			else
				if(keyPressed[83]) {
					img = document.getElementById("player_d");
				}
				else
					if(keyPressed[87]) {
						img = document.getElementById("player_u");
					}
		c.drawImage(img, player.x - 6, player.y - 5);
	}
	else {
		var gImg = document.getElementById('gameover');
        c.drawImage(gImg, 100, 60);

        var dImg = document.getElementById('player_dead');
        c.drawImage(dImg, player.x - 6, player.y - 5);
	}
    
	// draw sword on F key press
	if(keyPressed[70] && frameSet == 0) {
		frameSet = 1;
	}

	if(frameSet != 0) {
		createSwordAnimation(c, frameNum);
	}

	// draw level with blocks
	var boundImg = document.getElementById("boundary");
	var stoneImg = document.getElementById("stone");
	var treeTopImg = document.getElementById("treeTop");
	var treeBottomImg = document.getElementById("treeBottom");
	
	// default boundary block type is boundary block
	var imgType = boundImg;

	for (var i = 0; i < rects.length; i++) {
		var r = rects[i];
		switch (rects[i].type) {
			case "boundary":
				imgType = boundImg;
				break;
			case "stone":
				imgType = stoneImg;
				break;
			case "treeTop":
				imgType = treeTopImg;
				break;
			case "treeBottom":
				imgType = treeBottomImg;
				break;
		}
		c.drawImage(imgType, r.x, r.y);
	}
	
	var snImg = document.getElementById('snake_l');
    var snRImg = document.getElementById('snake_r');
    if (snakes.length > 0) {
        for (var i = 0; i < snakes.length; i++) {
            if (snakes[i].velocity.x > 0) {
                c.drawImage(snRImg, snakes[i].x, snakes[i].y);
            }
            else {
                c.drawImage(snImg, snakes[i].x, snakes[i].y);
            }
        }
	}
	
	if(healthPickups.length > 0) {
		for(var i = 0; i < healthPickups.length; i++) {
			c.drawImage(heartPickup, healthPickups[i].x, healthPickups[i].y);
		}
	}
}


function drawHealth(c) {
	for(var i = 1; i <= playerHealth; i++) {
		var offsetX = -5;
		c.drawImage(heart, offsetX + (i * 20) + 10, 20);
	}
}


function createSwordAnimation(c) {
	var xLoc, yLoc, sw, lr = false;

		switch(img.src.substr(img.src.indexOf("player_"))) {
			case "player_r.png":
				xLoc = 14, yLoc = -6, sw = swRimg, lr = true;
				break;
			case "player_l.png":
				xLoc = -24, yLoc = -6, sw = swLimg, lr = true;
				break;
			case "player_u.png":
				xLoc = -3, yLoc = -8, sw = swUimg, lr = false;
				break;
			case "player_d.png":
				xLoc = -22, yLoc = 10, sw = swDimg, lr = false;
				break;
		}

		sword.x = player.x + xLoc;
		sword.y = player.y + yLoc;
		var imgX = 0, imgY = 0;

		if(lr) {
			imgY = Math.round(frameSet / 5) * 40;
		}
		else {
			imgX = Math.round(frameSet / 5) * 40;
		}

		c.drawImage(sw,
		    imgX,
		    imgY,
		    sword.w,
		    sword.h,
		    sword.x,
		    sword.y,
		    sword.w,
		    sword.h);
}


// set up the game loop
window.onload = function() {
	setInterval(function() {
		if(gameOver == false) {            
			update();
			draw();
		}
	}, 1000 / 60);
}



document.getElementById("reset").addEventListener("click", reset, false);
function reset() {
	areaName = "topLeft";
	loadGame();
}