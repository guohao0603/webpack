const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

//设置nodejs环境变量
process.env.NODE_ENV = 'development';
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
                use: [
                    // 创建style标签将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader 作用：提取js中的css文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件合并到js文件中
                    'css-loader',
                    /*
                        css兼容处理 ：postcss-->postcss-loader postcss-preset-env
                        帮postcss找到package.json 中browserslist里面的配置，通过配置加载指定的css兼容样式
                        "browserslist": {
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini_all"
                            ]
                        }
                    */
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => {
                                // postcss插件
                                require('postcss-preset-env')
                            }
                        }
                    }
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
        })
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
          open:true,
          // 进度条
          progress: true
    }
}