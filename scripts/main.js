/*
  EXTENSION 1: ENEMIES
 
To be honest, I am not a talented gamer and die quickly -- no matter how difficult or easy the game tends to be. Therefore, it may have been better for me not to add this extension. Regardless of that, I also believe that games should pose a challenge, which is why I decided to add enemies after all. 

However, one of the challenging aspects of adding enemies is taking into consideration how they affect the game’s playability. I tried to make the game a bit more difficult, but do wonder if I made things a bit more annoying by adding two of the enemies on platforms in places where the player also has to jump over a cliff. Personally, I found the challenge interesting, but I am not sure how others would feel. 
 
Moreover, I found the programmatic aspects of implementing the enemies interesting since the code is more challenging than some of the other ones introduced in the course. It also is important to point out that factory patterns are quite common in video game code. That is why I think learning about these patterns as early as possible is beneficial for anyone interested in writing video games. 

The modifications I made were minor, with the challenge being more on where to place the enemies and determining what the range should be between the playable character and the enemy itself. I also tried to create a design that was cute, but still gloomy in some aspects. 
 
EXTENSION 2: PLATFORMS
 
Initially, I was sceptical of adding platforms and thought that they would be more useful as a sort of ‘resting point’ that offered the player a chance to escape enemies for a bit. However, while refactoring the game, I realised that it would be nice to place collectibles on top of the platform as well as placing enemies hither and thither in order to challenge the player. This is also why the player scores higher when gathering collectibles when on platform level. 

The actual changes I made to the code were minor; however, I did add a colour variable that allowed me to alternate between two different coloured platforms throughout the game. I also decided to add stars on the platforms, because I thought it made the game look a bit nicer. 

What I probably found most challenging was ensuring that the character actually walked on top of the platform when landing on it. I know it took me a couple of attempts to get that working correctly. 
 
OTHER NOTES 
 
Other minor additions that I made were that the game has a clearly defined ending and beginning in the form of two flagpoles placed at the beginning (when the player moves to the left) and the end (when the player moves to the right). My partner argued that this made no sense as it went against the philosophy of a platformer; however, I just felt it was nicer to have two flagpoles where you could end a level than have the player wander off into an eternal, never-ending abyss of cyan background once objects were no longer being drawn. As I am not skilled enough yet to dynamically generate objects, this one way to avoid the scenario outlined above. 

Other changes I made were not deleting the jumping sound because I liked it and -- more importantly -- breaking some of the code up sub sections that are shared between several scripts. This made it easier for me to refactor the code and also have less lines of code in a single file. Ultimately, the goal would be to use OO, but -- for now -- this change was sufficient enough for me to be to work in an efficient manner. 

*/
let lives;
let jump_sound;
let looping_sound;

function preload() {
    jump_sound = loadSound('assets/jump.wav');
    jump_sound.setVolume(0.1);
}

//start the game 
function setup() {
    lives = 3;
    start = startGame();
}

function draw() {
    background('lightcyan');
    noStroke();

    //'3D effect'
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
    for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    //Draw collectable items.
    for (var i = 0; i < collectibles.length; i++) {
        if (!collectibles[i].isFound) {
            drawCollectable(collectibles[i]);
            checkCollectable(collectibles[i]);
        }
    }
    
    //Draw stars on the platform
    for (var i = 0; i < stars.length; i++) {
        renderStar(stars[i].x_pos, stars[i].y_pos);
    }

    //Draw platforms
    for (var  i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    //Draw end flagpole which is located to the right
    renderEndFlagPole();

    //Check end flagpole
    if (!end_flagPole.isReached) {
        checkEndFlagPole();
    } else {
        fill(0, 0, 0);
        noStroke();

        textSize(14);
        textFont('Helvetica');
        return text("Level complete. Your game score is: " + game_score + ". " 
                    + "\n" + "Press space to continue.",
                    end_flagPole.x_pos - 250, floorPos_y - 350);
    }
    
    //Draw begin flagpole which is located towards the left
    renderBeginFlagPole();
    
    //Check that the begin flagpole has been reached
     if (!begin_flagPole.isReached) {
        checkBeginFlagPoleIsReached();
    } else {
        fill(0, 0, 0);
        noStroke();

        textSize(14);
        textFont('Helvetica');
        return text("Level complete. Your game score is: " + game_score + ". " 
                    + "\n" + " Press space to continue.",
                    begin_flagPole.x_pos + 100, floorPos_y - 350);
    }

    //Draw enemies
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

        if (isContact) {
            if (lives > 0) {
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
    for (var i = 0; i < lives; i++) {
        drawLiveTokens(100 + (i * 35));
    }

    //Draw game character.
    drawGameChar();

    //Check how many lives the character has left
    checkPlayerDie(lives);

    //Draw game over text
    if (lives == 0) {
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
function keyPressed() {
    //left arrow key sets isLeft to true;
    if (keyCode == 37) {
        isLeft = true;
    }

    //right arrowy key sets isRight to true
    if (keyCode == 39) {
        isRight = true;
    }

    //space key makes the character jump when ground level
    if (keyCode == 32 && (gameChar_y == floorPos_y) && lives != 0) {
        gameChar_y = gameChar_y - 100;
        jump_sound.play();
    }
    
    if (gameChar_y == 332) 
    {
        console.log("I am on the platform now."); 
        //gameChar_y = gameChar_y - 100;
    }
    
    /*
        continue playing the game if 
        level one has been reached 
    */
    if ((end_flagPole.isReached && keyCode == 32) || (begin_flagPole.isReached && keyCode == 32)) {
        setup();
    }

    /*
        replay game if lives = 0
    */
    if (lives == 0 && keyCode == 32) {
        setup();
    }
}

function keyReleased() {
    //left arrow key sets isLeft to false;
    if (keyCode == 37) {
        isLeft = false;
    }

    //right arrowy key sets isRight to false
    if (keyCode == 39) {
        isRight = false;
    }
}