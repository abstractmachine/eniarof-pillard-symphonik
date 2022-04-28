class Ring {

    constructor(wave, index, radius) {
        this.index = index
        this.radius = radius
        this.spread = 16// 16
        this.resolution = 12
        this.wave = wave
        this.first = true
    }

    draw() {

        this.radius += speed

        if (this.radius > width) {
            this.radius = startSize
            this.wave = waveform
            this.first = false
        }

        let dist = map(this.radius, 0, 300, 0, 100)
        let couleur = waveColor
        couleur.alpha = dist
        let value = getFrequency(this.index) * amplifier
        let spread = this.spread * value * spreadMultiplier

        //strokeWeight(value * 0.5)
        if (value > 1) {
            strokeWeight(2)
        } else {
            strokeWeight(0.01)
        }

        if (this.first) return

        if (this.wave.length > 0) {
            drawWave(this.wave, couleur, this.radius, spread, this.resolution)
        }
        else {
            drawWave(waveform, couleur, this.radius, spread, this.resolution)
        }

        

    }


    setRadius(radius) {
        this.radius = radius
    }

}