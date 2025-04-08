const backLayer = {
    DNA: 'Layer',
    Z:   5,

    lightRangeRel: [ .5, .7 ],

    fixCanvas() {
        return pin.backdrop.canvas
    },

    fixProgram() {
        this.glProg = pin.glProg.blur
    },

    fixUniforms() {
        const lx = rx(.5),
              ly = ry(.5)

        const lightFactor2 = 1 + .05 * cos(1.1 * env.time)

        gl.uniform2f( gl.getUniformLocation(this.glProg, 'lightPos2'), lx, ly )
        gl.uniform2f( gl.getUniformLocation(this.glProg, 'lightRange'),
            rx( this.lightRangeRel[0] ),
            ry( this.lightRangeRel[1] * lightFactor2 ),
        )
    }
}
