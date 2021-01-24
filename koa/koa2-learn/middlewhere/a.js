function m1(ctx) {
    global.console.log('m1')
}
module.exports = function () {
    return async function (ctx, next) {
        m1(ctx)
        await next()
    }
}