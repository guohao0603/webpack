const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const {resolve} = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname,'build'),
        // 监视contentBase目录下的所有文件,一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 域名
        host: 'localhost',
        // 端口号
        port:3007,
        // 自动打开浏览器
        open:true,
        // 进度条
        progress: true,
        // 不要全屏提示错误信息
        overlay: {errors: true},
        // 启动代理
        proxy: {
            // 一旦devserver(3007)服务器接收到/api/xxx 的请求，就会把请求转发到另外一个服务器
            '/api': {
                target: 'http://localhost:5000',
                // 发送请求时，请求路径重写 将 /api/xxx ----> /xxx (去掉/api)
                pathRewrite: {'^/api': ''},
                secure: false,
                changeOrigin:true //允许跨域请求
            }

        }
    }
})