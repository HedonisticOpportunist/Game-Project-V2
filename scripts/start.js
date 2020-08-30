// ---------------------------------
// Start game function
// ---------------------------------
/*
    game character positions
*/
var game_char_x;
var game_char_y;
var floor_pos_y;
var scroll_position;
/*
    game character directions
*/
var is_left;
var is_right;
var is_on_platform;

var is_falling;
var is_plummeting;
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
var tree_pos_y;
var canyons_width;
var game_score;

var end_flagPole;
var begin_flagPole;
var platform_level;
var player_on_platform;

/*
    enemies
*/
var enemies;

function startGame() {
	createCanvas(1024, 576);
	floor_pos_y = height * 3 / 4;
	game_char_x = width / 2;
	game_char_y = floor_pos_y;

	/*
	    Variable to store the real position of the gameChar in the game
	    world. Needed for collision detection.
	*/
	game_char_world_x = game_char_x - scroll_position;

	/*
	    Variable to control the background scrolling.
	*/
	scroll_position = 0;

	/*
	    Boolean variables to control the
	    movement of the game character
	*/
	is_left = false;
	is_right = false;
	is_on_platform = false;

	is_falling = false;
	is_plummeting = false;
	is_on_platform = false;

	/*
	    initialise params that
	    are used throughout the game
	*/
	canyons_width = 100;
	tree_pos_y = 200;
	game_score = 0;

	platform_level = floor_pos_y - 105;
	player_on_platform = 332;

	/*
	    enemies initialisation
	*/
	enemies = [];

	//enemies on platform level
	enemies.push(new Enemy(100, platform_level, 100));
    enemies.push(new Enemy(750, platform_level, 100));
	enemies.push(new Enemy(-560, platform_level, 85));
    
	enemies.push(new Enemy(1200, platform_level, 50));
    enemies.push(new Enemy(-1800, platform_level, 50));
    enemies.push(new Enemy(-850, platform_level, 85));


	//enemies on the ground 
	enemies.push(new Enemy(750, floor_pos_y - 10, 250));
	enemies.push(new Enemy(1600, floor_pos_y - 10, 300));
	enemies.push(new Enemy(-1200, floor_pos_y - 10, 250))

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
			y_pos: floor_pos_y
		},
		{
			x_pos: 100,
			y_pos: floor_pos_y
		},
		{
			x_pos: 600,
			y_pos: floor_pos_y
		},
		{
			x_pos: 850,
			y_pos: floor_pos_y
		},
		{
			x_pos: 1000,
			y_pos: floor_pos_y
		},
		{
			x_pos: -800,
			y_pos: floor_pos_y
		},
		{
			x_pos: 2500,
			y_pos: floor_pos_y
		},
		{
			x_pos: 2200,
			y_pos: floor_pos_y
		},
		{
			x_pos: 1400,
			y_pos: floor_pos_y
		},
		{
			x_pos: 2800,
			y_pos: floor_pos_y
		},
		{
			x_pos: 3900,
			y_pos: floor_pos_y
		},
		{
			x_pos: -1600,
			y_pos: floor_pos_y
		}

	];

	/*
	    trees array
	*/
	trees = [{
			tree_pos_x: 45
		},
		{
			tree_pos_x: -193
		},
		{
			tree_pos_x: 750
		},
		{
			tree_pos_x: 1747
		},
		{
			tree_pos_x: 2072
		},
		{
			tree_pos_x: -745
		},
		{
			tree_pos_x: 2800
		},
		{
			tree_pos_x: 3300
		},
		{
			tree_pos_x: -1800
		}
	];

	/*
	    canyons array
	*/
	canyons = [{
			x_pos: 550,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: 320,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: 1400,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: 1900,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: -550,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: 3500,
			y_pos: floor_pos_y,
			width: canyons_width
		},
		{
			x_pos: -1600,
			y_pos: floor_pos_y,
			width: canyons_width
		}
	];

	/*
	    collectibles array
	*/

	collectibles = [{
			x_pos: 450,
			y_pos: floor_pos_y,
			size: 5,
			is_found: false
		},
		{
			x_pos: 750,
			y_pos: floor_pos_y,
			size: 6,
			is_found: false
		},
		{
			x_pos: 90,
			y_pos: floor_pos_y,
			size: 3,
			is_found: false
		},
		{
			x_pos: 85,
			y_pos: floor_pos_y,
			size: 5,
			is_found: false
		},
		{
			x_pos: 45,
			y_pos: floor_pos_y,
			size: 3,
			is_found: false
		},
		{
			x_pos: 950,
			y_pos: floor_pos_y,
			size: 4,
			is_found: false
		},
		{
			x_pos: 1800,
			y_pos: floor_pos_y,
			size: 3,
			is_found: false
		},
		{
			x_pos: 1200,
			y_pos: floor_pos_y,
			size: 4,
			is_found: false
		},
		{
			x_pos: 2000,
			y_pos: floor_pos_y,
			size: 4,
			is_found: false
		},
		{
			x_pos: -650,
			y_pos: floor_pos_y,
			size: 3,
			is_found: false
		},
		{
			x_pos: 1900,
			y_pos: floor_pos_y,
			size: 2,
			is_found: false
		},
		{
			x_pos: -1200,
			y_pos: floor_pos_y,
			size: 2,
			is_found: false
		},
		{
			x_pos: -1500,
			y_pos: floor_pos_y,
			size: 2,
			is_found: false
		},
		{
			x_pos: -1700,
			y_pos: floor_pos_y,
			size: 2,
			is_found: false
		},
        {
			x_pos: 100,
			y_pos: platform_level,
			size: 5,
			is_found: false
		},
                    
		{
			x_pos: -750,
			y_pos: platform_level,
			size: 4,
			is_found: false
		},
		{
			x_pos: 750,
			y_pos: platform_level,
			size: 3,
			is_found: false
		},
		{
			x_pos: 1500,
			y_pos: platform_level,
			size: 5,
			is_found: false
		},
		{
			x_pos: 1200,
			y_pos: platform_level,
			size: 2,
			is_found: false
		},
        {
			x_pos: -850,
			y_pos: platform_level,
            size: 3,
            is_found: false
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
			x_pos: 1200,
			y_pos: platform_level
		},
		{
			x_pos: -850,
			y_pos: platform_level
		},
        {
			x_pos: -1800,
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
		is_reached: false
	};


	//flagpole at the 
	//end of the game (to the left)
	begin_flagPole = {

		x_pos: -2000,
		is_reached: false
	};

	/*
	    platforms
	*/

	let platform_y = floor_pos_y - 95;
	let platform_length = 150;

	platforms = [];

	//platforms alternate between two colours
	platforms.push(createPlatforms(100, platform_y, platform_length, 'paleturquoise'));
	platforms.push(createPlatforms(750, platform_y, platform_length, 'mediumturquoise'));
	platforms.push(createPlatforms(1200, platform_y, platform_length, 'paleturquoise'));

	platforms.push(createPlatforms(1500, platform_y, platform_length, 'mediumturquoise'));
	platforms.push(createPlatforms(-550, platform_y, platform_length, 'paleturquoise'));
	platforms.push(createPlatforms(-850, platform_y, platform_length, 'mediumturquoise'));
	platforms.push(createPlatforms(-1800, platform_y, platform_length, 'paleturquoise'));

}