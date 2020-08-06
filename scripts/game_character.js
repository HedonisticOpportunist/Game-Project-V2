// ------------------------------
// Game character render function
// ------------------------------
// Function to draw the game character.
function drawGameChar() 
{
	//the game character
	if(isLeft && isFalling) 
    {
		//Jumping to the left
        
		//head 
		strokeWeight(2);
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(gameChar_x - 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x - 3, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 25, gameChar_y - 5);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 25, gameChar_y - 5);
		endShape();
        
		//hands 
		beginShape(LINES);
		vertex(gameChar_x - 25, gameChar_y - 60);
		vertex(gameChar_x - 12, gameChar_y - 50);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 25, gameChar_y - 50);
		vertex(gameChar_x + 12, gameChar_y - 40);
		endShape();
	} 
    else if(isRight && isFalling) 
    {
		//head 
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(gameChar_x + 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x + 3, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 25, gameChar_y - 5);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 25, gameChar_y - 5);
		endShape();
        
		//hands 
		beginShape(LINES);
		vertex(gameChar_x - 25, gameChar_y - 50);
		vertex(gameChar_x - 12, gameChar_y - 40);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 25, gameChar_y - 60);
		vertex(gameChar_x + 12, gameChar_y - 50);
		endShape();
	} 
    else if(isLeft) 
    {
		//Walking, turned left
        
		//head 
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(gameChar_x - 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x - 3, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 25, gameChar_y);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 12, gameChar_y);
		endShape();
        
		//hands 
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 45);
		vertex(gameChar_x - 25, gameChar_y - 35);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 45);
		vertex(gameChar_x + 12, gameChar_y - 35);
		endShape();
	} 
    else if(isRight) 
    {
		//Walking, turned right
        
		//head 
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
		point(gameChar_x + 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x + 3, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 12, gameChar_y);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 25, gameChar_y);
		endShape();
        
		//hands 
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 45);
		vertex(gameChar_x - 12, gameChar_y - 35);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 45);
		vertex(gameChar_x + 25, gameChar_y - 35);
		endShape();
	} 
    else if(isFalling || isPlummeting) 
    {
		//Jumping facing forwards
        
		//head 
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
        
		point(gameChar_x - 3, gameChar_y - 65);
		point(gameChar_x + 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 25, gameChar_y - 5);
		endShape();
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 25, gameChar_y - 5);
		endShape();
        
		//hands 
		beginShape(LINES);
		vertex(gameChar_x - 25, gameChar_y - 60);
		vertex(gameChar_x - 12, gameChar_y - 50);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 25, gameChar_y - 60);
		vertex(gameChar_x + 12, gameChar_y - 50);
		endShape();
        
	} 
    else 
    {
		//Standing, facing frontwards
        
		//head 
		fill('powderblue');
		ellipse(gameChar_x, gameChar_y - 62, 25, 25);
        
		//eyes
		stroke(0, 204, 204);
		strokeWeight(5);
        
		point(gameChar_x - 3, gameChar_y - 65);
		point(gameChar_x + 3, gameChar_y - 65);
        
		stroke(0, 0, 255);
		strokeWeight(5);
		point(gameChar_x, gameChar_y - 55);
        
		//body 
		strokeWeight(4);
		fill('skyblue');
		rect(gameChar_x - 12, gameChar_y - 47, 25, 30);
        
		//legs
		beginShape(LINES);
		vertex(gameChar_x - 12, gameChar_y - 20);
		vertex(gameChar_x - 12, gameChar_y);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 20);
		vertex(gameChar_x + 12, gameChar_y);
		endShape();
        
		//hands 
		beginShape(LINES);
        
		vertex(gameChar_x - 12, gameChar_y - 45);
		vertex(gameChar_x - 25, gameChar_y - 35);
		endShape();
        
		beginShape(LINES);
		vertex(gameChar_x + 12, gameChar_y - 45);
		vertex(gameChar_x + 25, gameChar_y - 35);
		endShape();
	}
}