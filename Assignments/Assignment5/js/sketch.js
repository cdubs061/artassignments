

let sounds = new Tone.Players({

  "fart": "audio/fart.wav",
  "wow": "audio/wow.mp3",
  "earbleed": "audio/earbleed.wav",
  "meow": "audio/meow.wav"

})

const dist = new Tone.Distortion(0.5);
//const chor = new Tone.Chorus(4, 2.5, 0.5)


let soundNames = ["fart", "wow", "earbleed", "meow"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(dist);
  dist.toDestination();
  //chor.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index*70, 10);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    dist.wet.value = dSlider.value();
    //chor.frequency.value = dSlider.value();
  })

  // fSlider = createSlider(0, 4, 0, 2);
  // fSlider.mouseReleased( () => {
  //   dist.oversample.value = fSlider.value();
  //   //chor.wet.value = fSlider.value()
  // })


}

function draw() {
  background(220, 120, 180);
  text('press the buttons for sound', 0, 150)

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}