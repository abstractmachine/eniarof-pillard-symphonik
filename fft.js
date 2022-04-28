let waveformLength = 128


function setupAudio() {
  mic = new p5.AudioIn()
  mic.start()
}
  

function setupFFT() {
  started = true
  fft = new p5.FFT(0.05, 512)
  fft.setInput(mic)
  beat = new p5.PeakDetect(20,20000,0.1,10)
  //beat = new p5.PeakDetect()
  beat.onPeak(beatDetected)
  console.log("FFT Started")
}


function analyzeFFT() {

  spectrum = fft.analyze()
  beat.update(fft)
  waveform = fft.waveform(waveformLength)

  // correct first and last
  waveform[waveformLength-1] = (waveform[0] + waveform[waveformLength-1]) / 2

  let nyquist = 22050
  centroid = fft.getCentroid()
  let meanFrequency = centroid / (nyquist / binCount)
  plot = map(log(meanFrequency), 0, log(binCount), 0.0, 100.0)

}


function beatDetected() {
  shootAsteroid()
}


function drawWave(wave, couleur, radius = 50, spread=64, resolution=12) {

  //stroke(0, 0, 0, 100)
  stroke(couleur)
  noFill()

  let angleStep = TWO_PI / waveformLength
  let multiplier = 1.0

  beginShape()
  for (let i = 0; i < waveformLength; i+=4) {

    let radian = i * angleStep
    // uglify the value
    let value = Math.trunc(wave[i]*resolution) / (resolution * 1.0)
    let distance = radius + ((value * spread) * multiplier)

    let x = width * 0.5
    let y = height * 0.5
    x += sin(radian) * distance
    y += cos(radian) * distance
    vertex(x,y)

  }
  endShape(CLOSE)

}



function getFrequency(index) {

  let step = width / binCount
  let r = index * step
  let l = log(spectrum[index])
  l *= (l * 0.1)
  let value = l * l * 0.5
  value = (value > 2) ? value : 0
  return value

}



function drawFFT() {

  let first = 4
  let length = spectrum.length / 10
  let step = width / length
  for (let i = first; i < length; i++) {

    let value = getFrequency(i)

    strokeWeight(value * 1)
    stroke(0, 100, 100, 100)
    noFill()
    circle(width * 0.5, height * 0.5, r * 1.25)

  }

}


