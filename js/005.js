// 柯里化函数的构造方法
function curry(fn) {
    // 缓存除第一个参数的所有参数
    let args = [].slice.call(arguments, 1);
    let _fn = function () {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            args.push(...arguments);
            return _fn
        }
    }
    return _fn
}

function add() {
    return [].reduce.call(arguments, (a, b) => a + b)
}
console.log(curry(add, 2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)()) // 133
console.log(curry(add, 100, 1, 2, 3, 4)())