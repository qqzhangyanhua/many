/*****
 * 适配器模式
 */

class Adpet {
    comf() {
        return '德国插头'
    }
}
class China {
    constructor() {
        this.comf = new Adpet()
    }
    request() {
        let info = this.comf.comf()
        return `${info}--中国插头`
    }
}
let a = new China()
console.log(a.request());