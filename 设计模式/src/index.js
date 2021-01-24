/*****
 * @authorz 面向对象
 */

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`i am eat${this.name}`);

    }
    speak() {
        console.log(`i am speak ${this.age} old`);

    }
}
class Students extends Person {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }
    study() {
        console.log(`我是${this.name}我的学号是${this.number}`)
    }
}
let zhangsan = new Students('zhangsan', 14, 123)
zhangsan.eat()
zhangsan.study()