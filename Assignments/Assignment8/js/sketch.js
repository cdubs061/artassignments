const synth = new Tone.Synth().toDestination();

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

let speed = "8n";
Tone.Transport.scheduleRepeat(repeat, speed);

function repeat(time) {
  let note = notes[Math.floor(Math.random() * notes.length)];
  synth.triggerAttackRelease(note, "8n", time);
}

let roachSheet;
let antSheet;

let squish = new Tone.Players({
  "squish": "assets/audio/squish.wav",
  "miss": "assets/audio/miss.wav"
});
let spriteSheetFilenames = ["roach.png", "ant.png"];
let spriteSheets = [];
let animations = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: GameState.Start};

function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/picture/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(400, 400);

  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(5,10);

  animations = [];
  for(let i=0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets),64,64,random(100,300),random(100,300),3,random(0.5,1),9,random([0,1]));
  }
}

function draw() {
  switch(game.state) {
    case GameState.Playing:
      background(220);
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score,20,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300,40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score,game.maxScore);
      Tone.Transport.stop();

      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",200,200);
      textSize(35);
      text("Score: " + game.score,200,270);
      text("Max Score: " + game.maxScore,200,320);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Bug Squish Game",200,200);
      textSize(30);
      text("Press Any Key to Start",200,300);
      break;
  }
  
}

function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      Tone.Transport.start();
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      Tone.Transport.start();
      break;
  }
}

function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      let score = game.score;
      for (let i=0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) {
          if (animations[i].moving != 0) {
            animations[i].stop();
            for (let i=0; i < animations.length; i++){
              animations[i].speed += 0.5;
            }
            squish.player("squish").toDestination().start();
            game.score++;
            let sprites = random(0,3);
            for(let i=0; i < sprites; i++) {
              animations.push(new WalkingAnimation(random(spriteSheets),64,64,random(50,400),random(50,400),3,random(0.5,1),9,random([0,1])));
            }
          }
        } 
      }
      if (score == game.score) {
        squish.player("miss").toDestination().start();
      }
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      Tone.Transport.start();
      break;
  }
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  draw() {

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx,this.dy);
    if (this.vertical)
      if(this.xDirection == 1)
        rotate(180);
      else
        rotate(0);
    else 
      if(this.xDirection == 1)
        rotate(90);
      else 
        rotate(270);
    scale(this.xDirection,1);
    
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw / 4,height - this.sw / 4);
    }
    else {
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw / 4,width - this.sw / 4);
    }
  }

  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 3;
  }
}