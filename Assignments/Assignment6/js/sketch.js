const synth = new Tone.FMSynth({
  harmonicity: 3.9,
  modulationIndex: 30,
  detune: 0,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.2,
    release: 1.2
  },
  modulation: {
    type: "square"
  },
  modulationEnvelope: {
    attack: 0.2,
    decay: 0.01,
    sustain: 1,
    release: 0.5
  }
})

const reverb = new Tone.Reverb({
  decay: 3,
  wet: 0.5
}).toDestination();

const filter = new Tone.Filter({
  type: 'lowpass',
  frequency: 8000,
  rolloff: -12,
  Q: 1,
}).toDestination();


let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(400, 400);
  synth.toDestination();
  synth.connect(reverb);
  synth.connect(filter);

  Slider = createSlider(0, 15000, 8000, 500);
  Slider.mouseReleased( () => {
    filter.frequency.value = Slider.value();
  })

  Slider2 = createSlider(0, 100, 0, 1);
  Slider2.mouseReleased(() => {
    synth.modulationIndex.value = Slider2.value();
  });
}

function draw() {
  background(220);
}

function keyPressed() {
  let whatNote = notes[key]
  // console.log(whatNote);
  synth.harmonicity.value = 0.3;
  synth.triggerAttackRelease(whatNote, "8n");
}