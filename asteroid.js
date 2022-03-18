
function setupAsteroids() {

}


function drawAsteroids() {

	for(let i=0; i<asteroids.length; i++) {
		asteroids[i].draw()
	}

	removeAsteroids()
	detectAsteroids()

}


function removeAsteroids() {

	for(let i=asteroids.length-1; i>=0; i--) {
		if (asteroids[i].zombie()) {
			asteroids.splice(i,1)
		}
	}

}


function detectAsteroids() {

	let crashing = false

	for(let i=0; i<asteroids.length; i++) {
		if (asteroids[i].proximity(playerX, playerY) < proximityAlert) {
			crashing = true
			break
		}
	}

	if (crashing) {
		playerColor = color(0, 0, 0, 100)
		asteroidColor = color(0, 0, 0, 100)
		waveColor = color(0, 0, 0, 100)
		backgroundColor = color(60, 100, 100, 100)
	} else {
		playerColor = color(60, 100, 100, 100)
		asteroidColor = color(60, 100, 100, 100)
		waveColor = color(0, 0, 100, 100)
		backgroundColor = color(0, 0, 0, 100)
	}

}


function shootAsteroid() {
	asteroids.push(new Asteroid())
}


class Asteroid {

	constructor() {

		this.x = width * 0.5
		this.y = height * 0.5
		this.radians = random(TWO_PI)
		this.speed = random(1, 4)

	}

	zombie() {
		return this.x < -width*0.1 || this.x > width*1.1 || this.y < -height*0.1 || this.y > height*1.1
	}

	proximity(x, y) {
		return dist(this.x, this.y, x, y)
	}

	draw() {

		this.x += sin(this.radians) * this.speed
		this.y += cos(this.radians) * this.speed

		strokeWeight(1.5)
		stroke(asteroidColor)

		let resolution = 8
		let base = 16
		let spread = 16

		push()

		translate(this.x, this.y)
		rotate(radians(this.x + this.y) * 1.0)

		let length = waveform.length / 2

		beginShape()
		for (let i = 0; i < length; i++) {

			let vertexRadians = (i * TWO_PI) / length
			// uglify the value
			let value = Math.trunc(waveform[i] * resolution) / (resolution * 1.0)
			//let value = waveform[i]
			let distance = base + (spread * value)

			let xVertex = sin(vertexRadians) * distance
			let yVertex = cos(vertexRadians) * distance
			vertex(xVertex, yVertex)

			i += 16

		}
		endShape(CLOSE)

		pop()
		
	}

}