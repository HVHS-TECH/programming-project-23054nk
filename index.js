/*******************************************************/
// programming project: script.js
/// Written by Nityaa
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

function preload() {
//image of dinosaur
dinoOneImage = loadImage('assets/images/dino.png');
personOneFrontImg = loadImage('assets/images/person1front.png');
personOneSideImg = loadImage('assets/images/person1side.png');
}


function setup() {
	console.log("setup:");
	cnv = new Canvas(windowWidth -10,windowHeight -10);
	world.gravity.y = 10;
	ground = new Sprite(width/2, height - 50, width, 200, 'static') // 'static' ground does not move due to gravity
	ground.color = '#839b5d';


	// creating dinoOne sprite and attaching image
	dinoOneSprite = new Sprite(200,500,200,100); 
	dinoOneSprite.scale = 0.2;
	dinoOneSprite.img = dinoOneImage; 
	
	
	// creating personOneSprite sprite and attaching image
	personOneSprite = new Sprite(500,300,200,100);
	personOneSprite.img = personOneFrontImg; 
	personOneSprite.scale = 0.2;

	playerHasMoved = false;

}


/*******************************************************/
function draw() {
	background('#c8f2ff');

	// if right arrow button pushed, move player right & switch sprite's image to the side view
	if (kb.pressing('right')) {
		personOneSprite.x+=5;
		personOneSprite.img = personOneSideImg;

		playerHasMoved = true; // personOneSprite has started moving
	}

	// if right arrow button isn't being pushed switch back to front view
	else {
		personOneSprite.img = personOneFrontImg;
	}

	// Dinosaur only moves after the player (personOneSprite) starts moving
	if (playerHasMoved) {
		dinoOneSprite.vel.x = 5;
	}
	

	// game ends when the dinosaur touches the player
	if (dinoOneSprite.colliding(personOneSprite)) {
		noLoop() //to stop the game 
		textSize (60);
		fill = ('red');
		text ('game over', width/2-150, height/2);

	}
}

/*******************************************************/
//dinoOneSprite.collides(player, gameEnd)