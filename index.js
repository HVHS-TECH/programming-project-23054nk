/*******************************************************/
// programming project: index.js
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
mudPatchImg = loadImage('assets/images/mudPatch.png');
electricFenceImg = loadImage('assets/images/electricFence.png');
rockImg = loadImage('assets/images/rock.png');
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
    personOneSprite = new Sprite(600,600,200,100);
    personOneSprite.img = personOneFrontImg;
    personOneSprite.scale = 0.2;

	playerHasMoved = false;

    obstacleGroup = new Group();

    //creating the mudPatchSprite and attaching image
    mudPatchSprite = new Sprite(800, height - 150, 100, 100);
    mudPatchSprite.img = mudPatchImg;
    mudPatchSprite.scale = 0.4;
    mudPatchSprite.collider = 'none'; // so sprite doesn't collide with ground
    obstacleGroup.add(mudPatchSprite);

    //creating electricFenceSprite and attaching image
    electricFenceSprite = new Sprite(1100, height - 150, 200, 100);
    electricFenceSprite.img = electricFenceImg;
    electricFenceSprite.scale = 0.3;
    electricFenceSprite.collider = 'none';
    obstacleGroup.add(electricFenceSprite);
  

    //creating rockSprite and attaching image
    rockSprite = new Sprite(1500, height - 150, 200, 100);
    rockSprite.img = rockImg;
    rockSprite.scale = 0.3; 
    rockSprite.collider = 'none';
    obstacleGroup.add(rockSprite); 
    

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


    // when up arrow is pressed and player is on the ground
    // (player only jumps when on the ground otherwise if the player presses the up arrow repeatedly then the sprite could jump too high)
    if (kb.pressing('up') && personOneSprite.colliding(ground)) {
        personOneSprite.vel.y =-8;
    }
   
    // game ends if player jumps too close to dinosaur
   	let d= dist(personOneSprite.x, personOneSprite.y, dinoOneSprite.x, dinoOneSprite.y);
 	console.log("d:", d); // checking what the value of d is
    if (!personOneSprite.colliding(ground) && d < 200) {
    noLoop();
    textSize(60);
    text('Game over\nToo close to the dinosaur' , width/2 - 150, height/2);
    }


    // game ends when the dinosaur touches the player
    if (dinoOneSprite.colliding(personOneSprite)) {
        noLoop() //to stop the game
        textSize (60);
        text ('game over', width/2-150, height/2);


    }

    

    for (let obs of obstacleGroup) {
    if (dinoOneSprite.overlapping(obs)) {
        obs.remove();
    }
}


    // mud patch 

/*function drawFrame() {

	camera.on();
	player.draw();
	camera.x = personOneSprite.x;
	camera.y = personOneSprite.y;

	camera.off();


}*/

}
/*******************************************************/
//dinoOneSprite.collides(player, gameEnd);
