    /******************************************************
    Jurassic Chase – Main Game File
    Written by: Nityaa

    This program creates a side‑scrolling chase game using p5.js 
    and p5play. The player must run from a dinosaur, avoid 
    obstacles, and reach the finish gate. The game uses physics, 
    sprite groups, collision detection, and a scoring system.

    ******************************************************/
/********************** CONSTANTS *****************************/
const GRAVITY = 10;
const PLAYER_SPEED = 5;
const DINO_SPEED = 5;
const JUMP_FORCE = -8;
const SCORE_INCREMENT = 10;

/********************** GLOBAL VARIABLES **********************/
let dinoOneSprite, personOneSprite, obstacleGroup;
let electricFenceSprite, rockSprite, mudPatchSprite;
let jeepSprite, ddinoSprite, finSprite, ground;

    let score = 0; // declared outside of draw so score doesn't reset every frame
    let scorePopup = "";
    let scorePopupTimer = 0;
    let gameTime = 0; 
/********************** PRELOAD *******************************/

    function preload() 
    {
        //loading images before the game starts 
        // All images are made with the help of chatgpt and copilot
        dinoOneImage = loadImage('assets/images/dino2.png'); 
        personOneFrontImg = loadImage('assets/images/person1front.png');
        personOneSideImg = loadImage('assets/images/person1side.png');
        mudPatchImg = loadImage('assets/images/mudPatch.png');
        electricFenceImg = loadImage('assets/images/electricfence.png');
        rockImg = loadImage('assets/images/rock1.png');
        jeepImg=loadImage('assets/images/jeep2.png');
        ddinoImg=loadImage('assets/images/ddino.png');
        finImg = loadImage('assets/images/finline.png');
    }


/********************** SETUP ********************************/

    function setup() 
    {

        //console.log("setup:");
        createCanvas(windowWidth -10,windowHeight -10);
        world.gravity.y = GRAVITY; // Apply gravity to the world
        ground = new Sprite(2000, height - 50, 15000, 200, 'static'); // 'static' ground does not move due to gravity
        ground.color = '#839b5d';


        // creating dinoOne sprite, attaching image.
        // Dynamics: the sprite uses full physics (affected by gravity, can move, fall, collide with objects)
        dinoOneSprite = new Sprite(100,height-100);
        dinoOneSprite.image = dinoOneImage;
        dinoOneSprite.scale = 0.4;
        dinoOneSprite.width = 300;  // slightly wider than player

        dinoOneSprite.height = 200;

        dinoOneSprite.height = 170;

        dinoOneSprite.vel.x = DINO_SPEED; // slower speed
        dinoOneSprite.collider = 'dynamic';
        //dinoOneSprite.debug = true;
        dinoOneSprite.rotationLock = true; // prevents spinning
    
        // creating personOneSprite sprite and attaching images
        personOneSprite = new Sprite(500, height - 150, 60, 100);
        personOneSprite.image = personOneFrontImg;
        personOneSprite.layer = 10;
        personOneSprite.scale = 0.2;
        personOneSprite.width = 90;  // slightly wider than player
        personOneSprite.height = 60;
        personOneSprite.vel.x = PLAYER_SPEED; // faster than dino
        personOneSprite.collider = 'dynamic';
        //personOneSprite.debug = true;
        personOneSprite.rotationLock = true; // prevents spinning
    
        //boolean variable keeping track of weheter the player has moved or not 
        // so the dinosaur does not start running until the player moves 
        playerHasMoved = false;

        // a new group storing all obstacle sprites
        obstacleGroup = new Group();

        //creating electricFenceSprite and attaching image
        electricFenceSprite = new Sprite(1500, height - 150, 300, 200);
        electricFenceSprite.image = electricFenceImg;
        electricFenceSprite.scale = 0.25;
        electricFenceSprite.width = 150;  // slightly wider than player
        electricFenceSprite.height = 60;
        electricFenceSprite.collider = 'static';
       // electricFenceSprite.debug = true;
        obstacleGroup.add(electricFenceSprite);
        electricFenceSprite.passed = false; 
    
        //creating rockSprite and attaching image
        rockSprite = new Sprite(2500, height - 150, 200, 100);
        rockSprite.image = rockImg;
        rockSprite.scale = 0.25;
        rockSprite.width = 120;
        rockSprite.height = 60;
        rockSprite.collider = 'static';
        //rockSprite.debug = true;
        obstacleGroup.add(rockSprite);
        rockSprite.passed = false;
    
        //creating the mudPatchSprite and attaching image
        mudPatchSprite = new Sprite(3500, height - 150, 100, 50);
        mudPatchSprite.image = mudPatchImg;
        mudPatchSprite.scale = 0.25;
        mudPatchSprite.width = 160;  
        mudPatchSprite.height = 60;
        mudPatchSprite.collider = 'static'; // so sprite doesn't collide with ground
        //mudPatchSprite.debug = true;
        obstacleGroup.add(mudPatchSprite);   
        mudPatchSprite.passed = false;


        //creating abandoned jeep and attaching image 
        jeepSprite = new Sprite(4500, height - 150, 200, 100);
        jeepSprite.image = jeepImg;
        jeepSprite.scale = 0.36;
        jeepSprite.width = 170;  
        jeepSprite.height = 60;
        jeepSprite.collider = 'static';
        //jeepSprite.debug = true;
        obstacleGroup.add(jeepSprite);
        jeepSprite.passed = false;

        //creating ddinoSprite and attaching image 
        ddinoSprite = new Sprite(5500, height - 150, 200, 100);
        ddinoSprite.image = ddinoImg;
        ddinoSprite.scale = 0.29;
        ddinoSprite.width = 250;  
        ddinoSprite.height = 70;
        ddinoSprite.collider = 'static';
        //ddinoSprite.debug = true;
        obstacleGroup.add(ddinoSprite);
        ddinoSprite.passed = false;

        //creating finSprite and attaching image 
        finSprite = new Sprite(6500, height - 150, 200, 200);
        finSprite.image = finImg;
        finSprite.layer = 5;
        finSprite.scale = 0.4;
        finSprite.width = 300;  
        finSprite.height = 400;
        finSprite.rotationLock = true; // keeping image upright 
        finSprite.collider = 'static';
        //finSprite.debug = true;
        finSprite.passed = false;

    }


    /*******************************************************/

    function draw() 
    {
        background('#c8f2ff');
    // camera only starts moving once the player moves past the center of the screen 
        camera.x = max(width/2, personOneSprite.x);
        camera.y = height/2;
    // Draw score on screen
        textSize(32);
        fill(0);
        text("Score: " + score, width/9, height/8);

    // Draw time on screen
        gameTime += deltaTime / 1000;   // convert ms → seconds
        text(`Time: ${Math.floor(gameTime)}`,width/9, height/6
    );

        // if right arrow button pushed, move player right & switch sprite's image to the side view
        if (kb.pressing('right'))   
            {
                personOneSprite.x += PLAYER_SPEED; 
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
        for (let obs of obstacleGroup) 
        {
            if (personOneSprite.colliding(obs)) {
                onObstacle = true;
                break;
            }
        }
        // Player can only jump if on ground and not on an obstacle
        if (kb.pressing('up') && onGround && !onObstacle) 
        {
            personOneSprite.vel.y = JUMP_FORCE;
        }

        // Dinosaur only moves after the player (personOneSprite) starts moving
        if (playerHasMoved) 
        {
            dinoOneSprite.vel.x = DINO_SPEED;
        }

        // game ends when the dinosaur touches the player or player touches obstacles

    
        for (let obs of obstacleGroup) 
        {
            if (personOneSprite.collides(obs)) 
            {
                endGame("You have touched an obstacle");
                return;

            }

            if (!obs.passed && personOneSprite.x > obs.x+ obs.width/2+50) 
            {
                obs.passed = true;
                score=score+SCORE_INCREMENT;   
                scorePopup = "+10";
                scorePopupTimer = 60;
            }   

            if (dinoOneSprite.collides(obs))
            {
                obs.remove();
            }

            if (dinoOneSprite.collides(personOneSprite)) 
            {
                endGame("You were caught by the dinosaur");
                return;
            }

            if (scorePopupTimer > 0) // Score popup animation
            {
                scorePopupTimer--;
                textSize(40);
                fill(0);
                text(scorePopup, width/2-20, height/2-80);
            }
        }

 /********************** FINISH LINE **************************/
       
        if (personOneSprite.collides(finSprite)) 
        {
            finSprite.passed = true;
           endGame("You have won the game");
        }
    }
    /*******************************************************/


function endGame (message)
{
    noLoop();
    dinoOneSprite.vel.x = 0;
    personOneSprite.vel.x = 0;
    personOneSprite.vel.y = 0;
    textSize(40);
    text(`${message}`, width/3, height/3);
    localStorage.setItem("finalScore", score);
    localStorage.setItem("finalTime", gameTime.toFixed(2));
        // Pause for 2 seconds before redirecting

        if (finSprite.passed == true)
        {
            setTimeout(() => {  window.location.href = "game_end.html";    }, 2000);
        }
        else {
            setTimeout(() => {  window.location.href = "game_paused.html";    }, 2000);
        }
    

}

