const Z = 99

function draw() {
    const portal = pin.aqua

    const w = rx(.4)
    const h = ry(.4)
    const hb = (ctx.width - w)/2
    const vb = (ctx.height - h)/2
    smooth()
    image(portal.ctx.canvas, hb, vb, w, h)
}
