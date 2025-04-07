const Z = 11

function cave() {
    lab.spawn( dna.Cave, {
        Z:      101,
        x:      0,
        y:      0,
        color: '#004938',
    })
    lab.spawn( dna.Cave, {
        Z:      102,
        x:      0,
        y:      0,
        flip:   true,
        color: '#010d0d',
    })
}
