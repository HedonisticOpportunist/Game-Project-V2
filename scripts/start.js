// ---------------------------------
// Start game function
// ---------------------------------
/*
    game character positions
*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
/*
    game character directions
*/
var isLeft;
var isRight;
/*
    game objects
*/
var clouds;
var mountains;
var trees;
var canyons;

var collectibles;
var stars;
/*
    variables used throughout
    the game consistently
*/
var treePos_y;
var canyons_width;
var game_score;
var isLooping;

var end_flagPole;
var begin_flagPole;
var platform_level;
/*
    enemies
*/
var enemies;

function startGame() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Variable to control the background scrolling.
    scrollPos = 0;

    /*
        Variable to store the real position of the gameChar in the game
        world. Needed for collision detection.
    */
    gameChar_world_x = gameChar_x - scrollPos;

    /*
        Variable to control the background scrolling.
    */
    scrollPos = 0;

    /*
        Boolean variables to control the
        movement of the game character
    */
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    /*
	    initialise params that
	    are used throughout the game
	*/
    canyons_width = 100;
    treePos_y = 200;
    game_score = 0;
    isLooping = false;
    
    platform_level = floorPos_y - 105;

    /*
        enemies initialisation
    */
    enemies = [];
    
    //enemies on platform level
    enemies.push(new Enemy(100, platform_level, 100));
    enemies.push(new Enemy(-560, platform_level, 85));
    enemies.push(new Enemy(1600, platform_level, 85));
    
    
    //enemies on the ground 
    enemies.push(new Enemy(750, floorPos_y - 10, 250));
    enemies.push(new Enemy(1600, floorPos_y - 10, 300));
    enemies.push(new Enemy(-1200, floorPos_y - 10, 250))

    /*
        clouds array
    */
    clouds = [{
            x_pos: 250,
            y_pos: 150,
            width: 80,
            height: 50
        },
        {
            x_pos: 300,
            y_pos: 150,
            width: 100,
            height: 75
        },
        {
            x_pos: 350,
            y_pos: 150,
            width: 100,
            height: 75
        },
        {
            x_pos: 400,
            y_pos: 150,
            width: 100,
            height: 50
        },
        {
            x_pos: 700,
            y_pos: 50,
            width: 80,
            height: 50
        },
        {
            x_pos: 800,
            y_pos: 50,
            width: 100,
            height: 75
        },
        {
            x_pos: 850,
            y_pos: 50,
            width: 100,
            height: 75
        },
        {
            x_pos: 900,
            y_pos: 50,
            width: 100,
            height: 50
        },
        {
            x_pos: -500,
            y_pos: 150,
            width: 80,
            height: 50
        },
        {
            x_pos: -450,
            y_pos: 150,
            width: 100,
            height: 75
        },
        {
            x_pos: 250,
            y_pos: 150,
            width: 80,
            height: 50
        },
        {
            x_pos: 1500,
            y_pos: 50,
            width: 100,
            height: 50
        },
        {
            x_pos: 1550,
            y_pos: 50,
            width: 100,
            height: 75
        },
        {
            x_pos: 1600,
            y_pos: 50,
            width: 100,
            height: 50
        },
        {
            x_pos: 2200,
            y_pos: 50,
            width: 100,
            height: 50
        },
        {
            x_pos: 2250,
            y_pos: 50,
            width: 100,
            height: 75
        },
        {
            x_pos: 2300,
            y_pos: 50,
            width: 100,
            height: 50
        },
        {
            x_pos: 3600,
            y_pos: 150,
            width: 100,
            height: 80
        },
        {
            x_pos: 3650,
            y_pos: 150,
            width: 120,
            height: 100
        },
        {
            x_pos: 3700,
            y_pos: 150,
            width: 100,
            height: 80
        }
    ];

    /*
        mountains array
    */
    mountains = [{
            x_pos: 500,
            y_pos: floorPos_y
        },
        {
            x_pos: 100,
            y_pos: floorPos_y
        },
        {
            x_pos: 600,
            y_pos: floorPos_y
        },
        {
            x_pos: 850,
            y_pos: floorPos_y
        },
        {
            x_pos: 1000,
            y_pos: floorPos_y
        },
        {
            x_pos: -800,
            y_pos: floorPos_y
        },
        {
            x_pos: 2500,
            y_pos: floorPos_y
        },
        {
            x_pos: 2200,
            y_pos: floorPos_y
        },
        {
            x_pos: 1400,
            y_pos: floorPos_y
        },
        {
            x_pos: 2800,
            y_pos: floorPos_y
        },
        {
            x_pos: 3900,
            y_pos: floorPos_y
        },
        {
            x_pos: -1600,
            y_pos: floorPos_y
        }        
                 
    ];

    /*
        trees array
    */
    trees = [{
            treePos_x: 45
        },
        {
            treePos_x: -193
        },
        {
            treePos_x: 750
        },
        {
            treePos_x: 1747
        },
        {
            treePos_x: 2072
        },
        {
            treePos_x: -745
        },
        {
            treePos_x: 2800
        },
        {
            treePos_x: 3300
        },
        {
            treePos_x: -1800
        }
    ];

    /*
        canyons array
    */
    canyons = [{
            x_pos: 550,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: 320,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: 1400,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: 1900,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: -550,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: 3500,
            y_pos: floorPos_y,
            width: canyons_width
        },
        {
            x_pos: -1600,
            y_pos: floorPos_y,
            width: canyons_width
        }
    ];

    /*
        collectibles array
    */
    
    collectibles = [{
            x_pos: 450,
            y_pos: floorPos_y,
            size: 5,
            isFound: false
        },
        {
            x_pos: 750,
            y_pos: floorPos_y,
            size: 6,
            isFound: false
        },          
        {
            x_pos: 90,
            y_pos: floorPos_y,
            size: 3,
            isFound: false
        },
        {
            x_pos: 85,
            y_pos: floorPos_y,
            size: 5,
            isFound: false
        },
        {
            x_pos: 45,
            y_pos: floorPos_y,
            size: 3,
            isFound: false
        },            
        {
            x_pos: 950,
            y_pos: floorPos_y,
            size: 4,
            isFound: false
        },
        {
            x_pos: 1800,
            y_pos: floorPos_y,
            size: 3,
            isFound: false
        },
        {
            x_pos: 1200,
            y_pos: floorPos_y,
            size: 4,
            isFound: false
        },
        {
            x_pos: 2000,
            y_pos: floorPos_y,
            size: 4,
            isFound: false
        },
        {
            x_pos: -650,
            y_pos: floorPos_y,
            size: 3,
            isFound: false
        },
        {
            x_pos: 1900,
            y_pos: floorPos_y,
            size: 2,
            isFound: false
        },
        {
            x_pos: -1200,
            y_pos: floorPos_y,
            size: 2,
            isFound: false
        },
        {
            x_pos: -1500,
            y_pos: floorPos_y,
            size: 2,
            isFound: false
        },
        {
            x_pos: -1700,
            y_pos: floorPos_y,
            size: 2,
            isFound: false
        },
        {
            x_pos: -750,
            y_pos: platform_level,
            size: 5,
            isFound: false
        },
        {
            x_pos: 750,
            y_pos: platform_level,
            size: 5,
            isFound: false
        },
        {
            x_pos: 1500,
            y_pos: platform_level,
            size: 5,
            isFound: false
        },  
        {
            x_pos: 1050,
            y_pos: platform_level,
            size: 5,
            isFound: false
        }
    ];
    
    /*
       stars
    */
    stars = [{
            x_pos: -550,
            y_pos: platform_level  
        },
        {
            x_pos: 100,
            y_pos: platform_level
        },
        {
            x_pos: 1600,
            y_pos: platform_level
        },
        {
            x_pos: 1050,
            y_pos: platform_level
        },
        {
            x_pos: -850,
            y_pos: platform_level
        }
    ];
    
    /*
        flagpoles
    */
    
    //flagpole at the 
    //end of the game (to the right)
    end_flagPole = {
        x_pos: 2100,
        isReached: false
    };
    
    
    //flagpole at the 
    //end of the game (to the left)
    begin_flagPole = {
        
        x_pos: - 2000,
        isReached: false
    };  

    /*
        platforms
    */

    let platform_y = floorPos_y - 95;
    let platform_length = 150;

    platforms = [];

    //platforms alternate between two colours
    platforms.push(createPlatforms(100, platform_y, platform_length, 'paleturquoise'));
    platforms.push(createPlatforms(750, platform_y, platform_length, 'mediumturquoise'));
    platforms.push(createPlatforms(1050, platform_y, platform_length, 'paleturquoise'));

    platforms.push(createPlatforms(1500, platform_y, platform_length, 'mediumturquoise'));
    platforms.push(createPlatforms(-550, platform_y, platform_length, 'paleturquoise'));
    platforms.push(createPlatforms(-850, platform_y, platform_length, 'mediumturquoise'));
    platforms.push(createPlatforms(-1200, platform_y, platform_length, 'paleturquoise'));
      
}