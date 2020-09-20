/*
EXTENSION 1: ENEMIES

I believe that games should be entertaining, which was one of the leading mottos for me while designing this extension. 

I added enemies on top of the platforms and on the ground in order to challenge the player. This is also why the player scores higher when gathering collectibles when on platform level. Moreover, I changed the design of the enemies depending on where they were located in order to differentiate them from each other. I also made the distance range different if the enemy was on a platform. 

In terms of design, I tried to make the enemies somewhat cute but still threatening. This was a bit challenging as I am still relatively new to using pj5 in terms of designing non-static objects. 

The ultimate challenge of coding a video game is getting people interested in playing it. Hence, playability is one of the most challenging aspects. In this vein, I do wonder if I went overboard and affected the entertainment value of the game in pursuit of making the game more challenging. 

EXTENSION 2: PLATFORMS

It was important for me to combine the two extensions, hence the enemies and platforms go together, so that the platforms are integrated into the game and not just stylistic enhancements. 

In terms of code changes, I added an argument entitled ‘colour’ that allowed me to alternate between two different coloured platforms; this variable was also used to alternate platforms that shook a bit and ones that remained static. Additionally, I also decided to add stars on some of the platforms, because I thought it made the game look a bit nicer. All in all these changes are mostly stylistic, so that this game has its own unique flair. 

What I probably found most challenging was ensuring that the character actually walked on top of the platform when landing on it. I know it took me a couple of attempts to get that working correctly; it was also challenging to keep track of all the platform-situated enemies and collectibles.

OTHER NOTES

Other additions that I made to the game were that it has a defined ending and beginning in the form of two flagpoles placed at the beginning (when the player moves to the left) and the end (when the player moves to the right). 

My partner argued that this made no sense as it went against the philosophy of a platformer; however, I felt it was nicer to have two flagpoles where you could end a level than have the player wander off into an eternal, never-ending abyss of a cyan background once objects were no longer being drawn. As I am not skilled enough yet to dynamically generate objects, this was one way to avoid the scenario outlined above.

Other changes I made were not deleting the jumping sound because I liked it and -- more importantly -- breaking some of the code into sub sections that are shared between several scripts. This made it easier for me to refactor the code. Ultimately, the goal would be to use OO, but I will revisit this at a later point. 

Otherwise, I have consistently been refactoring the design of the game and also added a looping sound that is reminiscent of 80s arcade games. Ultimately, the long term goal is to refactor this game completely once I am more confident in my programming abilities.

*/

let lives;
let jump_sound;
let game_sound;
let font;

function preload() {
    jump_sound = loadSound('assets/jump.wav');
    game_sound = loadSound('assets/80sRetro_1.wav');

    font = loadFont('assets/MontserratAlternates-Black.otf');
    jump_sound.setVolume(0.1);
}

//start the game
function setup() {
    lives = 3;
    game_sound.loop();
    start = startGame();
}

function draw() {
    background("#d3f4ff");
    noStroke();

    //'3D effect'
    fill("#01a9b4");
    rect(0, floor_pos_y, width, height - floor_pos_y);
    fill("#086972")
    rect(0, floor_pos_y, width, height / 20);
    push();
    translate(scroll_position, 0);

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
        if (!collectibles[i].is_found) {
            drawCollectable(collectibles[i]);
            checkCollectable(collectibles[i]);
        }
    }

    //Draw stars on the platform
    for (var i = 0; i < stars.length; i++) {
        renderStar(stars[i].x_pos, stars[i].y_pos);
    }

    //Draw platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    //Draw end flagpole which is located to the right
    renderEndFlagPole(game_sound);

    //Check end flagpole
    if (!end_flagPole.is_reached) {
        checkEndFlagPole();
    } else {
        fill(0, 0, 0);
        noStroke();

        textSize(12);
        textFont(font);
        return text("Level complete. Your game score is: " + game_score + ". " +
            "\n" + "Press space to continue.",
            end_flagPole.x_pos - 250, floor_pos_y - 350);
    }

    //Draw begin flagpole which is located towards the left
    renderBeginFlagPole(game_sound);

    //Check that the begin flagpole has been reached
    if (!begin_flagPole.is_reached) {
        beginFlagPoleReached();
    } else {
        fill(0, 0, 0);
        noStroke();

        textSize(12);
        textFont(font);
        return text("Level complete. Your game score is: " + game_score + ". " +
            "\n" + " Press space to continue.",
            begin_flagPole.x_pos + 330, floor_pos_y - 350);
    }

    //Draw enemies
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        var is_contact = enemies[i].checkContact(game_char_world_x, game_char_y);

        if (is_contact) {
            if (lives > 0) {
                lives -= 1;
                game_sound.stop();
                startGame();
                game_sound.play();
                break;
            }
        }
    }
    pop();

    //Draw game score token
    fill(0, 0, 0);
    noStroke();

    textSize(10);
    textFont(font);
    text("Score: " + game_score, 20, 20);

    //Draw live tokens
    for (var i = 0; i < lives; i++) {
        drawLiveTokens(100 + (i * 35));
    }

    //Draw game character.
    drawGameChar();

    //Check how many lives the character has left
    checkPlayerDie(game_sound);

    //Draw game over text
    if (lives == 0) {
        game_sound.stop();
        fill(0, 0, 0);
        noStroke();

        textSize(12);
        textFont(font);
        return text("Game over. Press space to continue.", game_char_x, floor_pos_y - 250);
    }

    //Game interaction logic
    moveLeft();
    moveRight();
    fall();

    //Update real position of gameChar for collision detection.
    game_char_world_x = game_char_x - scroll_position;

}
// ---------------------
// Key control functions
// ---------------------
function keyPressed() {
    //left arrow key sets is_left to true;
    if (keyCode == 37) {
        is_left = true;
    }

    //right arrowy key sets is_right to true
    if (keyCode == 39) {
        is_right = true;
    }

    //space key makes the character jump when on platform or on the ground
    if (keyCode == 32 && (game_char_y == floor_pos_y || game_char_y == player_on_platform) && lives != 0) {
        game_char_y = game_char_y - 100;
        jump_sound.play();
    }


    /*
        continue playing the game if
        level one has been reached
    */
    if ((end_flagPole.is_reached && keyCode == 32) || (begin_flagPole.is_reached && keyCode == 32)) {
        setup();
    }

    /*
        replay game if lives equals 0
    */
    if (lives == 0 && keyCode == 32) {
        setup();
    }
}

function keyReleased() {
    //left arrow key sets is_left to false;
    if (keyCode == 37) {
        is_left = false;
    }

    //right arrow key sets is_right to false
    if (keyCode == 39) {
        is_right = false;
    }
}
