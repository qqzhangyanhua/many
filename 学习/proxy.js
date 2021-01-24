// let data = [1, 2, 3, 6]
// let p = new Proxy(data, {
//     get(target, key) {
//         console.log('获取值:', key)
//         return target[key]
//     },
//     set(target, key, value) {
//         console.log('修改值:', key, value)
//         target[key] = value
//         return true
//     }
// })
// p.push(4)

// var handler = {
//     get: function (target, name) {
//         if (name === 'prototype') {
//             return Object.prototype;
//         }
//         return 'Hello, ' + name;
//     },

//     apply: function (target, thisBinding, args) {
//         return args[1];
//     },

//     construct: function (target, args) {
//         return {
//             value: args[1]
//         };
//     }
// };

// var fproxy = new Proxy(function (x, y) {
//     return x + y;
// }, handler);

// // 1
// console.log(fproxy(1, 2));

// console.log(new fproxy(1, 2)); // {value: 2}
// fproxy.prototype === Object.prototype // true
// fproxy.foo === "Hello, foo" // true

// let data = {
//     a: 1
// }
// let p = new Proxy(data, {
//     get(target, key) {
//         console.log('获取值:', key)
//         return target[key]
//     },
//     set(target, key, value) {
//         console.log('修改值:', key, value)
//         target[key] = value
//         return true
//     }
// })
// console.log(p);


// let data = [1, 2, 3]
// let p = new Proxy(data, {
//     get(target, key) {
//         console.log('获取值:', key)
//         return Reflect.get(target, key)
//     },
//     set(target, key, value) {
//         console.log('修改值:', key, value)
//         return Reflect.set(target, key, value)
//     }
// })
// p.push(4)



let data = {
    name: {
        title: 'zhuanzhuan'
    }
}
let p = new Proxy(data, {
    get(target, key) {
        console.log('获取值:', key)
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        console.log('修改值:', key, value)
        return Reflect.set(target, key, value)
    }
})
p.name.title = 'xx'