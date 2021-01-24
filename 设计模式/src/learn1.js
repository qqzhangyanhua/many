/*********
 * 设计模式试题
 * 工厂模式
 */
//出租车=>快车，专车 

class Car {
    constructor(number, name) {
        this.name = name
        this.number = number
    }
    start() {
        let timer = new Date()
        console.log(`交通工具${this.name}开始行程了${timer}`)
    }
    end() {

    }
}
class Kuaiche extends Car {
    constructor(number, name, ) {
        super(number, name)

    }
}
class Trip {
    constructor(car) {
        this.car = car
    }
    comp() {
        console.log(`行程结束${this.car.name}`)
    }
}
let car = new Car(100, '快车')
let trip = new Trip(car)
trip.comp()