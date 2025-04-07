const Fish = require('/mod/aqua-buf/dna/Fish')

class Anglerfish extends Fish {

    constructor(st) {
        super( augment({
            name: 'anglerfish',
            w:     525,
            h:     422,
        }, st) )
    }

    draw() {
        save()
        translate(this.x, this.y)
        super.draw()

        ctx.angler = 'ANGLER'
        image(res.anglerfish, -.5 * this.w, -.5 * this.h, this.w, this.h)

        restore()
    }
}
