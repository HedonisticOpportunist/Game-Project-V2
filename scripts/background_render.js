// ---------------------------
// Background render functions
// ---------------------------
//Function to draw cloud objects.
function drawClouds() 
{
	// Draw clouds.
	for(var i = 0; i < clouds.length; i++) 
    {
		fill('ghostwhite');
		noStroke();
        
		ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].width, clouds[i].height);
	}
}

//Function to draw mountains objects.
function drawMountains() 
{
	for(var i = 0; i < mountains.length; i++) 
    {
		noStroke();
		fill('whitesmoke');
        
		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 150, mountains[i].y_pos - 415, mountains[i].x_pos + 350, mountains[i].y_pos);
	}
}

//Function to draw trees objects.
function drawTrees() 
{
	for(var i = 0; i < trees.length; i++) 
    {
		fill('palegoldenrod');
		rect(trees[i].treePos_x, treePos_y, 50, 235);
        
		fill('palegreen');
		ellipse(trees[i].treePos_x + 20, treePos_y, treePos_y, treePos_y - 50);
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------
//Function to draw canyon objects.

function drawCanyon(t_canyon) 
{
	fill('cornsilk');
	rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.width + 100);
}
//Function to check character whether a character is over a canyon.
function checkCanyon(t_canyon) 
{
	let distance;
	distance = int(dist(t_canyon.x_pos, t_canyon.y_pos, gameChar_world_x, gameChar_y));
    
	if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y) {
		isPlummeting = true;
	}
    
	if(isPlummeting) 
    {
		gameChar_y += 1;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------
// Function to draw collectable objects.

function drawCollectable(t_collectable) 
{
    
	// Draw collectable items
	stroke('darkcyan');
	strokeWeight(t_collectable.size + 15);
	point(t_collectable.x_pos, t_collectable.y_pos);
    
	stroke(102, 0, 204);
	strokeWeight(t_collectable.size);
	point(t_collectable.x_pos, t_collectable.y_pos);
    
	stroke('paleturquoise');
	strokeWeight(t_collectable.size + 10);
	point(t_collectable.x_pos - 10, t_collectable.y_pos);
	strokeWeight(5);
	noStroke();
	fill('skyblue');
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) 
{
	let range;
	range = int(dist(t_collectable.x_pos, t_collectable.y_pos, gameChar_world_x, gameChar_y));
    
	if(range < 48 && range > 10) 
    {
		t_collectable.isFound = true;
		game_score += 1;
	} 
    else 
    {
		t_collectable.isFound = false;
	}
}

// ---------------------------------
// Flagpole render and check functions
// ---------------------------------
function renderFlagpole() 
{
	push();
	strokeWeight(5);
	stroke(0, 0, 0);
    
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	fill(0, 100, 0);
	noStroke();
    
	if(flagpole.isReached) 
    {
		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	} 
    else
    {
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
	}
    
	pop();
}

function checkFlagpole() 
{
	let distance;
	distance = abs(gameChar_world_x - flagpole.x_pos);
    
	if(distance < 5) 
    {
		flagpole.isReached = true;
	}
}

// ---------------------------------
// Platform render function
// ---------------------------------
function createPlatforms(x, y, length) 
{
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function() 
        {
			fill('mediumturquoise');
			rect(this.x, this.y, this.length, 50);
		},
        
		checkContact: function(gc_x, gc_y) 
        {
			if(gc_x > this.x && gc_x < this.x + this.length) 
            {
				let platform_distance = this.y - gc_y;
				if(platform_distance >= -2 && platform_distance < 6) 
                {
					return true;
				}
			}
			return false;
		}
	}
	return p;
}