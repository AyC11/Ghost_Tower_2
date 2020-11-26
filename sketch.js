var PLAY = 1;
var END = 0;
var gameState = 1;
var towerImg,stoneImg,ghostImg,coinImg;
var tower,ghost,stone,coin;
var stoneGroup,coinGroup;
var score;
var edges;
var runningSound,cryingSound,laughingsound;
function preload () {
  towerImg=loadImage("tower.png");
 stoneImg=loadImage("obstacle.png");
  ghostImg=loadImage("ghost-standing.png");
  coinImg=loadImage("1.png");
  runningSound=loadSound("Azghost.mp3");
  cryingSound=loadSound("Spooked.mp3");
  laughingsound=loadSound("wickedmalelaugh1.mp3");
}
function setup(){
  createCanvas(600,600);
   edges = createEdgeSprites();
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=3;
  
  ghost=createSprite(220,270,10,50);
  ghost.scale=0.3;
  ghost.addImage(ghostImg);

   stoneGroup= new Group();
    score=0;
   coinGroup= new Group();
}
function draw(){
  ghost.depth += 1;
background(220)
  if(tower.y>400){
    tower.y=200;
  
}
 if (keyDown("r")) {
    gameState = PLAY;
    stones();
    coins();
   tower.visible = true;
    ghost.visible = true;
   //stoneGroup.velocityY=9;
   //stoneGroup.velocityY=9;
  score=0;
 }
  if(gameState === PLAY){
    runningSound.play();
    stones();
    coins();
     if (keyWentDown("UP_ARROW")) {
      ghost.y = ghost.y-4;
    }
    if(keyWentDown("DOWN_ARROW")) {
      ghost.y=ghost.y-4;
    }
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 4;
    }
    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 4;
    }
    
    if(coinGroup.isTouching(ghost)){
    coinGroup.destroyEach();
      score=score+2;
      laughingsound.play();
    }
  if(stoneGroup.isTouching(ghost)){
    cryingSound.play();
    gameState = END;
  }
     ghost.collide(edges[1]);
    ghost.collide(edges[0]);
    if (ghost.collide(edges[3])) {
     cryingSound.play();
      gamestate = END;
    }
  }
 
 
  drawSprites();
 fill("red");
  textSize(20);
  text("score: "+score,490,40);
  if(gameState === END){
   
    stoneGroup.destroyEach();
     coinGroup.destroyEach();
        coinGroup.setLifetimeEach(-1);  

    stoneGroup.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);  
    stoneGroup.VelocityY=0;
     coinGroup.VelocityY=0;
     ghost.velocityY=0;
    ghost.velocityX=0;
    tower.visible = false;
    ghost.visible = false;
   background("black");
    textSize(30);
    fill("yellow");
    text("GAME OVER", 160, 250);
    textSize(25);
    text("Your score was: " + score, 150, 350);
    text("Press r to reset", 160, 150);
  }
}
function stones(){
  if(World.frameCount %100 === 0){
    stone=createSprite(50,50);
    stone.y=Math.round(random(100,150))
    stone.x=Math.round(random(100,400))
    stone.velocityY=(3 + score/10);
    stone.velocityY=9;
    stone.addImage(stoneImg);
    stone.scale=0.1;
    stone.setlifetime=150;
    stoneGroup.add(stone);
  }
}
function coins(){
  if(World.frameCount%170 === 0){
    coin=createSprite(200,50);
    
    coin.y=Math.round(random(50,100));
    coin.x=Math.round(random(90,300))
    coin.addImage(coinImg);
    coin.velocityY=5;
    coin.scale=0.02;
   coin.setlifetime=100;
  // coin.background(0);
    coinGroup.add (coin);
  }
}