var space, space_img;
var earth, earth_img;
var player, player_img;
var play, play_img;
var set, set_img;
var heart1, heart2, heart3, heart_img;
var rock1, rock2, rock3, rock_img;
var fire, fire_img;
var question, question_img;
var save, save_img;
var exit, exit_img;
var gameState = 0;
var play;
var end;
var player1;
var fireGroup;
var rockGroup;
var rockGroup2;
var fireSound;
var backSound;
var life = 3;

var score = 50;

function preload(){
  space_img = loadImage("images/space.jpg");
  earth_img = loadImage("images/earth.png");
  player_img = loadImage("images/astronaut.png");
  play_img = loadImage("images/play.jpg");
  set_img = loadImage("images/sett.jpg");
  heart_img = loadImage("images/heart.png")
  rock_img = loadImage("images/rock.png")
  fire_img = loadImage("images/fire.png")
  question_img = loadImage("images/q1.png")
  save_img = loadImage("images/SAVE.jpg")
  exit_img = loadImage("images/EXIT.png");
  astranout_img = loadImage("images/astronaut1.png")
  fireSound = loadSound("images/fire sound.wav")
  rockSound = loadSound("images/fire sound1.wav");
//  backSound = loadSound("images/bcmp3.mp3")
}
function setup() {
  createCanvas(530, 300);

//  space = createSprite(265,150,20,20);
 // space.addImage(space_img);
 // space.scale = 1.2;

  save = createSprite(250,40,20,20);
  save.addImage(save_img);
  save.scale = 0.65;

  play = createSprite(210,103,20,20);
  play.addImage(play_img);
  play.scale = 0.7;

  set = createSprite(210,163,20,20);
  set.addImage(set_img);
  set.scale = 0.65;

  exit = createSprite(190,226,20,20);
  exit.addImage(exit_img);
  exit.scale = 0.65;

  earth = createSprite(-25,150,20,20);
  earth.addImage(earth_img);
  earth.scale = 0.8;

  heart1 = createSprite(516,13,20,20);
  heart1.addImage(heart_img);
  heart1.scale = 0.05;
  heart1.visible = false

  heart2 = createSprite(489,13,20,20);
  heart2.addImage(heart_img);
  heart2.scale = 0.05;
  heart2.visible = false

  heart3 = createSprite(462,13,20,20);
  heart3.addImage(heart_img);
  heart3.scale = 0.05;
  heart3.visible = false

  line1 = createSprite(265,-2,1000,2);
 // line1.visible = false

  line2 = createSprite(-2,-2,-5,1000);
 // line2.visible = false

  line3 = createSprite(533,303,-5,1000);
 // line3.visible = false

  line4 = createSprite(268,303,1000,-5);
  //line4.visible = false
  
  player = createSprite(450,180,20,20);
  player.addImage(astranout_img);
  player.scale = 0.45;

  player1 = createSprite(180,150,20,20);
  player1.addImage(player_img);
  player1.scale = 0.4;
  player1.visible = false

  fireGroup = createGroup();
  rockGroup = createGroup();
  rockGroup2 = createGroup();

  player1.debug = true
}

function draw() {
  background(space_img);

 if(mousePressedOver(play)){
   set.visible = false
   save.visible = false
   exit.visible = false
   player.visible = false
   gameState = "start";
   play.visible = false

   heart1.visible = true
   heart2.visible = true
   heart3.visible = true
 // play.lifetime = 20
 }

/* if(play.lifetime === 0){
   set.visible = false
   save.visible = false
   exit.visible = false
   player.visible = false
   gameState = "start";
 } */

 if(gameState === "start"){
  player1.visible = true

//  backSound.play();

  textSize(16);
  text("Player",player1.x-25,player1.y-30);

  textSize(16);
  text("Fireballs :" + score,420,292);
  
  if(keyDown("UP_ARROW")){
    player1.y = player1.y -5;
  }

  if(keyDown("DOWN_ARROW")){
    player1.y = player1.y +5;
  }

  if(keyDown("LEFT_ARROW")){
    player1.x = player1.x -5;
  }

  if(keyDown("RIGHT_ARROW")){
    player1.x = player1.x +5;
  }
  
  if(keyDown("SPACE")){
    fireSound.play();
    spawnFire();
    score -=1;
  }

  spawnRocks();
  spawnRocks2();

  player1.bounceOff(line1)
  player1.bounceOff(line2)
  player1.bounceOff(line3)
  player1.bounceOff(line4)

  if(fireGroup.isTouching(rockGroup)){
    rockSound.play();
    rockGroup.destroyEach(-1);
  }

  if(fireGroup.isTouching(rockGroup2)){
    rockSound.play();
    rockGroup2.destroyEach(-1);
  }

  if(player1.isTouching(rockGroup) || player1.isTouching(rockGroup2)){
    life = life -1;

    if(life === 2){
      heart3.destroy();
      console.log(life)
    }
    if(life === 1){
   //   heart3.visible = false
      heart2.destroy();
      console.log(life)
    }
  /*  if(life === 0){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = false
    } 
    */
  /*  switch(life){
      case 2 : heart3.visible = false
               console.log("life2")
         break;
      case 1 : heart3.visible = false
               heart2.visible = false
               console.log("life1")
         break;
      case 0 : heart3.visible = false
               heart2.visible = false 
               heart1.visible = false 
               console.log("life0")
         default:break
    }
    */
  }



/*  if(heart3.lifetime === 0 && rockGroup.isTouching(player1)){
     heart2.visible = false;
  }

  if(heart3.lifetime === 0 && rockGroup2.isTouching(player1)){
    heart2.lifetime = 0;
 }

 if(heart2.lifetime === 0 && rockGroup.isTouching(player1)){
  heart1.lifetime = 0;
}

if(heart2.lifetime === 0 && rockGroup2.isTouching(player1)){
 heart1.lifetime = 0;
}
*/

 }

 
  drawSprites();
}

function spawnFire(){
  fire = createSprite(180,150,20,20);
  fire.addImage(fire_img);
  fire.x = player1.x +40;
  fire.y = player1.y;
  fire.velocityX = 7;
  fire.scale = 0.05;
  fire.lifetime = 100;
 
  fireGroup.add(fire);
  
}

function spawnRocks(){ 

  if(frameCount % 130 === 10){

  rock = createSprite(600,100,20,20);
  rock.addImage(rock_img);
  rock.scale = 0.35;
  rock.velocityX = -3;
  rock.lifetime = 230;

  rock.y = random(50,250);
  rock.scale = random(0.35,0.2)

  rock.debug = true

  rockGroup.add(rock)

  }
}

function spawnRocks2(){ 

  if(frameCount % 70 === 10){
    
  rock2 = createSprite(600,100,20,20);
  rock2.addImage(rock_img);
  rock2.scale = 0.35;
  rock2.velocityX = -3;
  rock2.lifetime = 230;

  rock2.debug = true
  
  rock2.y = random(50,250);
  rock2.scale = random(0.4,0.2)

  rockGroup2.add(rock2)
  }
}