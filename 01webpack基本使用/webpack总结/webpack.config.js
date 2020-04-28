const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack = require('webpack');
//设置nodejs环境变量
//注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
const server = require('./server/index.js');

module.exports = {
    entry: resolve(__dirname,'./src/js/index.js'),
    output: {
        filename: 'js/[name].[contenthash:10].js',
        // 输出文件目录 (将来所有资源输出的公共目录)
        path:resolve(__dirname,'build'),
        // 将所有资源引入公共路径前缀 例如：服务器跟目录  eg:css 中引入图片是 相对路径../images/bac.jpg
        //  打包后是 /images/59aba82ef3.jpg  这种目录，避免资源路径出错(不管源文件引入图片的路径有几层，打包后都是 /images/59aba82ef3.jpg)
        publicPath: '/',
        // 非入口chunk的名称
        chunkFilename: 'js/[name]_chunk.js'
    },
    module: {
        rules: [
            // loader 处理
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
            template: resolve(__dirname,'./src/index.html')
        }),
        new MiniCssExtractPlugin({
            // 对输出的css进行重命名
            filename: 'css/built.[contenthash:10].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                server: JSON.stringify(server),
            }
        })
    ],
    /*
        性能(performance)
        这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」 默认资源体积250Kb
        静态资源体积过大，会有黄色警告,加上hints:false 会不提示警告 最好还是压缩下图片
    */
    performance: { 
        hints:false
    },
    // 解析模块规则
    resolve: {
        // 配置解析模块路径别名：优点简写路径，缺点路径没有提示
        alias: {
            $css: resolve(__dirname,'src/css'),
            $images: resolve(__dirname,'src/images'),
            $media: resolve(__dirname, 'src/media')
        },
        // 配置省略文件的后缀名
        extensions: ['.js','.json','.jsx','.vue'],
        // 告诉webpack解析模块是去找哪个路径
        modules: [resolve(__dirname, './node_modules'),'node_modules']
    }
}