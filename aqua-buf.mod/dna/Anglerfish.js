const Fish = require('/mod/aqua-buf/dna/Fish')

class Anglerfish extends Fish {

    constructor(st) {
        super( augment({
            name: 'anglerfish',
            r:     100,
            w:     525,
            h:     422,
        }, st) )
    }

    draw() {
        const { x, y, w, h, r } = this

        const aspect = 2*r / w,
              sh = ry(.003) / aspect,
              dx = sh * cos($.env.time),
              dy = 1.5 * sh * cos(1.3 * $.env.time)

        save()
        translate(x + dx, y + dy)
        scale(aspect, aspect)

        super.draw()

        ctx.angler = 'ANGLER'
        image(res.anglerfish, -.5*w, -.5*h, w, h)

        fill('#ffffff')
        circle(.30*r, -.33*r, .3*r)

        fill('#ffffa0')
        circle(2.4*r, -.65*r, .2*r)

        restore()

        //lineWidth(2)
        //stroke('#ffff00')
        //circle(this.x, this.y, this.r)
    }
}
