var rects = [];
var snakes = [];
var score = 0;
var keyPressed = {};
var swordFrameLength = 0, disableSwordLength = 0;
var playerHealth = 3;

document.onkeydown = function (e) { keyPressed[e.which] = true };
document.onkeyup = function (e) { keyPressed[e.which] = false };

document.getElementById("reset").addEventListener("click", startGame, false);

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
var player, sword;

(function(){
  startGame();
})();


function snakeEnemy(x, y, w, h) {
    return { x: x, y: y, w: w, h: h };
}


function startGame() {
	rects = [];
	snakes = [];
	healthPickups = [];
	score = 0;
	playerHealth = 3;
	player = null;
	player = rect(390, 390, 26, 35);
	sword = rect(30, 30, 40, 25);
	player.velocity = { x: 0, y: 0 };
	gameOver = false;

	createSnakes();
	
	// horizontal blocks
	for(var i = 0; i < 800; i+=20) {
		rects.push(rect(i, 0, 20, 20));
		rects.push(rect(i, 780, 20, 20));
	}


	// vertical blocks
	for(var i = 0; i < 800; i+=20) {
		rects.push(rect(0, i, 20, 20));
		rects.push(rect(780, i, 20, 20));
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
function update(frameNum) {
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
function draw(frameNum) {
	var c = document.getElementById('screen').getContext('2d');

	// draw background
	c.fillStyle = '#000';
	c.fillRect(0, 0, c.canvas.width, c.canvas.height);

	drawHealth(c);
	
	// draw player
	if(!gameOver) {
		if(keyPressed[68]) {
			img = document.getElementById("player_r");
			swordFrameLength = 0;
			document.getElementById('sword_r').src = 'img/sword_r.gif' + '?a=' + Math.random();
		}
		else
			if(keyPressed[65]) {
				img = document.getElementById("player_l");
				swordFrameLength = 0;
				document.getElementById('sword_l').src = 'img/sword_l.gif' + '?a=' + Math.random();
			}
			else
				if(keyPressed[83]) {
					img = document.getElementById("player_d");
					swordFrameLength = 0;
					document.getElementById('sword_d').src = 'img/sword_d.gif' + '?a=' + Math.random();
				}
				else
					if(keyPressed[87]) {
						img = document.getElementById("player_u");
						swordFrameLength = 0;
						document.getElementById('sword_u').src = 'img/sword_u.gif' + '?a=' + Math.random();
					}
		c.drawImage(img, player.x - 6, player.y - 5);
	}
	else {
		var gImg = document.getElementById('gameover');
        c.drawImage(gImg, 100, 60);

        var dImg = document.getElementById('player_dead');
        c.drawImage(dImg, player.x - 6, player.y - 5);
	}
    
    // draw sword on shift key press
    createSwordImage(c, frameNum);

	// draw level with blocks
	var blImg = document.getElementById("block");
	for (var i = 0; i < rects.length; i++) {
		var r = rects[i];
		c.drawImage(blImg, r.x, r.y);
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


function createSwordImage(c, frameNum) {
	var xLoc, yLoc, sw, shiftPress = false;

	var frameCheck = swordFrameLength !== 0;
	var swordCheck = disableSwordLength === frameNum || disableSwordLength === 0;
	if(!frameCheck && swordCheck) {
		shiftPress = keyPressed[16];
		disableSwordLength = 0;
	}

	if(shiftPress || frameCheck) {
		// set swordFrameLength to sword animation length
		if(swordFrameLength == 0) {
			swordFrameLength = frameNum + 28;
			disableSwordLength = frameNum + 50;
		}
		else {
			if(swordFrameLength == frameNum) {
				swordFrameLength = 0;
			}
		}

		switch(img.src.substr(img.src.indexOf("player_"))) {
			case "player_r.png":
				xLoc = 14, yLoc = -6, sw = swRimg;
				break;
			case "player_l.png":
				xLoc = -24, yLoc = -6, sw = swLimg;
				break;
			case "player_u.png":
				xLoc = -3, yLoc = -8, sw = swUimg;
				break;
			case "player_d.png":
				xLoc = -22, yLoc = 10, sw = swDimg;
				break;
		}

		sword.x = player.x + xLoc;
		sword.y = player.y + yLoc;
		c.drawImage(sw, player.x + xLoc, player.y + yLoc);
    }
}


// set up the game loop
window.onload = function() {
    var frameNum = 1;
    
	setInterval(function() {
		if(gameOver == false) {
            if(frameNum < 100000) {
                frameNum++;
            }
            else {
                frameNum = 1;
            }
            
			update(frameNum);
			draw(frameNum);
		}
	}, 1000 / 60);
}