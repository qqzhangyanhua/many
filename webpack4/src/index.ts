import { log } from "util"

// let num: number = 888

// document.title = 'ming'
// console.log('数字', num);
// function greeter(person: string) {
//     return "Hello, " + person;
// }

// let user = "Jane User";

// document.body.innerHTML = greeter(user);

// interface person {
//     fisterName: string,
//     lasterName: string
// }
// function addName(person: person) {
//     return `Hello${person.fisterName}world${person.lasterName}`
// }
// let user = {
//     fisterName: 'zhangsan',
//     lasterName: 'lisi'
// }
// document.body.innerHTML = addName(user)

// class Students {
//     fullName: string;
//     constructor(public fisterName: string, public content: string, public lasterName: string) {
//         this.fullName = `hello${fisterName}`
//     }

// }
// interface person {
//     fisterName: string,
//     lasterName: string
// }
// function greeter(person: person) {
//     return "Hello1111, " + person.fisterName + " " + person.lasterName;
// }

// let user = new Students("Jane", "M.", "User");
// document.body.innerHTML = greeter(user);

// let isDone: boolean = false;
// let list: number[] = [1, 2, 3]
// let x: [string, number]
// x = ['2222', 333]
// console.log(x[0].substr(1)); 

//枚举一个类型
// enum Color { Green, Yellow, Blue }
// let c: Color = Color.Yellow
// console.log(c);

// let notSure: any = 4;
// notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

//void没有任何返回值
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
// function warnUser(): void {
//     alert("This is my warning message");
// }


// 返回never的函数必须存在无法达到的终点
// function error(message: string): never {
//     throw new Error(message);
// }

// // 推断的返回值类型为never
// function fail() {
//     return error("Something failed");
// }

// // 返回never的函数必须存在无法达到的终点
// function infiniteLoop(): never {
//     while (true) {
//     }
// }

//类型断言
// let someValue: string = "this is a string";

// let strLength: number = (<string>someValue).length;
// console.log(strLength);
// let someValue: any = "this is a string";

// let strLength: number = (someValue as string).length;

// //类型
// function printLabel(labelledObj: { label: string }) {
//     console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);
// interface LabelledValue {
//     label: string;
// }

// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);



//可选属性
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "white", area: 100 };
//     if (config.color) {
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }

// let mySquare = createSquare({ color: "black", width: 100 });

// console.log(mySquare);


//只读属性
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let a: number[] = [1, 2, 3, 4];
// let ro: ReadonlyArray<number> = a;  //数组readonly
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!

// interface SquareConfig {
//     color?: string;
//     width?: number;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//     let newSquare = { color: "white", area: 100 };
//     if (config.color) {
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }


// let mySquare = createSquare({ color: "red", width: 100 });



//可索引的类型
// interface StringArray {
//     [index: number]: string;
// }

// let myArray: StringArray;
// myArray = ["Bob", "Fred"];

// let myStr: string = myArray[0]
// console.log(myStr)


// interface ClockConstructor {
//     new(hour: number, minute: number): ClockInterface;
// }
// interface ClockInterface {
//     tick(): any
// }

// function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
//     return new ctor(hour, minute);
// }

// class DigitalClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("beep beep");
//     }
// }
// class AnalogClock implements ClockInterface {
//     constructor(h: number, m: number) { }
//     tick() {
//         console.log("tick tock");
//     }
// }

// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 32);
// console.log(analog)


//类
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// let greeter = new Greeter("world");

//类继承
// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`);
//     }
// }

// class Dog extends Animal {
//     bark() {
//         console.log('Woof! Woof!');
//     }
// }

// const dog = new Dog();
// dog.bark();
// dog.move(10);
// dog.bark();


//复杂的继承
// class Animal {
//     name: string;
//     constructor(theName: string) { this.name = theName; }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }

// class Snake extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 5) {
//         console.log("Slithering.1..");
//         super.move(distanceInMeters);
//     }
// }

// class Horse extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 45) {
//         console.log("Galloping...");
//         super.move(distanceInMeters);
//     }
// }

// let sam = new Snake("Sammy the Python");
// let tom: Animal = new Horse("Tommy the Palomino");

// sam.move();
// tom.move(34)


//构造函数也可以被标记成protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如，

// class Animal {
//     constructor(private name: string) { }
//     move(distanceInMeters: number) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }
// let dd = new Animal('dog')
// console.log(dd.move(33))

// class Grid {
//     static origin = { x: 0, y: 0 };
//     calculateDistanceFromOrigin(point: { x: number; y: number; }) {
//         let xDist = (point.x - Grid.origin.x);
//         let yDist = (point.y - Grid.origin.y);
//         return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
//     }
//     constructor(public scale: number) { }
// }

// let grid1 = new Grid(1.0);  // 1x scale
// let grid2 = new Grid(5.0);  // 5x scale

// console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));


// let myAdd: (baseValue: number, increment: number) => number =
//     function (x: number, y: number): number { return x + y; };



// let myAdd = function (x: number, y: number): number { return x + y; };


// let myAdd: (baseValue: number, increment: number) => number =
//     function (x, y) { return x + y; };
// console.log(myAdd(2, 3))

//用？代替参数可传可不传
// function buildName(firstName: string, lastName?: string) {
//     if (lastName)
//         return firstName + " " + lastName;
//     else
//         return firstName;
// }

// let result1 = buildName("Bob");  // works correctly now
// //let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result3 = buildName("Bob", "Adams");  // ah, just right

// console.log(result1, result3)


// function buildName(firstName: string, lastName = "Smith") {
//     return firstName + " " + lastName;
// }

// let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
// let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
// console.log(result2)
// //let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
// let result4 = buildName("Bob", "Adams");         // ah, just right

// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function () {
//         let that = this
//         return function () {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);

//             return { suit: that.suits[pickedSuit], card: pickedCard % 13 };
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);


// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function () {
//         // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);

//             return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// function f(this: void) {
//     // make sure `this` is unusable in this standalone function
// }



interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);