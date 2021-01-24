var Watcher = require('./watcher')

function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null
    this.init()
}
Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.el = appendChild(this.fragment)
        } else {
            console.log('Dom元素不存在')
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment()
        var child = el.firstChild
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment

    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var _this = this[].slice.call(childNodes).forEach(function (node) {
            var reg = /\{\{.*}\}/
            var text = node.text.content
            if (_this.isElementNode(node)) {
                _this.compile(node)
            } else if (_this.isTextNode(node) && reg.test(text)) {
                _this.compileText(node, reg.exec(text)[1])
            }
            if (node.childNodes && node.childNodes.length) {
                _this.compileElement(node)
            }
        })
    },
    compile: function (node) {
        var nodeAttrs = node.attributes;
        var _this = this
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name

        })
    },
    compileText: function (node, exp) {},
    compileElement: function (node, vm, exp, dir) {},
    compileModel: function (node, vm, exp, dir) {},
    updateText: function (node, value) {},
    modelUpdater: function (node, value, oldValue) {},
    isDirective: function (attr) {},
    isEventDirective: function (dir) {},
    isElementNode: function (node) {},
    isTextNode: function (node) {}
}
module.exports = Compile