var {
    Dep
} = require('./observer')

function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get()
}
Watcher.prototype = {
    update: function () {
        this.run()
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm.value, oldValue)
        }
    },
    get: function () {
        Dep.target = this;
        var value = this.vm.data[this.exp]
        Dep.target = null
        return value
    }
}
module.exports = Watcher