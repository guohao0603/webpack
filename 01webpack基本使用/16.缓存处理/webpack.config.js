const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//设置nodejs环境变量
// process.env.NODE_ENV = 'production';
/*
    babel缓存
        cacheDirectory：true
        ---> 让第二次打包构建速度更快
    文件资源缓存
        hash：每次webpack构建时会生成一个唯一的hash之
            问题：因为js和css同时使用一个唯一的hash值。
            如果重新打包，会导致所有缓存失效，(可能我却改动一个文件)
        chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk。那么hash值就一样
            问题：js和css的hash值还是一样的,因为css时在js中被引入的属于同一个chunk。
        contenthash:根据文件内容生成hash，不同文件的hash值一定不一样

        ----> 让代码上线运行缓存更好使用
*/
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'built.[contenthash:10].js',
        path:resolve(__dirname,'dist')
    },
    module: {
        rules: [
            // loader 处理
            /*
                正常来讲，一个文件只能被一个loader处理
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
                先执行eslint 在执行babel
            */
            // js 语法检查 在package.json 中eslintConfig --> airbnb
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     //优先执行
            //     enforce: "pre",
            //     options: {
            //         fix: true
            //     }
            // },
            {
                oneOf: [
                     // js 兼容处理
                            {
                                test: /\.js$/,
                                exclude: /node_modules/,
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                //按需加载
                                                useBuiltIns: 'usage',
                                                // 指定core-js 版本
                                                corejs: {version: 3},
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
                                    ],
                                    // 开启babel缓存
                                    // 第二次构建时，读取缓存
                                    cacheDirectory: true
                                }
                            },
                            // 处理less资源
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
           
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            // 对输出的css进行重命名
            filename: 'built.[contenthash:10].css'
        }),
        // 压缩css
        new OptimizeCSSAssetsWebpackPlugin(),
        // 打包之前清理build
        new CleanWebpackPlugin()
    ],
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname,'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port:3001,
        // 自动打开浏览器
        open:true
  },
  devtool: 'source-map'
}