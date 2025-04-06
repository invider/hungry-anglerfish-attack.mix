const Z = 101

let x = rx(.5),
    y = ry(.5),
    dx = 0,
    dy = 0,
    timer = 0,
    speed = ry(.07)

function evo(dt) {
    x += dx * dt
    y += dy * dt

    timer -= dt
    if (timer < 0) {
        timer = 1 + 2*rnd()
        const a = math.rnda()
        dx = cos(a) * speed
        dy = sin(a) * speed
    }
}

function draw() {
    fill('#008e6a')
    circle(x, y, 5)
}
