const ex1 = p => {
  p.setup = function() {
    p.createCanvas(160, 80);
  };

  p.draw = function() {
    p.background('rgb(0,500,0)')
    p.ellipse(40, 39, 60, 60)
    p.rect(90, 10, 55, 55);
  };
};

new p5(ex1);

const ex2 = p => {
  p.setup = function() {
    p.createCanvas(200, 160);
  };

  p.draw = function() {
    p.background(255);
    
    p.noStroke();
    p.topCircleColor = p.color(255,0,0);
    p.topCircleColor.setAlpha(75);
    p.fill(p.topCircleColor);
    p.ellipse(100, 50, 90, 90);
    
    p.rightCircleColor = p.color(0,255,0);
    p.rightCircleColor.setAlpha(75);
    p.fill(p.rightCircleColor);
    p.ellipse(130, 100, 90, 90);
    
  
    p.leftCircleColor = p.color(0,0,255);
    p.leftCircleColor.setAlpha(75);
    p.fill(p.leftCircleColor);
    p.fill(p.leftCircleColor);
    p.ellipse(70, 100, 90, 90);
  };
};

new p5(ex2);

const ex3 = p => {
  p.setup = function() {
    p.createCanvas(160, 80);
  };
  
  p.draw = function() {
    p.background(0);
    p.fill('rgb(255,255,0)')
    p.arc(40, 40, 60, 60, p.PI + p.QUARTER_PI, p.PI - p.QUARTER_PI);
    p.fill('rgb(255, 0, 0)');
    p.rect(90, 10, 60, 60, 30, 30, 0, 0);
    p.fill('rgb(255, 255, 255)');
    p.noStroke();
    p.circle(105, 40, 20);
    p.circle(135, 40, 20);
    p.fill('rgb(0, 100, 255)')
    p.circle(105, 40, 12);
    p.circle(135, 40, 12);
  };
};

new p5(ex3);

const ex4 = p => {
  p.setup = function() {
    p.createCanvas(200, 200);
  };
  
  p.draw = function() {
    p.background(0, 0, 128);
    p.stroke(255, 255, 255);
    p.strokeWeight(2);
    p.fill('rgb(0,128,0)');
    p.circle(100, 100, 100);
    p.fill('rgb(255, 0, 0)');
    //star(100, 100, 30, 70, 5);
    p.beginShape();
    p.vertex(150, 80);
    p.vertex(110, 80);
    p.vertex(100, 45);
    p.vertex(90, 80);
    p.vertex(50, 80);
    p.vertex(80, 105);
    p.vertex(70, 145);
    p.vertex(100, 120);
    p.vertex(130, 145);
    p.vertex(120, 105);
    p.endShape();
  };
};

new p5(ex4);
