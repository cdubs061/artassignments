let spriteSheet;
let meatBoy;

let walkingAnimation;
let walkingAnimation2;

function preload() {
  spriteSheet = loadImage("assets/SpelunkyGuy.png");
  meatBoy = loadImage("assets/MeatBoy.png");
}

function setup() {
  createCanvas(600, 500);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet,80,80,100,300,9);
  meatBoyAnimation = new WalkingAnimation(meatBoy,80,80,300,65,9);
}

function draw() {
  background('rgb(135,206,235)');

  stroke(255,87,51);
  strokeWeight(6);
  line(30,100,500,100);
  stroke(0,255,0);
  line(30,335,500,335);
  line(30,235,500,235);
  
  walkingAnimation.draw();
  walkingAnimation2.draw();
  meatBoyAnimation.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyPressed(LEFT_ARROW,RIGHT_ARROW);
  meatBoyAnimation.keyPressed(RIGHT_ARROW,LEFT_ARROW);
}

function keyReleased() {
  walkingAnimation.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyReleased(LEFT_ARROW,RIGHT_ARROW);
  meatBoyAnimation.keyReleased(RIGHT_ARROW,LEFT_ARROW);
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, offsetX=0, offsetY=0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  draw() {

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx,this.dy);
    scale(this.xDirection,1);
  
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }
  
    this.dx += this.moving;
  }

  keyPressed(right, left) {
    if (keyCode === right) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    } else if (keyCode === left) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased(right,left) {
    if (keyCode === right || keyCode === left) {
      this.moving = 0;
    }
  }
}