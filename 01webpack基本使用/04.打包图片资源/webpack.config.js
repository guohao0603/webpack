const {resolve} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // 要使用多个loader处理 用 use
                use: ['style-loader','css-loader','less-loader']
            },
            {
                // 问题：默认处理不了html中的img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 下载两个包 url-loader file-loader 前者依附于后者
                loader: 'url-loader',
                options: {
                    // 图片大小小于30kb ，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大 (文件请求速度慢)
                    limit: 30*1024,
                    // 问题：因为url-loader 默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析时会出问题：[object,object]
                    // 解决：关闭url-loader的es6模块，使用commonjs
                    esModule: false,
                    // 给图片重命名
                    // [hash:10] 取图片hash的前10位
                    // [ext] 取文件原来的扩展名
                    name: 'images/[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片(负责引入img，从而能被url-loader进行处理)
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template:'./src/index.html'
            }
        )
    ],
     //模式
     mode: 'development', // 开发模式

     // mode: 'production', // 生产模式
}