class Layer {

    constructor(st) {
        augment(this, {
            Z: 5,
            vertices: [
                // left triangle
                -1,  1,  0,
                 1,  1,  0,
                -1, -1,  0,

                // right triangle
                 1,  1,  0,
                -1, -1,  0,
                 1, -1,  0
            ],
            UVs: [
                // 1
                0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
                // 2
                1.0, 0.0, 0.0, 1.0, 1.0, 1.0,
            ],
        }, st)
    }

    init() {
        log('setting up buffers...')

        // vertices
        const verticeBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.vertices),
            gl.STATIC_DRAW
        )
        this.verticeBuffer = verticeBuffer

        // UVs
        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.UVs),
            gl.STATIC_DRAW,
        )
        this.textureCoordBuffer = textureCoordBuffer
    }

    fixTexture() {
        //return res.texture.compass.tid
        const tid = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tid)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pin.aqua.canvas)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.bindTexture(gl.TEXTURE_2D, null)
        this.fixedTexture = tid
        return tid
    }

    unfixTexture() {
        if (!this.fixedTexture) return
        gl.deleteTexture(this.fixedTexture)
    }

    draw() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.clearColor(.2, .2, .2, 1.0)
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
        //gl.useProgram(pin.glProg.main)

        const vertexPositionAttribute = gl.getAttribLocation(pin.glProg.main, 'aVertexPosition')
        gl.enableVertexAttribArray(vertexPositionAttribute)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticeBuffer)
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)

        const textureCoordAttribute = gl.getAttribLocation(pin.glProg.main, 'aTextureCoord')
        gl.enableVertexAttribArray(textureCoordAttribute)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer)
        gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)

        const samplerLocation = gl.getUniformLocation(pin.glProg.main, 'uSampler')

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0)
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.fixTexture())
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        // Prevents s-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        // Prevents t-coordinate wrapping (repeating).
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(samplerLocation, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6)

        this.unfixTexture()
    }
}
