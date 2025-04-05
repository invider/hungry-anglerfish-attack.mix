const Z = 99

function draw() {
    const portal = mod['aqua-buf']

    const w = rx(.5)
    const h = ry(.5)
    const hb = (ctx.width - w)/2
    const vb = (ctx.height - h)/2
    smooth()
    image(portal.ctx.canvas, hb, vb, w, h)
}
