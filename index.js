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

// these obstacles haven't been passed yet
electricFenceSprite.passed = false;
rockSprite.passed = false;
jeepSprite.passed = false;

}



function setup() {

    console.log("setup:");
    createCanvas(windowWidth -10,windowHeight -10);
    world.gravity.y = 10;
    ground = new Sprite(2000, height - 50, 4000, 200, 'static'); // 'static' ground does not move due to gravity
    ground.color = '#839b5d';


    // creating dinoOne sprite, attaching image.
    // Dynamics: the sprite uses full physics (affected by gravity, can move, fall, collide with objects)
    dinoOneSprite = new Sprite(100, height - 150, 200, 100);
    dinoOneSprite.image = dinoOneImage;
    dinoOneSprite.scale = 0.2;
    dinoOneSprite.vel.x = 1; // slower speed
    dinoOneSprite.collider = 'dynamic';
   
    // creating personOneSprite sprite and attaching image
    personOneSprite = new Sprite(300, height - 150, 200, 100);
    personOneSprite.image = personOneFrontImg;
    personOneSprite.scale = 0.2;
    personOneSprite.vel.x = 4; // faster than dino
    personOneSprite.collider = 'dynamic';
   
    //boolean variable keeping track of wehter the player has moved or not 
    // so the dinosaur does not start running until the player moves 
    playerHasMoved = false;

    // a new group storing all obstacle sprites
    obstacleGroup = new Group();

    //creating electricFenceSprite and attaching image
    electricFenceSprite = new Sprite(900, height - 150, 200, 100);
    electricFenceSprite.image = electricFenceImg;
    electricFenceSprite.scale = 0.2;
    electricFenceSprite.collider = 'static';
    obstacleGroup.add(electricFenceSprite); 
 
    //creating rockSprite and attaching image
    rockSprite = new Sprite(1500, height - 150, 200, 100);
    rockSprite.image = rockImg;
    rockSprite.scale = 0.2;
    rockSprite.collider = 'static';
    obstacleGroup.add(rockSprite);
   
    /*//creating the mudPatchSprite and attaching image
    mudPatchSprite = new Sprite(2000, height - 150, 100, 100);
    mudPatchSprite.image = mudPatchImg;
    mudPatchSprite.scale = 0.2;
    mudPatchSprite.collider = 'static'; // so sprite doesn't collide with ground
    obstacleGroup.add(mudPatchSprite);   */

    //creating abandoned jeep and attaching image 
    jeepSprite = new Sprite(3000, height - 150, 200, 100);
    jeepSprite.image = jeepImg;
    jeepSprite.scale = 0.2;
    jeepSprite.collider = 'static';
    obstacleGroup.add(jeepSprite);

}


/*******************************************************/
let score = 0; // declared outside of draw so score doesn't reset every frame
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

    // If up arrow and player is on the ground, then make the player jump
    // this is so that if the user repeately pushes the arrow button then the player does not jump too high 
    if (kb.pressing('up') && personOneSprite.colliding(ground))
    {
        personOneSprite.vel.y =-8;
    }

    // Dinosaur only moves after the player (personOneSprite) starts moving
    if (playerHasMoved) 
    {
        dinoOneSprite.vel.x = 5;
    }

    // d becomes a number that represents the distance between the player and the dinosaur 
    let d= dist(personOneSprite.x, personOneSprite.y, dinoOneSprite.x, dinoOneSprite.y);

    //console.log("d:", d); // checking what the value of d is2

    if (!personOneSprite.colliding(ground) && d < 200) 
    {
        noLoop();
        textSize(60);
        personOneSprite.remove(); // change with boom
        text('Game over\nToo close to the dinosaur\n Your score is:'+ score, width/2 - 150, height/2); 

    }

    // game ends when the dinosaur touches the player

   
    for (let obs of obstacleGroup) 
    {
     /*if (dinoOneSprite.collides(obs))
        {
          obs.remove();
        }*/

     if (personOneSprite.collides(obs)) 
        {
        noLoop() //to stop the game
        personOneSprite.remove(); // change with boom
        textSize (60);
        text ('game over\n Your score is:'+ score, width/2-150, height/2);
        }

     if (dinoOneSprite.collides(personOneSprite)) 
        {
        noLoop() //to stop the game
        textSize (60);
        text ('game over\n Your score is:'+ score, width/2-150, height/2);

        }

     if (personOneSprite.overlaps(obs)) 
        {
        noLoop() //to stop the game
        //personOneSprite.remove(); // change with boom
        textSize (60);
        text ('game over\n Your score is:'+ score, width/2-150, height/2);
        }



     if (personOneSprite.x > obs.x) 
        {
        obs.passed = true;
        obs.remove()
        textSize (60);
        score=score+10;
        console.log (score);
        }
    }


}
/*******************************************************/
//dinoOneSprite.collides(player, gameEnd);



