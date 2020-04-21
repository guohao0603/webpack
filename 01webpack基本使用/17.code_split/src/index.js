import '../css/index.less'
import $ from 'jquery';
function sum(...args){
    return args.reduce((p,c)=>p+c,0)
}

console.log(sum(1,2,3,4,5))
console.log($)

/*
    ES10语法
    通过js代码，让某个文件单独打包成一个chunk
    import 动态导入语法：能将某个文件单独打包
*/
import(/*webpackChunkName: 'test'*/'./test')
    .then(({mul})=>{
        // 文件加载成功
        console.log(mul(11,11))
    })
    .catch(()=>{
        // 文件加载失败
        console.log('文件加载失败')
    })