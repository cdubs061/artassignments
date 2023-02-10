let x = 250;
let y = 250;
let color = "rgb(0, 0, 0)";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  //ellipse(mouseX, mouseY, 20, 20);
  noStroke();
  fill("rgb(255, 0, 0)");
  circle(25, 25, 25);
  fill("rgb(255, 140, 0)");
  circle(25, 75, 25);
  fill("rgb(255, 255, 0)");
  circle(25, 125, 25);
  fill("rgb(0, 255, 0)");
  circle(25, 175, 25);
  fill("rgb(0, 255, 255)");
  circle(25, 225, 25);
  fill("rgb(0, 0, 255)");
  circle(25, 275, 25);
  fill("rgb(255, 0, 255)");
  circle(25, 325, 25);
  fill("rgb(139, 69, 19)");
  circle(25, 375, 25);
  fill("rgb(255, 255, 255)");
  stroke(0);
  strokeWeight(2);
  circle(25, 425, 25);
  fill("rgb(0, 0, 0)");
  circle(25, 475, 25);
}

function mouseClicked() {
  if (mouseX < 50){
    if (mouseY < 50){
      color = "rgb(255, 0, 0)";
    } else if (mouseY < 100) {
      color = "rgb(255, 140, 0)";
    } else if (mouseY < 150) {
      color = "rgb(255, 255, 0)";
    } else if (mouseY < 200) {
      color = "rgb(0, 255, 0)";
    } else if (mouseY < 250) {
      color = "rgb(0, 255, 255)";
    } else if (mouseY < 300) {
      color = "rgb(0, 0, 255)";
    } else if (mouseY < 350) {
      color = "rgb(255, 0, 255)";
    } else if (mouseY < 400) {
      color = "rgb(139, 69, 19)";
    } else if (mouseY < 450) {
      color = "rgb(255, 255, 255)";
    } else if (mouseY < 500) {
      color = "rgb(0, 0, 0)";
    }
  }
}

function mouseDragged() {
  //fill(color);
  //noStroke();
  //circle(mouseX, mouseY, 10);
  stroke(color);
  strokeWeight(6);
  if (mouseX > 50){
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}