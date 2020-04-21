// 引入
import '../css/index.less'
import '../media/iconfont.css';
function add(x,y){
    return x+y;
}
console.log(add(21,4))
console.log('js被加载了')

if (module.hot) {
    module.hot.accept('../css/index.less',()=>{
        console.log('文件更新了')
    })
}
