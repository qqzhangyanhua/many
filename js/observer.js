function Observer(data) {
    this.data = data
    this.walk(data)
}
Observer.prototype = {
    walk: function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this.defineReactive(data, key, data[key])
        })
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep()
        var childObj = observer(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                if (Dep.target) {
                    dep.addSub(Dep.target)
                }
                return val
            },
            set: function setter(newVal) {
                if (newVal === val) {
                    return
                }
                val = newVal;
                dep.notify();
            }
        })
    }
}

function observer(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value)
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
}
Dep.target = null
exports.observe = observer;
exports.Dep = Dep