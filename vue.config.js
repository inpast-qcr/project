const { defineConfig } = require('@vue/cli-service')
const Title = '智慧校园微应用'


module.exports = defineConfig({
  transpileDependencies: true,

    // 开启代理服务器
    devServer: {
        client: {
            overlay: false
        },
        // 代理服务器可以将路由中的指定前缀转发到指定的后端服务器中
        proxy: {
            '/api': {
                target: 'http://115.227.36.98:1818/',
                ws: true, // 是否启用websockets
                changeOrigin: true,  // 代理时是否更改host
                pathRewrite: {
                    '^/api': '' //这里理解成用'/api'代替target里面的地址
                }
            }
        }
    },

    // 浏览器标签
    chainWebpack: config => {
        // 其他配置
        config.plugin('html').tap(args => {
            args[0].title= Title
            return args
        })
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    }
})
