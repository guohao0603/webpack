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
        })
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
    },
   
   devtool: 'eval-source-map'
    /*
        source-map:一种提供源代码到构建代码的映射技术，(如果构建代码出错了，通过映射可以追溯到源代码)

        source-map:外部
            错误代码准确信息和源代码错误位置
        inline-source-map:内联
            只生成一个内联的source-map
            错误代码准确信息和源代码错误位置
        hidden-source-map:外部
            错误代码错误原因，但是没有错误位置。只能提示构建后错误代码的错误位置
        eval-source-map:内联
            每一个文件都生成对应的source-map，都在eval
            错误代码的错误信息，和源代码的错误位置
        nosources-source-map:外部
            错误代码错误信息和源代码错误位置
        cheap-source-map:外部
            错误代码错误信息和源代码错误位置
            只能精确到行
        cheap-module-source-map:外部
            错误代码错误信息和源代码错误位置


        开发环境：速度快，调试友好
            速度快( eval-cheap>eval>inline>cheap)
            调试友好(source-map>cheap-module-source-map>cheap-source-map)

            ---> 最优选择： eval-source-map / eval-cheap-module-source-map
        生产环境：源代码要不要隐藏？调试要不要友好
            内联会让代码体积变大，所以在生产环境不用内联
            nosources-source-map    全部隐藏代码
            hidden-source-map   只隐藏源代码 ，会提示构建后代码

            ---> source-map / cheap-module-source-map
    */
}