const Z = 5

function init() {
    log('initializing scene')
}

function setup() {
    log('setting up buffers')
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
}

function draw() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(.2, .2, .2, 1.0)
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
    gl.useProgram(pin.glProg.main)

    const vertexPositionAttribute = gl.getAttribLocation(pin.glProg.main, 'aVertexPosition')
    gl.enableVertexAttribArray(vertexPositionAttribute)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesVerticeBuffer)
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

