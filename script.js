var rects = [];
var keyPressed = {}, wep = {}, pickup = {}, plImg = {};
var score = 0, playerHealth = 3, frameNum = 0, frameSet = 0;
var currLvlArr = { x: 0, y: 0 };
var snakes, bats, level, levelBlocks, levelSet, healthPickups, currLvl;

document.onkeydown = function (e) { keyPressed[e.which] = true };
document.onkeyup = function (e) { keyPressed[e.which] = false };

var gameOver = false;

// player is a rectangle with extra properties
var player = null, sword, scythe, currWep;

(function(){
	initImages();

	levelSet = "overworld";
	currLvl = overworld;

	//change to overworld numbers
	var currLvlArr = { x: 0, y: 0 };

	loadGame(currLvl[currLvlArr.x][currLvlArr.y]);
})();


function snakeEnemy(x, y, w, h) {
    return { x: x, y: y, w: w, h: h };
}


function batEnemy(x, y, w, h) {
    return { x: x, y: y, w: w, h: h };
}


function initImages () {
	// sword animation
	wep.swRimg = document.getElementById('sword_r');
	wep.swLimg = document.getElementById('sword_l');
	wep.swUimg = document.getElementById('sword_u');
	wep.swDimg = document.getElementById('sword_d');

	// warscythe animation
	wep.wsRimg = document.getElementById('scythe_r');
	wep.wsLimg = document.getElementById('scythe_l');
	wep.wsUimg = document.getElementById('scythe_u');
	wep.wsDimg = document.getElementById('scythe_d');

	plImg.img = document.getElementById("player_d");	
	plImg.heart = document.getElementById('heart');

	pickup.heartPickup = document.getElementById('heartPickup');
}


function loadGame(lvlArray) {
	rects = [];
	snakes = [];
	bats = [];
	levelBlocks = [];
	level = {};
	healthPickups = [];
	if(player === null) {
		player = rect(190, 390, 32, 32);
	}
	sword = rect(-50, -50, 40, 40);
	scythe = rect(-50, -50, 150, 150);
	player.velocity = { x: 0, y: 0 };
	gameOver = false;
	currWep = scythe;

	loadArea(lvlArray);
}


// draw the player area using levels script file
function loadArea(lvlArray) {
	var c = document.getElementById('screen').getContext('2d');
	c.clearRect(0, 0, c.width, c.height);
	
	for(var i = 0; i < lvlArray.length; i++) {
		for(var n = 0; n < lvlArray[i].length; n ++) {
			var block;
			switch (lvlArray[i][n]) {
				case "+":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "caveBoundary";
					rects.push(block);
					break;
				case "o":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "stone" + (Math.floor(Math.random() * 4) + 1);
					rects.push(block);
					break;
				case "^":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "cactusTop";
					rects.push(block);
					break;
				case "x":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "cactusBottom";
					rects.push(block);
					break;
				case "g":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "grassBoundary";
					rects.push(block);
					break;
				case "*":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "bush";
					rects.push(block);
					break;
				case "l":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "volBoundary";
					rects.push(block);
					break;
				case "e":
					block = rect(n * 20, i * 20, 20, 20);
					block.type = "emptyBoundary";
					rects.push(block);
					break;
				case "S":
					snakes.push(snakeEnemy(n * 20, i * 20, 30, 30));
					snakes[snakes.length - 1].velocity = { x: 0, y: 0 };
					break;
				case "B":
					bats.push(batEnemy(n * 20, i * 20, 20, 16));
					bats[bats.length - 1].velocity = { x: 0, y: 0 };
					break;
				case "C":
					level.coords = rect(n * 20, i * 20, 20, 20);
					level.type = "cave";
					const caveLvl = JSON.parse(JSON.stringify(level));
					levelBlocks.push(caveLvl);
					break;
				case "V":
					level.coords = rect(n * 20, i * 20, 20, 20);
					level.type = "volcano";
					const volLvl = JSON.parse(JSON.stringify(level));
					levelBlocks.push(volLvl);
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
	if(p.x > 960) {
		currLvlArr.x += 1;

		loadGame(currLvl[currLvlArr.x][currLvlArr.y]);
		p.x = 5;
	}

	// move left
	if(p.x < 0) {
		currLvlArr.x -= 1;

		loadGame(currLvl[currLvlArr.x][currLvlArr.y]);
		p.x = 955;
	}

	// move down	
	if(p.y > 540) {
		currLvlArr.y += 1;

		loadGame(currLvl[currLvlArr.x][currLvlArr.y]);
		p.y = 5;
	}

	// move up
	if(p.y < 0) {
		currLvlArr.y -= 1;

		loadGame(currLvl[currLvlArr.x][currLvlArr.y]);
		p.y = 535;
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

	for (i = 0; i < levelBlocks.length; i++) {
		if (overlap(c, levelBlocks[i].coords)) {
			switch (levelBlocks[i].type) {
				case "cave":
					currLvl = cave;
					levelSet = "cave";
					var c = document.getElementById('screen').getContext('2d');
					break;
				case "volcano":
					currLvl = volcano;
					levelSet = "volcano";
					var c = document.getElementById('screen').getContext('2d');
					break;
			}
			loadGame(currLvl[0][0]);
		}
	}
}


// move the enemy
function moveEnemy(p, vx, vy, index, enemy) {
	// move enemy along x axis, checking blocks and if within frame
	for (i = 0; i < rects.length; i++) {
		c = { x: p.x + vx, y: p.y, w: p.w, h: p.h }
		if (overlap(c, rects[i])) {
			if (vx < 0) vx = rects[i].x + rects[i].w - p.x
			else if (vx > 0) vx = rects[i].x - p.x - p.w
		}
	}
	if(p.x < 20) {
		p.x = 21;
		p.x -= vx;
	}
	else if (p.x > 780) {
		p.x = 759;
		p.x -= vx;
	}
	else {
		p.x += vx;
	}
    
	// move enemy along y axis, checking blocks and if within frame
	for (i = 0; i < rects.length; i++) {
		c = { x: p.x, y: p.y + vy, w: p.w, h: p.h }
		if (overlap(c, rects[i])) {
			if (vy < 0) vy = rects[i].y + rects[i].h - p.y
			else if (vy > 0) vy = rects[i].y - p.y - p.h
		}
	}
    if(p.y < 20) {
		p.y = 21;
		p.y -= vy;
	}
	else if (p.y > 780) {
		p.y = 759;
		p.y -= vy;
	}
	else {
		p.y += vy;
	}
	
	if (overlap(p, player)) {
		if(playerHealth > 1) {
			playerHealth--;
			removeEnemy(enemy, index);
		}
		else {
			gameOver = true;
			playerHealth--;
		}
	}
    if (overlap(p, currWep)) {
		score += 100;
		removeEnemy(enemy, index);

		if(Math.floor((Math.random() * 10) + 1) == 9) {
			healthPickups.push(rect(p.x, p.y, 12, 12));
		}
	}
}


function removeEnemy(enemy, index) {
	switch (enemy) {
		case "snake":
			snakes.splice(index, 1);
			break;
		case "bat":
			bats.splice(index, 1);
			break;
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
        moveEnemy(snakes[i], snakes[i].velocity.x, snakes[i].velocity.y, i, "snake");
	}
	
	for(var i = 0; i < bats.length; i++) {
        if(frameNum === 1 || Math.round(Math.random()) === 1) {
			// set bats to go to random places at a faster pace
            if(frameNum % 40 === 0 || frameNum === 1) {
                bats[i].velocity.x = Math.floor(Math.random() * 4 - 1);
                bats[i].velocity.y = Math.floor(Math.random() * 4 - 1);
			}
		}
        moveEnemy(bats[i], bats[i].velocity.x, bats[i].velocity.y, i, "bat");
	}
	
	document.getElementById("score").innerHTML = score.toString();
}


// renders a frame
function draw() {
	if(frameSet >= 1) {
		frameSet += 1;
	}
	if(frameSet > 30) {
		frameSet = 0;
	}

	var c = document.getElementById('screen').getContext('2d');
	c.fillRect(0, 0, c.canvas.width, c.canvas.height);

	switch(levelSet) {
		case "overworld":
			c.drawImage(overWBG[currLvlArr.x][currLvlArr.y], 0, 0);
			break;
		case "cave":
			c.drawImage(caveBG, 0, 0);
			break;
		case "volcano":
			c.drawImage(volcanoBG, 0, 0);
			break;
	}

	drawHealth(c);
	
	// draw player
	if(!gameOver) {
		if(keyPressed[68]) {
			plImg.img = document.getElementById("player_r");
		}
		else
			if(keyPressed[65]) {
				plImg.img = document.getElementById("player_l");
			}
			else
				if(keyPressed[83]) {
					plImg.img = document.getElementById("player_d");
				}
				else
					if(keyPressed[87]) {
						plImg.img = document.getElementById("player_u");
					}
		c.drawImage(plImg.img, player.x - 6, player.y - 5);
	}
	else {
		var gImg = document.getElementById('gameover');
        c.drawImage(gImg, 100, 60);

        var dImg = document.getElementById('player_dead');
        c.drawImage(dImg, player.x - 6, player.y - 5);
	}
    
	// draw currWep on F key press
	if(keyPressed[70] && frameSet == 0) {
		frameSet = 1;
	}

	if(frameSet != 0) {
		createWepAnimation(c);
	}
	
	drawLevelBlocks(c);
	drawEnemies(c);
	drawPickupsAndOther(c);
}


function drawHealth(c) {
	for(var i = 1; i <= playerHealth; i++) {
		var offsetX = -5;
		c.drawImage(plImg.heart, offsetX + (i * 20) + 10, 20);
	}
}


function drawLevelBlocks(c) {
	// draw level with blocks
	var caveBoundaryImg = document.getElementById("caveBoundary");
	var cactusTopImg = document.getElementById("cactusTop");
	var cactusBottomImg = document.getElementById("cactusBottom");
	var grassBoundaryImg = document.getElementById("grassBoundary");
	var bushImg = document.getElementById("bush");
	var volBoundaryImg = document.getElementById("volBoundary");
	var emptyBoundaryImg = document.getElementById("emptyBoundary");
	
	// default boundary block type is boundary block
	var imgType = caveBoundaryImg;

	for (var i = 0; i < rects.length; i++) {
		var r = rects[i];
		switch (rects[i].type) {
			case "caveBoundary":
				imgType = caveBoundaryImg;
				break;
			case "stone1":
				imgType = document.getElementById("stone1");
				break;
			case "stone2":
				imgType = document.getElementById("stone2");
				break;
			case "stone3":
				imgType = document.getElementById("stone3");
				break;
			case "stone4":
				imgType = document.getElementById("stone4");
				break;
			case "cactusTop":
				imgType = cactusTopImg;
				break;
			case "cactusBottom":
				imgType = cactusBottomImg;
				break;
			case "grassBoundary":
				imgType = grassBoundaryImg;
				break;
			case "volBoundary":
				imgType = volBoundaryImg;
				break;
			case "emptyBoundary":
				imgType = emptyBoundaryImg;
				break;
			case "bush":
				imgType = bushImg;
				break;
		}
		c.drawImage(imgType, r.x, r.y);
	}
}


function drawEnemies(c) {
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

	var batImg = document.getElementById('bat');
    if (bats.length > 0) {
        for (var i = 0; i < bats.length; i++) {
			c.drawImage(batImg, bats[i].x, bats[i].y);
        }
	}
}


function drawPickupsAndOther(c) {
	if(healthPickups.length > 0) {
		for(var i = 0; i < healthPickups.length; i++) {
			c.drawImage(pickup.heartPickup, healthPickups[i].x, healthPickups[i].y);
		}
	}

	var caveImg = document.getElementById("caveEntrance");
	var volImg = document.getElementById("volcanoEntrance");
	if(levelBlocks.length > 0) {
		for(var i = 0; i < levelBlocks.length; i++) {
			switch (levelBlocks[i].type) {
				case "cave":
					c.drawImage(caveImg, levelBlocks[i].coords.x, levelBlocks[i].coords.y);
					break;
				case "volcano":
					c.drawImage(volImg, levelBlocks[i].coords.x, levelBlocks[i].coords.y);
					break;
			}
		}
	}
}


function createWepAnimation(c) {
	var xLoc, yLoc, sw, lr = false;

	// allow a weapon switch to add later
	var currWepRImg = wep.wsRimg,
		currWepLImg = wep.wsLimg,
		currWepUImg = wep.wsUimg,
		currWepDImg = wep.wsDimg;

		switch(plImg.img.src.substr(plImg.img.src.indexOf("player_"))) {
			case "player_r.png":
				xLoc = 8, yLoc = -52, sw = currWepRImg, lr = true;
				// sword: xLoc = 14, yLoc = -6
				break;
			case "player_l.png":
				xLoc = -90, yLoc = -52, sw = currWepLImg, lr = true;
				// sword: xLoc = -24, yLoc = -6
				break;
			case "player_u.png":
				xLoc = -52, yLoc = -75, sw = currWepUImg, lr = false;
				// sword: xLoc = -3, yLoc = -8
				break;
			case "player_d.png":
				xLoc = -74, yLoc = 14, sw = currWepDImg, lr = false;
				// sword: xLoc = -22, yLoc = 10
				break;
		}

		currWep.x = player.x + xLoc;
		currWep.y = player.y + yLoc;
		var imgX = 0, imgY = 0;

		if(lr) {
			imgY = Math.round(frameSet / 5) * 150;
		}
		else {
			imgX = Math.round(frameSet / 5) * 150;
		}

		c.drawImage(sw,
		    imgX,
		    imgY,
		    currWep.w,
		    currWep.h,
		    currWep.x,
		    currWep.y,
		    currWep.w,
		    currWep.h);
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
	levelSet = "overworld";
	score = 0, playerHealth = 3, frameNum = 0, frameSet = 0;
	player = rect(190, 390, 32, 32);
	loadGame(overworld[0][0]);
}