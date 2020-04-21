/*
    HMR:hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块(而不是打包所有模块)
    极大提升构建速度。
*/
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack = require('webpack')
//设置nodejs环境变量
// process.env.NODE_ENV = 'development';
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path:resolve(__dirname,'build')
    },
    module: {
        rules: [
            // loader 配置
            // 处理less 资源
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },
            // 处理css 资源
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            
            // 处理图片资源
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8*1024,
                    name:'[hash:10].[ext]',
                    esModule: false,
                    // 输出的路径
                    outputPath:'images'
                }
            },
            // 处理 html中img 资源
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
             // 处理其他资源
            {
                exclude:/\.(html|js|css|less|jpg|png|gif)/,
                loader:'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath:'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css进行重命名
            filename: 'built.css'
        }),
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ],
    mode: 'development',
    
    devServer: {
          // 项目构建后路径
          contentBase: resolve(__dirname,'build'),
          // 启动gzip压缩
          compress: true,
          // 端口号
          port: 3001,
          // 自动打开浏览器
          open: true,
          // 开启HMR功能
          hot: true
    }
}