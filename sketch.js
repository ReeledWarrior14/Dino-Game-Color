
var dino;

var ground, ground2, invisibleground, invisiblehelp;

var clouds;

var cacti;

var r, x;

var gameover, restart;

// var test;

// var cloud1;

var score2;

var highscore;

var gamestate = 'play';

var speed;

var touches;

function preload() {
  dino1 = loadAnimation('Dino.png', 'Dino2.png', 'Dino.png', 'Dino3.png');
  // ground1 = loadAnimation('sad ground.png');
  cloud2 = loadAnimation('Cloud bad pixel art.png');
  cactus1 = loadAnimation('cactus bad pixel art.png');
  cactus2 = loadAnimation('cactus 2 bad pixel art.png');
  cactus3 = loadAnimation('cactus 1 + 2 bad pixel art.png');
  cactus4 = loadAnimation('cactus 3 + 3 bad pixel art.png');
  cactus5 = loadAnimation('cactus bad pixel art.png');
  cactus6 = loadAnimation('cactus 2 bad pixel art.png');
  // ground3 = loadAnimation('sad ground.png');
  dino2 = loadAnimation('DinoCrash.png');
  gameover1 = loadAnimation('gameOver.png');
  restart1 = loadAnimation('restart.png');
  die = loadSound('die.mp3');
  jump = loadSound('jump.mp3');
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 2);
  
  dino = createSprite(50, height/2 - 50, 20, 20);
  dino.addAnimation('dino', dino1);
  dino.scale = 1.5;
  // dino.setCollider("rectangle", -5, -10, 25, 100, 45);
  dino.setCollider('circle', 0, 0, 10);
  dino.depth = 5;
  
  ground = createSprite(width/2, height/2 + 10, width, 75);
  // ground.addAnimation('ground', ground1);
  ground.velocityX = -5;
  ground.shapeColor = rgb(41, 195, 24);
  ground.depth = -1;
  
  invisibleground = createSprite(width/2, height/2 + 15, width, 10);
  invisibleground.visible = false;
  
  ground2 = createSprite(width/2, height/2 + 10, width, 75);
  // ground2.addAnimation('ground2', ground3);
  ground2.shapeColor = rgb(41, 195, 24);
  ground2.depth = -2;
  
  // cloud1 = createSprite(200, 240, 20, 20);
  
  cacti = new Group();
  clouds = new Group();
  
  // test = createSprite(320, 30, 50, 30);
  // test.shapeColor = 'black';
  
  gameover = createSprite(width/2, height/4, 20, 20);
  gameover.addAnimation('game over', gameover1);  
  gameover.visible = false;
  gameover.scale = 0.5;
  
  restart = createSprite(width/2, height/4 + 40, 20, 20);
  restart.addAnimation('restart', restart1);
  restart.visible = false;
  restart.scale = 0.75;

  invisiblehelp = createSprite(width/2, height, width, height);
  invisiblehelp.shapeColor = rgb(85, 44, 16);
  invisiblehelp.depth = -3;
  invisiblehelp.visible = true;
  
  score2 = 1;
  
  speed = 0;
  
  highscore = 0;
  
  touches = [];
}

function draw() {
  background(250);
  
  r = 100;

  x = windowWidth - windowWidth/3;

  // console.log(windowHeight);
  
  if (highscore < score2){
    highscore = score2;
  }
  
  r2 = Math.round(random(5, 10));
  
  if (gamestate == 'play'){
    if (frameCount % 300 == 0){
      speed = speed + 1;
    }
    ground.velocityX = -5 - speed;
  }
  
  if (gamestate == 'play'){
    // if (ground.x == -x){
    //   ground.x = x;
    // }
    // if (ground2.x == -x){
    //   ground2.x = x;
    // }
    
    cacti.setVelocityXEach(ground.velocityX);
  }

  if (gamestate == 'play'){
    cloudandcacti();
  }
  
  // dino.debug = true;
  if (gamestate == 'play'){
    dino.overlap(cacti, crash);
  }
  
  if (gamestate == 'play'){
    if ((keyDown('space') || touches.length > 0) && dino.y > height/2 - 20){
      dino.velocityY = -10;
      jump.play();
      touches = [];
      // test.shapeColor = 'gray';
    }
  }
  
  if (gamestate == 'play'){
    dino.velocityY = dino.velocityY + 0.5
  }
    
  dino.collide(invisibleground);
  
  if (gamestate == 'end' && (mousePressedOver(restart) || touches.length > 0)){
    touches = [];
    score2 = 0;
    dino.addAnimation('dino', dino1);
    cacti.setLifetimeEach(1);
    gamestate = 'play';
    gameover.visible = false;
    restart.visible = false;
  }
  
  drawSprites();
    
  if (gamestate == 'play'){
    score2 = score2 + 1;
  }
  
  // fill("blue");
  // textSize(10);
  // text(mouseX, 10, 15);
  // text(mouseY, 30, 15);
  
  // test.shapeColor = 'black';
  
  // text(score, 360, 15);
  textSize(15);
  text(score0() + score2, width/2, 50);
  text('High score: ' + score0() + highscore, width/2 - 200, 50);
}

function crash(){
  gamestate = 'end';
  dino.addAnimation('dino', dino2);
  dino.velocityY = 0;
  ground.velocityX = 0;
  ground2.velocityX = 0;
  // clouds.setVelocityXEach(0);
  cacti.setVelocityXEach(0);
  cacti.setLifetimeEach(-1);
  gameover.visible = true;
  restart.visible = true;
  die.play();
  speed = 0;
}
  
function score0(){
  if (score2 < 10){
    return '0000';
  }
  else if (score2 >= 10 && score2 < 100){
    return '000';
  }
  else if(score2 >= 100 && score2 < 1000){
    return '00';
  }
  else if(score2 >= 1000 && score2 < 10000){
  return '0';
  }
  else{
    return null;
  }
}
  
function cloudandcacti(){
  if (frameCount % (Math.round(random(6, 10)) *10) == 0){
      cloud = createSprite(width + 50, random(50, height/4 + 50), 20, 20);
      cloud.addAnimation('cloud', cloud2);
      cloud.velocityX = -1 - speed;
      cloud.scale = 2;
      cloud.depth = 0.5;
      cloud.lifetime = width * 2;
      clouds.add(cloud);
    }
  
  if (frameCount % r == 0) {
      cactus = createSprite(width + 50, height/2, 20, 20);
      cactus.velocityX = ground.velocityX;
      cactus.lifetime = width/4;
    
      switch (r2){
        case 5: cactus.addAnimation('cactus1', cactus1); cactus.scale = 2; cactus.setCollider('rectangle', 0, 0, 22, 30); break
        case 6: cactus.addAnimation('cactus2', cactus2); cactus.scale = 2; cactus.setCollider('rectangle', 0, 0, 22, 30); break
        case 7: cactus.addAnimation('cactus3', cactus3); cactus.scale = 2; cactus.setCollider('rectangle', 10, 0, 44, 30); break
        case 8: cactus.addAnimation('cactus4', cactus4); cactus.scale = 1.5; cactus.setCollider('rectangle', -5, 0, 75, 30); break
        case 9: cactus.addAnimation('cactus5', cactus5); cactus.scale = 2; cactus.setCollider('rectangle', 0, 0, 22, 30); break
        case 10: cactus.addAnimation('cactus6', cactus6); cactus.scale = 2; cactus.setCollider('rectangle', 0, 0, 22, 30); break
        default: break
      }
      
        
      // cactus.debug = true;    
      cacti.add(cactus);
      // cactus.debug = true;    
    }
}


// Anay Nagar 2020