/*
 EXTENSION 1: ENEMIES
 
 To be honest, I am not an incredibly talented gamer and tend to die quickly. Therefore, it may have been better for me not to add this extension. However, I also believe that games should pose a challenge, which is why I decided to make to add enemies, after all. In the end, I am not just writing this game for myself, but for others to play as well. 
 
 Moreover, I found the programmatic aspects of implementing the enemies interesting since the code is a tad bit more challenging than some of the other ones introduced in the course. It also is important to point out that factory patterns are quite common in video game code. That is why I think learning about these patterns as early as possible is beneficial for anyone interested in writing video games. 
 
 The actual challenge in implementing this lies in placing the enemies in strategic locations that make the game difficult yet still fun to play. I am not sure that I good that aspect quite right. 

 EXTENSION 2: PLATFORMS
 
 Initially, I was a bit sceptical on the platforms because they did not seem to add much value to the game, and I was not sure if I would be able to create a decent design for them. However, when it came to implementing the enemies, I realised that I needed something that offered the player a bit of respite from the peskier of the lot, which is why I decided to add a few platforms scattered throughout the game in order to make it easier to hide/escape. It was also important to find strategic locations. 
 
 Of course, I am still not entirely convinced that it is quite right, as it seems to be hard for the player to jump on the platforms from time to time. But I also think that I found a somewhat nice colour of the platforms that make them fit in well with the overall aesthetics of the game.  

 
*/
let lives;
let jump_sound;
let looping_sound;

function preload()
{
	jump_sound = loadSound('assets/jump.wav');
	jump_sound.setVolume(0.1);
}

//start the game 
function setup() {
	lives = 3;
	start = startGame();
}

function draw() 
{
	background('lightcyan');
	noStroke();
    
	//3D effect
	fill('lightseagreen');
	rect(0, floorPos_y, width, height - floorPos_y);
	fill('seagreen')
	rect(0, floorPos_y, width, height / 20);
	push();
	translate(scrollPos, 0);
    
	//Draw clouds.
	drawClouds();
    
	//Draw mountains.
	drawMountains();
    
	//Draw trees.
	drawTrees();
    
	//Draw canyons.
	for(var i = 0; i < canyons.length; i++) 
    {
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}
    
	//Draw collectable items.
	for(var i = 0; i < collectibles.length; i++) 
    {
		if(!collectibles[i].isFound) 
        {
			drawCollectable(collectibles[i]);
			checkCollectable(collectibles[i]);
		}
	}
    
	//Draw platforms
	for(var i = 0; i < platforms.length; i++) 
    {
		platforms[i].draw();
	}
    
	//Draw flagpole
	renderFlagpole();
    
	//Check flagpole
	if(!flagpole.isReached) 
    {
		checkFlagpole();
	} 
    else 
    {
		fill(0, 0, 0);
		noStroke();
        
		textSize(14);
		textFont('Helvetica');
		return text("Level complete. Press space to continue", flagpole.x_pos - 100, floorPos_y - 350);
	}
    
	//Draw enemies
	for(var i = 0; i < enemies.length; i++) 
    {
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
        
		if(isContact) 
        {
			if(lives > 0) {
				lives -= 1;
				startGame();
				break;
			}
		}
	}
	pop();
    
	//Draw game score token 
	fill(0, 0, 0);
	noStroke();
    
	textSize(12);
	textFont('Verdana');
	text("Score: " + game_score, 20, 20);
    
	//Draw live tokens
	for(var i = 0; i < lives; i++) 
    {
		drawLiveTokens(100 + (i * 35));
	}
    
	//Draw game character.
	drawGameChar();
    
	//Check how many lives the character has left
	checkPlayerDie(lives);
    
	//Draw game over text
	if(lives == 0) 
    {
		fill(0, 0, 0);
		noStroke();
        
		textSize(14);
		textFont('Trebuchet MS');
		return text("Game over. Press space to continue.", gameChar_world_x, floorPos_y - 250);
	}
    
	//Game interaction logic
	moveLeft();
	moveRight();
	fall();
    
	//Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
}
// ---------------------
// Key control functions
// ---------------------
function keyPressed() 
{
	//left arrow key sets isLeft to true;
	if(keyCode == 37) 
    {
		isLeft = true;
	}
    
	//right arrowy key sets isRight to true
	if(keyCode == 39) 
    {
		isRight  = true;
	}
    
	//space key makes the character jump 
	if(keyCode == 32 && (gameChar_y == floorPos_y) && lives != 0) 
    {
		gameChar_y = gameChar_y - 100;
		jump_sound.play();
	}
    
	/*
	    continue playing the game if 
	    level one has been reached 
	*/
	if(flagpole.isReached && keyCode == 32) 
    {
		setup();
	}
    
	/*
	    replay game if lives = 0
	*/
	if(lives == 0 && keyCode == 32) 
    {
		setup();
	}
}

function keyReleased() 
{
	//left arrow key sets isLeft to false;
	if(keyCode == 37) 
    {
		isLeft = false;
	}
    
	//right arrowy key sets isRight to false
	if(keyCode == 39) 
    {
		isRight = false;
	}
}