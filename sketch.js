var issImg, craftImg, moveRight, moveLeft, moveUp;
var bgImg;
var vel = 0;
var iss, craft, goal;

function preload() {
  bgImg = loadImage("images/spacebg.jpg");
  issImg = loadImage("images/iss.png");
  craftImg = loadImage("images/nthing.png");
  moveRight = loadImage("images/moveRight.png");
  moveLeft = loadImage("images/moveLeft.png");
  moveUp = loadImage("images/moveUp.png");
}

function setup() {
  createCanvas(800,800);

  iss = createSprite(400, 250, 10, 10);
  iss.addImage("intSS", issImg);
  iss.scale = 1;

  craft = createSprite(500, 700, 10, 10);
  // craft.debug = true;
  craft.setCollider("rectangle", 0, -250, 95, 100);
  craft.addImage("still", craftImg);
  craft.addImage("up", moveUp);
  craft.addImage("right", moveRight);
  craft.addImage("left", moveLeft);
  craft.scale = 0.2;

  goal = createSprite(331, 280, 10, 10);
}

function draw() {
  background(bgImg);

  craft.depth = iss.depth;
  iss.depth += 1;
  
  if (vel === 0) {

    if (keyWentDown("UP_ARROW")) {
      craft.changeImage("up");
      craft.velocityY -= 2;
    }else if (keyWentUp("UP_ARROW")) {
      craft.changeImage("still");
    }

    if (keyWentDown("LEFT_ARROW")) {
      craft.changeImage("left");
      craft.velocityX -= 2;
    }else if (keyWentUp("LEFT_ARROW")) {
      craft.changeImage("still");
    }

    if (keyWentDown("RIGHT_ARROW")) {
      craft.changeImage("right");
      craft.velocityX += 2;
    }else if (keyWentUp("RIGHT_ARROW")) {
      craft.changeImage("still");
    }

    if (keyWentDown("space")) {
      craft.changeImage("up");
      craft.velocityY += 1;
    }else if (keyWentUp("space")) {
      craft.changeImage("still");
    }

  }

  if (craft.y < 280) {
    vel = 1;

    craft.velocityX = 0;
    craft.velocityY = 0;

    fill('white')
    textSize(40);
    text("OOPS!! YOU CRASHED INTO THE ISS!!", 20, 700);
  }

  if (craft.velocityY < 0.3 && craft.isTouching(goal)) {
    craft.velocityX = 0;
    craft.velocityY = 0;

    vel = 2;

    fill('white');
    textSize(40);
    text("DOCKING SUCCESFULL", 200, 700);

  }else if (craft.velocityY > 0.3 && craft.isTouching(goal)) {
    vel = 1;

    craft.velocityX = 0;
    craft.velocityY = 0;

    fill('white')
    textSize(40);
    text("OOPS!! YOU CRASHED INTO THE ISS!!", 20, 700);
  }

  drawSprites();
}