var player,playerimg;
var obstacle,obstacleimg,obstaclesGroup;
var track,trackimg;
var restart,restartimg;
var tiline,biline,liline,riline;

var gameState="play";

var sound;


function preload(){
  trackimg=loadImage("track.png");
  playerimg=loadImage("player.png");
  obstacleimg=loadImage("obstacle.png");
  restartimg=loadImage("restart.png");
  sound=loadSound("sound.mp3")
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 
  track=createSprite(300,200)
  track.addImage(trackimg);
  track.scale=1.1;
  
  player=createSprite(160,400);
  player.addImage(playerimg);
  player.scale=0.7
  
  obstaclesGroup = new Group();
  
  restart=createSprite(windowWidth-290,windowHeight-250);
  restart.addImage(restartimg);
  restart.scale=0.2
  
  player.setCollider("rectangle",0,0,60,150)
  
  tiline=createSprite(windowWidth-300,windowHeight-480,windowWidth,10)
  tiline.visible=false

    biline=createSprite(windowWidth-300,windowHeight-10,windowWidth,10)
  biline.visible=false
  
      liline=createSprite(windowWidth-540,windowHeight-255,10,windowHeight)
  liline.visible=false
  
        riline=createSprite(windowWidth-60,windowHeight-255,10,windowHeight)
  riline.visible=false
}

function draw() {
 background("black");

  if(gameState==="play"){
      if(track.y>335){
    track.y=250;
 }
  track.velocityY=3;
  
  
    spawnObstacle();
    
  if(keyDown("up_arrow")){
    player.y=player.y-3;   
  }
    if(keyWentDown("up_arrow")){
       sound.play();
       }
    if(keyWentUp("up_arrow")){
       sound.pause();
       }
  if(keyDown("down_arrow")){
    player.y=player.y+3;   
  }
    if(keyWentDown("down_arrow")){
       sound.play();
       }
    if(keyWentUp("down_arrow")){
       sound.pause();
    }
  if(keyDown("left_arrow")){
    player.x=player.x-3;   
  }
    if(keyDown("right_arrow")){
    player.x=player.x+3;
  }
    restart.visible=false;
    if(player.isTouching(tiline) || player.isTouching(biline) || player.isTouching(liline) || player.isTouching(riline)){
       player.bounceOff(tiline)
      player.bounceOff(biline)
      player.bounceOff(liline)
      player.bounceOff(riline)
       }
     }
  else if(gameState==="end"){
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityYEach(0);
    restart.visible=true;
    obstacle.velocityY = 0;
    track.velocityY=0;
    sound.pause();
     if(mousePressedOver(restart)) {
      reset();
    }
     
    background("black");
    }

    if(player.isTouching(obstaclesGroup)){
      gameState="end";
    }
 drawSprites();

}
function spawnObstacle(){
  if(frameCount%20===0){
     obstacle=createSprite(250,-50);
     obstacle.x=Math.round(random(400,50));
     obstacle.addImage(obstacleimg);
     obstacle.scale=0.23;
     obstacle.velocityY=10;
     obstaclesGroup.add(obstacle);
     obstacle.lifetime=530;
     obstacle.setCollider("rectangle",0,0,200,500)
     }

}
function reset(){
  gameState="play";
  restart.visible=false;
  obstaclesGroup.destroyEach();
  player.x=160;
  player.y=400;
}