const Fish = require('/mod/aqua-buf/dna/Fish')

class Anglerfish extends Fish {

    constructor(st) {
        super( augment({
            name: 'anglerfish',
            r:     75,
            w:     525,
            h:     422,
        }, st) )
    }

    draw() {
        save()
        translate(this.x, this.y)
        const aspect = 2*this.r / this.w
        scale(aspect, aspect)

        super.draw()

        const sh = ry(.01) / aspect,
              dx = sh * cos($.env.time),
              dy = 1.5 * sh * cos(1.3 * $.env.time)

        ctx.angler = 'ANGLER'
        image(res.anglerfish, -.5 * this.w + dx, -.5 * this.h + dy, this.w, this.h)

        restore()

        //lineWidth(2)
        //stroke('#ffff00')
        //circle(this.x, this.y, this.r)
    }
}
