const Z = 95

const B = 10

function draw() {
    if (!env.debugBuffers) return
    const portal = pin.backdrop

    const w = rx(.25)
    const h = ry(.25)
    const hb = ctx.width - w - B
    const vb = B
    smooth()
    image(portal.ctx.canvas, hb, vb, w, h)

    const vb2 = .5 * ctx.height - .5 * h
    image(portal.ctx.canvas, hb, vb2, w, h)
}
