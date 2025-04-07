let id = 0

class Fragment {

    constructor(st) {
        extend(this, {
            prev:   null,
            x:      0,
            y:      0,
            w:      50 + rnd() * 150,
        }, st)

        let firstP
        if (this.prev) {
            firstP = [ this.x, this.prev.lastCP()[1] ]
        } else {
            firstP = [ this.x, rnd()]
        }
        const lastP = [ this.x + this.w, rnd() ]

        const cp = []

        log('starting fracture at: ' + firstP[0])
        this.fracture(firstP, lastP, 3, cp)
        cp.push(lastP)
        log('ending fracture at: ' + lastP[0])

        this.cp = cp
    }

    fracture(fp, lp, iter, cp) {
        const mp = [ fp[0] + .5*(lp[0] - fp[0]), fp[1] + rnd() * (lp[1] - fp[1]) ]
        log('midpoint @' + mp[0])

        if (iter > 0) {
            this.fracture(fp, mp, iter - 1, cp)
            this.fracture(mp, lp, iter - 1, cp)
        } else {
            log('bottom left: ' + fp[0] + ' -> ' + mp[0])
            cp.push(fp)
            cp.push(mp)
        }
    }

    lastCP() {
        return this.cp[this.cp.length - 1]
    }

    rightEdge() {
        return this.x + this.w
    }

    draw() {
        // trace outline
        //lineWidth(1)
        //stroke('#ffff00')
        //rect(this.x, this.y, this.w, this.h)

        const h = this.__.h
        moveTo(this.x, this.y*h)
        let p
        for (let i = 0; i < this.cp.length; i++) {
            p = this.cp[i]
            lineTo(p[0], p[1]*h)
        }
        lineTo(p[0], this.y*h)
        closePath()
        fill(this.__.color)
        shape()
    }
}

class Cave {

    constructor(st) {
        augment(this, {
            name:      'cave' + (++id),
            x:          0,
            y:          0,
            rh:         .2,
            color:     '#8080ff',
            fragments:  [],
        }, st)

        this.expandRange()
    }

    expandRange() {
        let prev
        if (this.fragments.length > 0) prev = this.fragments[ this.fragments.length - 1 ]

        let x = 0, y = 0
        if (prev) {
            x = prev.x + prev.w - 2
            y = prev.y
        }
        this.fragments.push( new Fragment({
            __: this,
            prev,
            x,
            y,
            h: this.h,
        }))
    }

    lastFragment() {
        return this.fragments[ this.fragments.length - 1 ]
    }

    rightEdge() {
        return this.x + ctx.width
    }

    evo(dt) {
        if (this.lastFragment().rightEdge() < this.rightEdge()) {
            this.expandRange()
        }
    }

    draw() {
        save()
        if (this.flip) {
            translate(this.x, this.y + ctx.height)
            scale(1, -1)
        } else {
            translate(this.x, this.y)
        }

        this.h = ry(this.rh)
        this.fragments.forEach(f => f.draw())

        restore()
    }
}
