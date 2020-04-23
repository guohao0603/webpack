# webpack 性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
    * HMR
* 优化调试功能
    * source-map
## 生产环境性能优化
* 优化打包构建速度
    * oneOf loader命中规则，一旦文件符合某个loader，就不会去应用其他loader
    * babel缓存
    * 多进程打包
    * externals 不需要打包的库
    * dll
* 优化代码性能
    * 缓存(hash-chunkhash-contenthash)
    * tree shaking 条件：生产环境下，es6 语法导入 自动开启树摇
    * code split 代码分割
    * 懒加载/预加载
    * pwa 渐进式开发