let started = false
let mic
let fft

let colorHue = 0
let waveform


function setup() {
  createCanvas(windowWidth,windowHeight)

  colorMode(HSB,360,100,100,100)
  background(0,0,0,100)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  
  background(colorHue,100,100,25)

  colorHue += 0.1
  colorHue %= 360

  if (started) drawFFT()

}

function drawFFT() {

  let spectrum = fft.analyze()
  waveform = fft.waveform(256)

  let offsetHue = (colorHue + 180) % 360

  let first=4
  let length = spectrum.length / 10
  let step = width / length
  for(let i=first; i<length; i++){
    let thisHue = (offsetHue + ((i/length) * 180)) % 360
    let r = i * step
    let l = log(spectrum[i])
    l *= l
    l *= 0.1
    value = l * l * 0.5
    value = (value > 2) ? value : 0
    strokeWeight(value*6.0)
    stroke(thisHue, 50, 100)
    if (i==first && value > 0) fill(thisHue, 50, 100)
    else noFill()

    /*
    beginShape()
    let angleStep = TWO_PI / waveform.length
    for(let j=0; j<waveform.length; j++) {
      let radian = j * angleStep
      let radius = (r*1.25) + (waveform[i] * 100)
      let x = width*0.5
      let y = height * 0.5
      x += sin(radian) * radius
      y += cos(radian) * radius
      vertex(x,y)
    }
    endShape(CLOSE)
    */

    circle(width*0.5,height*0.5,r*1.25)

  }
}

function mousePressed() {
  if (!started) startFFT()
}

function startFFT() {
  started = true
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT(0.7, 512)
  fft.setInput(mic)
}