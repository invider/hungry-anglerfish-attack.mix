const backLayer = {
    DNA: 'Layer',
    Z:   5,

    fixCanvas() {
        return pin.backdrop.canvas
    },

    fixProgram() {
        this.glProg = pin.glProg.blur
    },
}
