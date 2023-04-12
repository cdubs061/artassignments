var serial;
let sensorValue = 0;
let color = 0;
let reader, writer;
const encoder = new TextEncoder();
const decorder = new TextDecoder();

function setup() {
  createCanvas(400, 400);
  if ("serial" in navigator) {
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);
  }
}

function mousePressed() {
  if (writer) {
    const data = new Uint8Array([1]); 
    writer.write(data);
  }
}

function mouseReleased() {
  if (writer) {
    const data = new Uint8Array([0]); 
    writer.write(data);
  }
}

async function gotData() {  
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log('Serial port closed');
        reader.releaseLock();
        break;
      }
      console.log(`Received byte: ${value}`);
      color = parseInt(value);
    }
  } catch (error) {
    console.error(`Serial error: ${error}`);
  }       
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .getReader();
}

function draw() {
  requestAnimationFrame(draw);
  background(color);
  print(color);
  if (reader) {
    gotData();
  }
}