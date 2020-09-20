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
    if (this.currentX >= this.x + range) {
      this.inc -= 1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  }
  this.draw = function() {
    this.update();
    //if enemy is on the ground
    if (this.y == floor_pos_y - 10) {
      //body of the enemy
      fill("#2d132c");
      ellipse(this.currentX, this.y, 50, 50);
      //eyes
      stroke("#801336");
      strokeWeight(10);
      point(this.currentX - 8, this.y);
      point(this.currentX + 8, this.y);
      noStroke();
    }
    //enemy is on platform level
    else {
      //body of the enemy
      fill("#fcf5ee");
      ellipse(this.currentX, this.y, 50, 50);
      //eyes
      stroke("#ffc4d0");
      strokeWeight(10);
      point(this.currentX - 8, this.y);
      point(this.currentX + 8, this.y);
      noStroke();
      //wings
      fill("#fbe8e7");
      ellipse(this.currentX + 35, this.y, 30, 30);
      ellipse(this.currentX - 35, this.y, 30, 30);

    }
  }
  this.checkContact = function(gc_x, gc_y) {
    //depending on where the enemy is located, the
    //distance range is different
    let enemy_distance = dist(gc_x, gc_y, this.currentX, this.y);
    if (this.y == floor_pos_y - 10) {
      if (enemy_distance < 15) {
        return true;
      }
    } else {

      if (enemy_distance < 20) {
        return true;
      }
    }


    return false;
  }
}
