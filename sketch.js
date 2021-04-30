var runner, runner_running;
var ground, ground_image, invisible_ground;
var cloud1, cloud2, cloud3, cloudsGroup;
var obstacle1, obstacle2, obstaclesGroup;
var score=0;

function preload(){
  runner_running = loadAnimation("run1.png", "run2.png", "run3.png");
  ground_image = loadImage("ground.png");

  cloud1 = loadImage("cloud1.png");
  cloud2 = loadImage("cloud2.png");
  cloud3 = loadImage("cloud3.png");

  obstacle1 = loadImage("mushroom1.png");
  obstacle2 = loadImage("mushroom2.png");
}

function setup() {
  createCanvas(800,400);
  runner = createSprite(100, 320, 20, 50);
  runner.addAnimation("running", runner_running);
  runner.scale = 0.7;
  runner.setCollider("rectangle", 0, 0, 80, 120, 20);

  ground = createSprite(400, 380, 800, 20);
  ground.addImage(ground_image);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  ground.depth = runner.depth - 1;

  invisible_ground = createSprite(400, 390, 800, 20);
  invisible_ground.visible = false;

  runner.debug = true;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(7,0,88);  
  textSize(18)
  fill("white");
  text("Score: "+ score, 500,50);
  score = score + 1;
  if(keyDown("space") && runner.y >= 259) {
    runner.velocityY = -12;
  }

  runner.velocityY = runner.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  runner.collide(invisible_ground);

  if(runner.isTouching(obstaclesGroup)){
    noLoop();
    textSize(30);
    text("Game Over", 350, 200);
  }

  spawnClouds();
  spawnObstacles();
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 === 0){
    var cloud = createSprite(800,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: cloud.addImage(cloud1);
        break;
      case 2: cloud.addImage(cloud2);
        break;
      case 3: cloud.addImage(cloud3);
        break;
      default: break;
    }
    cloud.lifetime = 400;
    cloud.depth = runner.depth;
    runner.depth = runner.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(800,330,10,40);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      default: break;
    }
    obstacle.scale = 0.8;
    obstacle.lifetime = 420;
    obstacle.debug = true;
    obstaclesGroup.add(obstacle);
  }
}