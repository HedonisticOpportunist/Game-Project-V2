// ----------------------------------
// Game logic 
// ----------------------------------
function moveLeft() {
    // Logic to make the game character move or the background scroll.
    if (isLeft) {
        if (gameChar_x > width * 0.2) {
            gameChar_x -= 5;
        } else {
            scrollPos += 5;
        }
    }
}

function moveRight() {
    if (isRight) {
        if (gameChar_x < width * 0.8) {
            gameChar_x += 5;
        } else {
            scrollPos -= 5; // negative for moving against the background
        }
    }
}

function fall() {

    /* 
        Logic to make the game character rise and fall.
        if game character is above ground make it fall
    */
    var isContact = false;

    if (gameChar_y < floorPos_y) {
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameChar_world_x, gameChar_y)) {
                isContact = true;
                break;
            }
        }

        if (!isContact) {
            isFalling = true;
            gameChar_y += 2;
        }
    } else {
        isFalling = false;
    }
}

// ---------------------------------
// Lives function
// ---------------------------------
function checkPlayerDie() {
    /* 
        if character is plummeting 
        then make lives smaller by one
    */
    if (isPlummeting && lives != 0) {
        lives -= 1;
        startGame();
    }
}

function drawLiveTokens(index) {
    //draw live tokens
    fill('cadetblue');
    stroke('black');
    ellipse(index, 20, 25, 25);
    noStroke();
}