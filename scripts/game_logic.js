// ----------------------------------
// Game logic 
// ----------------------------------
function moveLeft() {
    // Logic to make the game character move on the background scroll.
    if (is_left) {
        if (game_char_x > width * 0.2) {
            game_char_x -= 5;
        } else {
            scroll_position += 5;
        }
    }
}

function moveRight() {
    if (is_right) {
        if (game_char_x < width * 0.8) {
            game_char_x += 5;
        } else {
            scroll_position -= 5; // negative for moving against the background
        }
    }
}

function fall() {

    /* 
        Logic to make the game character rise and fall.
        If the game character is above ground make it fall.
    */
    let is_contact = false;

    if (game_char_y < floor_pos_y) {
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(game_char_world_x, game_char_y)) {
                is_contact = true;
                break;
            }
        }

        if (game_char_y == player_on_platform && is_contact) {
            is_falling = false;
        }

        if (!is_contact) {
            is_falling = true;
            game_char_y += 2;
        }
    } else {
        is_falling = false;
    }
}

// ---------------------------------
// Lives function
// ---------------------------------
function checkPlayerDie(sound) {
    /* 
        if character is plummeting 
        then make lives smaller by one
    */
    if (is_plummeting && lives != 0 && game_char_y > height) {
        lives -= 1;
        sound.stop();
        startGame();
        sound.play();
    }
}

function drawLiveTokens(index) {
    //draw live tokens
    fill("#c4c1e0");
    stroke("#7c73e6");
    ellipse(index, 20, 25, 25);
    //eyes
    fill("#ffe9e3");
    point(index - 5, 20);
    point(index + 5, 20);
    noStroke();
}
