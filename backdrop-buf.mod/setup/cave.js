const Z = 11

function cave() {
    lab.spawn( dna.Cave, {
        Z:      101,
        x:      0,
        y:      0,
        rh:    .5,
        color: '#004938',
        speed:  rx(.012),
    })
    lab.spawn( dna.Cave, {
        Z:      111,
        x:      0,
        y:      0,
        rh:    .3,
        color: '#012518',
        speed:  rx(.015),
    })
    lab.spawn( dna.Cave, {
        Z:      121,
        x:      0,
        y:      0,
        rh:    .15,
        color: '#010d0d',
        speed:  rx(.025),
    })

    lab.spawn( dna.Cave, {
        Z:      102,
        x:      0,
        y:      0,
        rh:    .4,
        flip:   true,
        color: '#012520',
        speed:  rx(.015),
    })
    lab.spawn( dna.Cave, {
        Z:      112,
        x:      0,
        y:      0,
        rh:    .3,
        flip:   true,
        color: '#001512',
        speed:  rx(.035),
    })
    lab.spawn( dna.Cave, {
        Z:      122,
        x:      0,
        y:      0,
        rh:    .2,
        flip:   true,
        color: '#010d0d',
        speed:  rx(.07),
    })
}
