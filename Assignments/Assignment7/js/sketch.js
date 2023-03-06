let initTone = true;
let img;
let x = 0;

const metalSynth = new Tone.FMSynth({
  harmonicity: 1.5,
  modulationIndex: 15,
  detune: 0,
  oscillator: {
    type: "sawtooth"
  },
  envelope: {
    attack: 0.4,
    decay: 0.4,
    sustain: 0,
    release: 0.9
  },
  modulation: {
    type: "triangle"
  },
  modulationEnvelope: {
    attack: 0.05,
    decay: 0.1,
    sustain: 0.1,
    release: 0.5
  }
}).toMaster();

let noise = new Tone.Noise("brown").start();

let noiseFilter = new Tone.Filter({
  type: "highpass",
  frequency: 1800,
  rolloff: -12,
  Q: 1
}).toMaster();

let noiseEnv = new Tone.Envelope({
  attack: 0.5,
  decay: 0.05,
  sustain: 0,
  release: 0.2
}).connect(noiseFilter.frequency);

function preload() {
  img = loadImage("lightsaber.png"); //spaceSword.webp
}

function setup() {
  createCanvas(400, 400);
  image(img, 0, 0, 400, 400);
}

function draw() {
  background(220);
  if (mouseIsPressed === true) {
    image(img, 0, 0, 0, 0);
  }
  
  if ((frameCount % 60) === 0) {
    pitch = random(300, 1000);
  }
  text('press spacebar to initialize audio!', 100, 100);
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  metalSynth.triggerAttackRelease("G2");
  noiseEnv.triggerAttack();
}