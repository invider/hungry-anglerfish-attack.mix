const Z = 0

function draw() {
    ctx.clearRect(0, 0, ctx.width, ctx.height)

    stroke(.76, .4, .4)
    lineWidth(10)
    rect(0, 0, ctx.width, ctx.height)

    fill(.45, .5, .5)
    rect(100, 100, 20, 20)
}
