const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
            /*
                js兼容性处理 babel-loader @babel/preset-env @babel/core
                    1.基本js兼容性处理 --> @babel/preset-env
                    2.全部js兼容性处理 --> @babel/polyfill 直接在页面中引入 不用配置loader
                        问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
                    3.需要做兼容性处理的就做，按需加载 --> core-js
            */
            
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设 指示babel做怎样的兼容性处理
                    // presets: ['@babel/preset-env']
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js 版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            },
            // 处理less 资源
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },
            // 处理css 资源
            {
                test: /\.css$/,
                use: [
                    // 创建style标签将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader 作用：提取js中的css文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件合并到js文件中
                    'css-loader'
                ]
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
        // 压缩css
        new OptimizeCSSAssetsWebpackPlugin(),
        // 打包之前清理build
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
          // 项目构建后路径
          contentBase: resolve(__dirname,'build'),
          // 启动gzip压缩
          compress: true,
          // 端口号
          port:3001,
          // 自动打开浏览器
          open:true
    }
}