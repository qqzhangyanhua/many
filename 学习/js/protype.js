function fn(a, b) {
    console.log('this...', this)
    console.log(a)
    console.log(b);
}
const fn2 = fn.bind({
    a: 10
}, 20, 30)
console.log('fn2', fn2());