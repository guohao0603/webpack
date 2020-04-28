const {resolve} = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
         // 项目构建后路径
         contentBase: resolve(__dirname,'build'),
          // 启动gzip压缩
         compress: true,
    },
    plugins: [
        // 每次打包前清理build
        // new CleanWebpackPlugin(),
        // 压缩css
        new OptimizeCSSAssetsWebpackPlugin()
    ],
    /*
        1. 可以将node_modules 中的代码单独打包一个chunk最终输出
        2. 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
})