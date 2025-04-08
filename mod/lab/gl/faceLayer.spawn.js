const faceLayer = {
    DNA: 'Layer',
    Z:   7,
    scale:  1,
    hidden: false,

    fixProgram() {
        this.glProg = pin.glProg.basic
    },

    fixUniforms() {
        gl.uniform2f( gl.getUniformLocation(this.glProg, 'lightPos2'), 250.0, 250.0 )
        gl.uniform2f( gl.getUniformLocation(this.glProg, 'lightRange'), 500.0, 750.0 )
    }
}
