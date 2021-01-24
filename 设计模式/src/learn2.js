/****
 * 单列模式
 */

class Sun {
    login() {
        console.log('登陆')
    }
}
Sun.getName = (function () {
    let flag
    if (!flag) {
        flag = new Sun()
    }
    return flag
})()
let obj1 = Sun.getName
obj1.login()
let obj2 = Sun.getName
console.log(obj1 === obj2)