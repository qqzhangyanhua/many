// class Student {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     sayHi() {
//         console.log(`myname${this.name}我${this.age}`)
//     }
// }
// const xia = new Student('xialuo', 13)
// xia.sayHi()

class Peonle {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name}eat======`)
    }
}
class Student extends Peonle {
    constructor(name, age) {
        super(name)
        this.age = age
    }
    sayHi() {
        console.log(`${this.name}say hi age ${this.age}`)
    }
}
const xiaoming = new Student('xiaoming', 16)
xiaoming.eat()
xiaoming.sayHi()