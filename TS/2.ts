var list: number[] = [1, 2, 3]
let list1: Array<number> = [1, 2, 3];
let x: [string, number]
x = ['2', 2]
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(c)
function warnUser(): void {
    alert("This is my warning message");
}
let unusable: void = undefined;
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}