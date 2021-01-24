//1.0 准备组件
var bus = new Vue();
var App = Vue.extend({});

var myshop = Vue.extend({
    template: "#myShopHtml",
    data: function () {
        return {

        }
    },
    mounted() {

    },
    methods: {
        goother() {
            this.$router.push('/myshop/screenPhoto')
            // this.$router.push({ //核心语句
            //     path: '/myshop/photoHtml', //跳转的路径
            //     query: { //路由传参时push和query搭配使用 ，作用时传递参数
            //         id: 11111,
            //     }
            // })
        }
    },

});

var screen = Vue.extend({
    template: "#screenHtml",



})

var screenPhoto = Vue.extend({
    template: "#photoHtml",
    data: function () {
        return {
            data: ''
        }
    },

});

// 二维码海报
var sharehtml = Vue.extend({
    template: '#shareHtml',
    data() {
        // 数据创建 
        return {
            // name: '',
            posterDataUrl: '', //合成图片后生成的base64
            imgUrl: '', //海报在本地的路径../../
            productCode: '', //将要发送的参数
            resourceTitle: '', //将要发送的参数
            qrCode: '', //将要发送的参数
            qrCodeInfo: '', //二维码的信息
            qrPosition: '3' //二维码的位置
        }
    },
})


// 通用二维码
var currencyQrCode = Vue.extend({
    template: '#currencyQrCode',
    data() {
        // 数据创建 
        return {
            posterDataUrl: '',
            productCode: '', //将要发送的参数
            resourceTitle: '', //将要发送的参数
            qrCode: '', //将要发送的参数
            qrCodeInfo: ''
        }
    },

})


//2.0 实例化路由规则对象
var router = new VueRouter({
    routes: [{
            path: '/myshop',
            name: 'myshop',
            component: myshop,
            meta: {
                keepAlive: false,
            }
        },
        {
            path: '/myshop/screen',
            name: 'screen',
            components: {
                "default": myshop,
                "subPage": screen
            },
            meta: {
                keepAlive: true,
            }
        },
        {
            path: '/myshop/screenPhoto',
            name: 'screenPhoto',
            components: {
                "default": myshop,
                "subPage": screenPhoto
            },
            meta: {
                keepAlive: true,
            }
        },
        {
            path: '/myshop/sharehtml',
            name: 'sharehtml',
            components: {
                "default": myshop,
                "poster": sharehtml
            },
            meta: {
                keepAlive: false,
                title: '产品二维码'
            }
        },
        {
            path: '/myshop/currencyQrCode',
            name: 'currencyQrCode',
            components: {
                "default": myshop,
                "poster": currencyQrCode
            },
            meta: {
                keepAlive: false,
                title: '通用二维码'
            }
        },
        {
            path: '/',
            //当路径为/时，重定向到/login
            redirect: '/myshop'
        }
    ]
});

router.beforeEach(function (to, from, next) {
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '更多保险'
    }
    next()
})

//3.0 开启路由对象
var App = new Vue({
    el: '#app',
    router: router,
    components: {
        myshop,
        screen,
        screenPhoto
    },
    data: function () {
        return {
            hideMyshop: false,
            "routerAnimate": false,
            "enterAnimate": "", //页面进入动效
            "leaveAnimate": "" //页面离开动效
        }
    },
    computed: {

    },
    watch: {
        // 监听 $route 为店内页设置不同的过渡效果
        "$route"(to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;

            if (this.$route.path.split('/').length > 2) {
                setTimeout(e => {
                    this.hideMyshop = true;
                }, 400);
            } else {
                this.hideMyshop = false;
            }

            //同一级页面无需设置过渡效果
            if (toDepth === fromDepth) {
                return;
            }

            this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
            this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
            // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
            if (toDepth === 3) {
                this.leaveAnimate = "animated fadeOutRight"
            }
        },
    }
})