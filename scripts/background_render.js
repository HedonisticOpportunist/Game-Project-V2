// ---------------------------
// Background render functions
// ---------------------------
//Function to draw cloud objects.
function drawClouds() {
	// Draw clouds.
	for (var i = 0; i < clouds.length; i++) {
		fill('ghostwhite');
		noStroke();

		ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].width, clouds[i].height);
	}
}

//Function to draw mountains objects.
function drawMountains() {
	for (var i = 0; i < mountains.length; i++) {
		noStroke();
		fill('whitesmoke');

		triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 150, mountains[i].y_pos - 415, mountains[i].x_pos + 350, mountains[i].y_pos);
	}
}

//Function to draw trees objects.
function drawTrees() {
	for (var i = 0; i < trees.length; i++) {
		fill('palegoldenrod');
		rect(trees[i].tree_pos_x, tree_pos_y, 50, 235);

		fill('palegreen');
		ellipse(trees[i].tree_pos_x + 20, tree_pos_y, tree_pos_y, tree_pos_y - 50);
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------
//Function to draw canyon objects.

function drawCanyon(t_canyon) {
	fill('cornsilk');
	rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.width + 100);
}
//Function to check character whether a character is over a canyon.
function checkCanyon(t_canyon) {
	let distance;
	distance = int(dist(t_canyon.x_pos, t_canyon.y_pos, game_char_world_x, game_char_y));

	if (game_char_world_x > t_canyon.x_pos && game_char_world_x < t_canyon.x_pos + t_canyon.width && game_char_y >= floor_pos_y) {
		is_plummeting = true;
	}

	if (is_plummeting) {
		game_char_y += 1;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------
// Function to draw collectable objects.

function drawCollectable(t_collectable) {

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
function checkCollectable(t_collectable) {
	//declaration of range variable used
	//within this function only 
	let range;

	range = int(dist(t_collectable.x_pos, t_collectable.y_pos, game_char_world_x, game_char_y));

	//if the collectible is within range and equals the y coordinate of the ground
	//then the collectible has been found 
	if (range < 48 && range > 10) {
		t_collectable.is_found = true;

		if (t_collectable.is_found && t_collectable.y_pos == floor_pos_y) {
			game_score += 1;
		}


		if (t_collectable.is_found && t_collectable.y_pos == platform_level) {
			game_score += 2;
		}

	}
}

// ---------------------------------
// End Flagpole render and check functions
// ---------------------------------
function renderEndFlagPole() {
	push();
	strokeWeight(5);
	stroke(0, 0, 0);

	line(end_flagPole.x_pos, floor_pos_y, end_flagPole.x_pos, floor_pos_y - 250);
	fill('turquoise');
	noStroke();

	if (end_flagPole.is_reached) {
		rect(end_flagPole.x_pos, floor_pos_y - 250, 50, 50);
	} else {
		rect(end_flagPole.x_pos, floor_pos_y - 50, 50, 50);
	}

	pop();
}

//check that the player reached the flagpole
function checkEndFlagPole() {
	let distance;
	distance = abs(game_char_world_x - end_flagPole.x_pos);

	if (distance < 5) {
		end_flagPole.is_reached = true;
	}
}

// ---------------------------------
// Begin flagpole and check functions
// ---------------------------------
function renderBeginFlagPole() {
	push();
	strokeWeight(5);
	stroke(0, 0, 0);

	line(begin_flagPole.x_pos, floor_pos_y, begin_flagPole.x_pos, floor_pos_y - 250);
	fill('darkturquoise');
	noStroke();

	if (begin_flagPole.is_reached) {
		rect(begin_flagPole.x_pos, floor_pos_y - 250, 50, 50);
	} else {
		rect(begin_flagPole.x_pos, floor_pos_y - 50, 50, 50);
	}

	pop();
}

//check that the flagpole has been reached
function checkBeginFlagPoleis_reached() {
	let distance;
	distance = abs(game_char_world_x - begin_flagPole.x_pos);

	if (distance < 5) {
		begin_flagPole.is_reached = true;
	}
}

// ---------------------------------
// Platform render function
// ---------------------------------
function createPlatforms(x, y, length, colour) {
	var platform = {
		x: x,
		y: y,
		length: length,
		colour: colour,
		draw: function () {
			fill(this.colour);

			//let the platforms shake a little if the 
			//colour is medium turqouise 
			if (colour == "mediumturquoise") {
				this.x = this.x + random(-0.5, 0.5);
			}

			rect(this.x, this.y, this.length, 50);
		},

		checkContact: function (gc_x, gc_y) {
			if (gc_x > this.x && gc_x < this.x + this.length) {
				let platform_distance = this.y - gc_y;
				if (platform_distance >= -2 && platform_distance < 6) {
					return true;
				}
			}
			return false;
		}
	}
	return platform;
}

// ---------------------------------
// Star render function 
// (code taken / modified from pj5 examples)
// ---------------------------------
function renderStar(x, y) {
	let angle = TWO_PI / 5;
	let half_angle = angle / 2.0;

	noStroke();
	fill('lightyellow');

	beginShape();
	for (var i = 0; i < TWO_PI; i += angle) {

		let star_x = x + cos(i) * 70;
		let star_y = y + sin(i) * 70;

		vertex(star_x, star_y);
		star_x = x + cos(i + half_angle) * 30;
		star_y = y + sin(i + half_angle) * 30;

		vertex(star_x, star_y);
	}
	endShape(CLOSE);
}