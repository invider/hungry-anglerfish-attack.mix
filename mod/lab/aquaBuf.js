const Z = 99

const B = 10

function draw() {
    const portal = pin.aqua

    const w = rx(.25)
    const h = ry(.25)
    const hb = ctx.width - w - B
    const vb = ctx.height - h - B
    smooth()
    image(portal.ctx.canvas, hb, vb, w, h)
}
