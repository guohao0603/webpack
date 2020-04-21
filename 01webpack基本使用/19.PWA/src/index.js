import '../css/index.less'
console.log('index.js被加载了');

/*
    1.eslint 不认识window navigator 全局变量
    解决： 需要修改 package.json 中 eslintConfig 配置
         "env": {
            "browser": true
          }
    2.sw 必须运行在服务器上
*/
// 注册serviceWorker
// 处理兼容问题
if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(()=>{
                console.log('serviceWorker注册成功')
            })
            .catch(()=>{
                console.log('serviceWorker注册失败')
            })
    })
}