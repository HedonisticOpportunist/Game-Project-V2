// ---------------------------------
// Enemies constructor function
// ---------------------------------
function Enemy(x, y, range) {
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 1;
	this.update = function() {
		this.currentX += this.inc;
		if(this.currentX >= this.x + range) {
			this.inc -= 1;
		} else if(this.currentX < this.x) {
			this.inc = 1;
		}
	}
	this.draw = function() {
		this.update();
		//body of the enemy 
		fill('black');
		ellipse(this.currentX, this.y, 50, 50);
		//eyes
		stroke('firebrick');
		strokeWeight(10);
		point(this.currentX - 8, this.y);
		point(this.currentX + 8, this.y);
		noStroke();
	}
	this.checkContact = function(gc_x, gc_y) {
		let enemy_distance = dist(gc_x, gc_y, this.currentX, this.y);
		if(enemy_distance < 20) {
			return true;
		}
		return false;
	}
}