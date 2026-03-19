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
/*
carImg=loadImage('assets/images/rock.png');
deaddino=loadImage('assets/images/rock.png'); */
electricFenceSprite.passed = false;
rockSprite.passed = false;
mudPatchSprite.passed = false;
}



function setup() {
    console.log("setup:");
    createCanvas(windowWidth -10,windowHeight -10);
    world.gravity.y = 10;
    ground = new Sprite(2000, height - 50, 4000, 200, 'static'); // 'static' ground does not move due to gravity
    ground.color = '#839b5d';


    // creating dinoOne sprite and attaching image
    dinoOneSprite = new Sprite(100, height - 150, 200, 100);
    dinoOneSprite.image = dinoOneImage;
    dinoOneSprite.scale = 0.2;
    dinoOneSprite.vel.x = 1; // slower speed
    dinoOneSprite.collider = 'dynamic';
   
   
    // creating personOneSprite sprite and attaching image
    personOneSprite = new Sprite(300, height - 150, 200, 100);
    personOneSprite.image = personOneFrontImg;
    personOneSprite.scale = 0.2;
    personOneSprite.vel.x = 4; // faster speed
    personOneSprite.collider = 'dynamic';
   
    playerHasMoved = false;

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
   
    //creating the mudPatchSprite and attaching image
    mudPatchSprite = new Sprite(2000, height - 150, 100, 100);
    mudPatchSprite.image = mudPatchImg;
    mudPatchSprite.scale = 0.2;
    mudPatchSprite.collider = 'static'; // so sprite doesn't collide with ground
    obstacleGroup.add(mudPatchSprite);   

}


/*******************************************************/
let score = 0;
function draw() 
{
   
    // camera
    //camera.on();
    background('#c8f2ff');
    camera.x = personOneSprite.x + width /5;
    camera.y = height / 2;
 
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

   // when up arrow is pressed and player is on the ground
    // (player only jumps when on the ground otherwise if the player presses the up arrow repeatedly then the sprite could jump too high)
    if (kb.pressing('up') && personOneSprite.colliding(ground))
    {
        personOneSprite.vel.y =-8;
    }

    // Dinosaur only moves after the player (personOneSprite) starts moving
    if (playerHasMoved) 
    {
        dinoOneSprite.vel.x = 5;
    }


    // game ends if player jumps too close to dinosaur
    let d= dist(personOneSprite.x, personOneSprite.y, dinoOneSprite.x, dinoOneSprite.y);

    //console.log("d:", d); // checking what the value of d is

    if (!personOneSprite.colliding(ground) && d < 200) 
    {
        noLoop();
        textSize(60);
        personOneSprite.remove(); // change with boom
        text('Game over\nToo close to the dinosaur' , width/2 - 150, height/2); 

    }

    // game ends when the dinosaur touches the player
    if (dinoOneSprite.collides(personOneSprite)) 
    {
        noLoop() //to stop the game
        textSize (60);
        text ('game over', width/2-150, height/2);

    }
   
    for (let obs of obstacleGroup) 
    {
     if (dinoOneSprite.collides(obs))
        {
          obs.remove();
        }

    if (personOneSprite.collides(obs)) 
        {
        noLoop() //to stop the game
        personOneSprite.remove(); // change with boom
        textSize (60);
        text ('game over\n Your score is:'+ score, width/2-150, height/2);
        }

    if (!obs.passed && personOneSprite.x > obs.x) 
        {
        obs.passed = true;
        
        textSize (60);
        score=score+10;
        console.log (score);
        }
    }


}
/*******************************************************/
//dinoOneSprite.collides(player, gameEnd);



