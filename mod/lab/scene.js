const Z = 5

function init() {
    log('initializing scene')
}

function setup() {
    log('setting up buffers...')

    // vertices
    const triangleVertices = [
        // left triangle
        -0.5, 0.5, 0.0,
         0.0, 0.0, 0.0,
        -0.5, -0.5, 0.0,

        // right triangle
        0.5, 0.5, 0.0,
        0.0, 0.0, 0.0,
        0.5, -0.5, 0.0
    ]
    const trianglesVerticeBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)
    this.trianglesVerticeBuffer = trianglesVerticeBuffer

    // UVs
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = [
        // 1
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        // 2
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
    ]

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoordinates),
        gl.STATIC_DRAW,
    )

    this.textureCoordBuffer = textureCoordBuffer
}

function draw() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(.2, .2, .2, 1.0)
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
    gl.useProgram(pin.glProg.main)

    gl.bindTexture(gl.TEXTURE_2D, res.texture.compass.tid)
    // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Prevents s-coordinate wrapping (repeating).
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    // Prevents t-coordinate wrapping (repeating).
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)


    const vertexPositionAttribute = gl.getAttribLocation(pin.glProg.main, 'aVertexPosition')
    gl.enableVertexAttribArray(vertexPositionAttribute)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer)
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)

    const textureCoordAttribute = gl.getAttribLocation(pin.glProg.main, 'aTextureCoord')
    gl.enableVertexAttribArray(textureCoordAttribute)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer)
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0)

    const samplerLocation = gl.getUniformLocation(pin.glProg.main, 'uSampler')

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0)
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, res.texture.compass.tid)
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(samplerLocation, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

