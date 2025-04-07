let id = 0

class Fish extends LabFrame {

    constructor(st) {
        super( augment({
            name: 'fish' + (++id),
            x:     0,
            y:     0,
            w:     100,
            h:     40,
        }, st) )
    }

}
