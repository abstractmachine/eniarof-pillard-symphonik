let started = false
let colorHue = 0
let offset = 0
let mic, fft, spectrum, waveform, beat, binCount = 64
let rings = []
let speed = 1.0
let startSize = 32
let ringStep
let playerAngle = 0
let centroid, plot
let asteroids = []
let playerX = -666, playerY = -666
let proximityAlert = 50
let playerDiameter = 50
let playerDepthSpeed = 0.02
let playerRotationSpeed = 0.01
let playerColor, asteroidColor, waveColor, backgroundColor

function setup() {

	createCanvas(windowWidth, windowHeight)

	colorMode(HSB, 360, 100, 100, 100)
	background(0, 0, 0, 100)

	setupRings()
	setupPlayer()

	playerColor = color(60, 100, 100)
	asteroidColor = color(60, 100, 100)
	waveColor = color(0, 0, 100, 100)
	backgroundColor = color(0, 0, 0, 100)

}

function windowResized() {

	ringStep = (height / binCount) * 2.15
	resizeCanvas(windowWidth, windowHeight)
	for (let i = 0; i < binCount; i++) {
		radius = startSize + (i * ringStep)
		rings[i].setRadius(radius)
	}

}

function draw() {

	background(backgroundColor)

	if (started) {
		analyzeFFT(binCount)
		// drawWave(waveform,100,64,12)
		// drawFFT()
		for (let i = 0; i < rings.length; i++) {
			rings[i].draw()
		}
	}

	drawPlayer()
	drawAsteroids()

}

function mousePressed() {
	if (!started) setupFFT()
}

function setupRings() {

	ringStep = (height / binCount) * 2.15

	for (let i = 0; i < binCount; i++) {
		radius = startSize + (i * ringStep)
		rings.push(new Ring([], i, radius))
	}

}
