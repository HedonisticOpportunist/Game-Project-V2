// ------------------------------
// Game character render function
// ------------------------------
// Function to draw the game character.
function drawGameChar() {
	//the game character
	if (is_left && is_falling) {
		//Jumping to the left

		//head 
		strokeWeight(2);
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(game_char_x - 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x - 3, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 25, game_char_y - 5);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 25, game_char_y - 5);
		endShape();

		//hands 
		beginShape(LINES);
		vertex(game_char_x - 25, game_char_y - 60);
		vertex(game_char_x - 12, game_char_y - 50);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 25, game_char_y - 50);
		vertex(game_char_x + 12, game_char_y - 40);
		endShape();
	} else if (is_right && is_falling) {
		//head 
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(game_char_x + 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x + 3, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 25, game_char_y - 5);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 25, game_char_y - 5);
		endShape();

		//hands 
		beginShape(LINES);
		vertex(game_char_x - 25, game_char_y - 50);
		vertex(game_char_x - 12, game_char_y - 40);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 25, game_char_y - 60);
		vertex(game_char_x + 12, game_char_y - 50);
		endShape();
	} else if (is_left) {
		//Walking, turned left

		//head 
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(game_char_x - 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x - 3, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 25, game_char_y);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 12, game_char_y);
		endShape();

		//hands 
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 45);
		vertex(game_char_x - 25, game_char_y - 35);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 45);
		vertex(game_char_x + 12, game_char_y - 35);
		endShape();

	} else if (is_right) {
		//Walking, turned right

		//head 
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(game_char_x + 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x + 3, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 12, game_char_y);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 25, game_char_y);
		endShape();

		//hands 
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 45);
		vertex(game_char_x - 12, game_char_y - 35);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 45);
		vertex(game_char_x + 25, game_char_y - 35);
		endShape();

	} else if (is_falling || is_plummeting) {
		//Jumping facing forwards

		//head 
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);

		point(game_char_x - 3, game_char_y - 65);
		point(game_char_x + 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 25, game_char_y - 5);
		endShape();
		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 25, game_char_y - 5);
		endShape();

		//hands 
		beginShape(LINES);
		vertex(game_char_x - 25, game_char_y - 60);
		vertex(game_char_x - 12, game_char_y - 50);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 25, game_char_y - 60);
		vertex(game_char_x + 12, game_char_y - 50);
		endShape();

	} else {
		//Standing, facing frontwards

		//head 
		fill('powderblue');
		ellipse(game_char_x, game_char_y - 62, 25, 25);

		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);

		point(game_char_x - 3, game_char_y - 65);
		point(game_char_x + 3, game_char_y - 65);

		stroke(0, 0, 255);
		strokeWeight(5);
		point(game_char_x, game_char_y - 55);

		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(game_char_x - 12, game_char_y - 47, 25, 30);

		//legs
		beginShape(LINES);
		vertex(game_char_x - 12, game_char_y - 20);
		vertex(game_char_x - 12, game_char_y);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 20);
		vertex(game_char_x + 12, game_char_y);
		endShape();

		//hands 
		beginShape(LINES);

		vertex(game_char_x - 12, game_char_y - 45);
		vertex(game_char_x - 25, game_char_y - 35);
		endShape();

		beginShape(LINES);
		vertex(game_char_x + 12, game_char_y - 45);
		vertex(game_char_x + 25, game_char_y - 35);
		endShape();
	}
}