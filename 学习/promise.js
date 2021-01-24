class point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toing() {
        return `${this.x}+${this.y}`
    }
}
let p = new point('xxxxxx', 'sssssssss')
console.log(p.toing())