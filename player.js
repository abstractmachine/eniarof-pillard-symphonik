
function setupPlayer() {



}

function drawPlayer() {

    if (Number.isFinite(plot)) {
        playerAngle = noise(frameCount * playerRotationSpeed) * 5.0
    }

    push()

    let range = 128
    let depth = (height * 0.25) + (noise((frameCount * playerDepthSpeed)) * range)

    translate(width*0.5,height*0.5)
    rotate(playerAngle)
    translate(0,depth)

    let length = 25

    stroke(playerColor)
    strokeWeight(2)
    line(0,0,length,length)
    line(0,0,-length,length)

    pop()

    // calculate x,y position
    playerX = (width * 0.5) + (sin(-playerAngle) * (depth+(length*0.75)) )
    playerY = (height* 0.5) + (cos(-playerAngle) * (depth+(length*0.75)) )

    //stroke(0,100,100)
    //strokeWeight(2)
    //noFill()
    //circle(playerX, playerY, 50)

}