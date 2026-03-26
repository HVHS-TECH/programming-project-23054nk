/*******************************************************/
// programming project: index.js
/// Written by Nityaa
/*******************************************************/
   
/*******************************************************/
// setup()
/*******************************************************/




function preload() {
//loading images before the game starts 
dinoOneImage = loadImage('assets/images/dino.png');
personOneFrontImg = loadImage('assets/images/person1front.png');
personOneSideImg = loadImage('assets/images/person1side.png');
mudPatchImg = loadImage('assets/images/mudPatch.png');
electricFenceImg = loadImage('assets/images/electricFence.png');
rockImg = loadImage('assets/images/rock.png');
jeepImg=loadImage('assets/images/pixelAbandonedJeep.png');
ddinoImg=loadImage('assets/images/deaddino.png');
finImg = loadImage('assets/images/Finishgate.png');
}



function setup() {

    console.log("setup:");
    createCanvas(windowWidth -10,windowHeight -10);
    world.gravity.y = 10;
    ground = new Sprite(2000, height - 50, 15000, 200, 'static'); // 'static' ground does not move due to gravity
    ground.color = '#839b5d';


    // creating dinoOne sprite, attaching image.
    // Dynamics: the sprite uses full physics (affected by gravity, can move, fall, collide with objects)
    dinoOneSprite = new Sprite(100, height - 150, 200, 100);
    dinoOneSprite.image = dinoOneImage;
    dinoOneSprite.scale = 0.3;
    dinoOneSprite.vel.x = 2; // slower speed
    dinoOneSprite.collider = 'dynamic';
    dinoOneSprite.rotationLock = true; // prevents spinning
   
    // creating personOneSprite sprite and attaching images
    personOneSprite = new Sprite(500, height - 150, 60, 100);
    personOneSprite.image = personOneFrontImg;
    personOneSprite.scale = 0.2;
    personOneSprite.vel.x = 5; // faster than dino
    personOneSprite.collider = 'dynamic';
    personOneSprite.rotationLock = true; // prevents spinning
   
    //boolean variable keeping track of wehter the player has moved or not 
    // so the dinosaur does not start running until the player moves 
    playerHasMoved = false;

    //a new group storing all obstacle sprites
    obstacleGroup = new Group();

    //creating electricFenceSprite and attaching image
    electricFenceSprite = new Sprite(1500, height - 150, 300, 200);
    electricFenceSprite.image = electricFenceImg;
    electricFenceSprite.scale = 0.25;
    electricFenceSprite.collider = 'static';
    electricFenceSprite.debug = true.
    obstacleGroup.add(electricFenceSprite);
    electricFenceSprite.passed = false; 
    
 
    //creating rockSprite and attaching image
    rockSprite = new Sprite(2500, height - 150, 200, 100);
    rockSprite.image = rockImg;
    rockSprite.scale = 0.25;
    rockSprite.width = 120;
    rockSprite.height = 60;
    rockSprite.collider = 'static';
    rockSprite.debug = true.
    obstacleGroup.add(rockSprite);
    rockSprite.passed = false;
   
    //creating the mudPatchSprite and attaching image
    mudPatchSprite = new Sprite(3500, height - 150, 100, 50);
    mudPatchSprite.image = mudPatchImg;
    mudPatchSprite.scale = 0.25;
    mudPatchSprite.width = 120;  // slightly wider than player
    mudPatchSprite.height = 60;
    mudPatchSprite.collider = 'static'; // so sprite doesn't collide with ground
    mudPatchSprite.debug = true.
    obstacleGroup.add(mudPatchSprite);   
    mudPatchSprite.passed = false;


    //creating abandoned jeep and attaching image 
    jeepSprite = new Sprite(4500, height - 150, 200, 100);
    jeepSprite.image = jeepImg;
    jeepSprite.scale = 0.25;
    jeepSprite.collider = 'static';
    obstacleGroup.add(jeepSprite);
    jeepSprite.passed = false;

    //creating ddinoSprite and attaching image 
    ddinoSprite = new Sprite(5500, height - 150, 200, 100);
    ddinoSprite.image = ddinoImg;
    ddinoSprite.scale = 0.25;
    ddinoSprite.collider = 'static';
    obstacleGroup.add(ddinoSprite);
    ddinoSprite.passed = false;

    //creating finSprite and attaching image 
    finSprite = new Sprite(6500, height - 150, 200, 100);
    finSprite.image = finImg;
    finSprite.scale = 0.5;
    finSprite.collider = 'static';
    //obstacleGroup.add(finSprite);
    finSprite.passed = false;

}


/*******************************************************/
let score = 0; // declared outside of draw so score doesn't reset every frame
let scorePopup = "";
let scorePopupTimer = 0;
function draw() 
{
    background('#c8f2ff');
// camera only starts moving once the player moves past the center of the screen 
    camera.x = max(width/2, personOneSprite.x);
    camera.y = height/2;
   

    // if right arrow button pushed, move player right & switch sprite's image to the side view
    if (kb.pressing('right'))   
    {
        personOneSprite.x+=5; 
        personOneSprite.image = personOneSideImg;
        playerHasMoved = true; // personOneSprite has started moving
    }
    else // if right arrow button isn't being pushed switch back to front view
    {
        personOneSprite.image = personOneFrontImg;
    }

    // -------- Jump Logic --------
    let onGround = personOneSprite.colliding(ground);
    let onObstacle = false;
    for (let obs of obstacleGroup) {
        if (personOneSprite.colliding(obs)) {
            onObstacle = true;
            break;
        }
    }
    // Player can only jump if on ground and not on an obstacle
    if (kb.pressing('up') && onGround && !onObstacle) {
        personOneSprite.vel.y = -8;
    }

    // Dinosaur only moves after the player (personOneSprite) starts moving
    if (playerHasMoved) 
    {
        dinoOneSprite.vel.x = 5;
    }

    // d becomes a number that represents the distance between the player and the dinosaur 
    let d= dist(personOneSprite.x, personOneSprite.y, dinoOneSprite.x, dinoOneSprite.y);

    //console.log("d:", d); // checking what the value of d is

    if (!onGround && d < 150) 
    {
        noLoop();
        textSize(40);
        personOneSprite.remove();
        text('Game over\nToo close to the dinosaur\n Your score is:'+ score, width / 3, height / 3); 

    }

    // game ends when the dinosaur touches the player

   
    for (let obs of obstacleGroup) 
    {
if (personOneSprite.collides(obs)) 
{
    noLoop();
    dinoOneSprite.vel.x = 0;
    personOneSprite.vel.x = 0;
    personOneSprite.vel.y = 0;

    textSize(40);

    text('Game Over\nYou touched an obstacle\nScore: ' + score, width/3, height/3);
    return;
}

        if (!obs.passed && personOneSprite.x > obs.x+ obs.width/2+50) 
        {
        obs.passed = true;
        score=score+10;   
        scorePopup = "+10";
        scorePopupTimer = 60;
        }   

       if (dinoOneSprite.collides(obs))
        {
          obs.remove();
        }
        /*if (obs.passed) {
        obs.remove();
        }*/

        if (dinoOneSprite.collides(personOneSprite)) 
        {
        noLoop() //to stop the game
        obs.remove()
        textSize (40);
        text ('game over\n you have been hit by dino\n Your total score is:'+ score, width/3, height/3);

        }

        if (scorePopupTimer > 0)
        {
        scorePopupTimer--;
        textSize(40);
        fill(0);
        text(scorePopup, width/2-20, height/2-80);
        }
    }

    if (personOneSprite.collides(finSprite)) 
        {
            finSprite.passed = true;
        dinoOneSprite.remove();
        //saving score so that user can see final score on ending page 
        localStorage.setItem("finalScore", score);
        window.location.href="game_end.html";
        //textSize (40);
        //text ('You Win \n Your final score is:'+ score, width/2-150, height/2);

        }
}
/*******************************************************/
//dinoOneSprite.collides(player, gameEnd);



