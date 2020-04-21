const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                loader:'file-loader',
                options: {
                    name: 'icfont/[hash:10].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode: 'development'
}