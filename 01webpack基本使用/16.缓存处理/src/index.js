import '../css/index.less'
function sum(...args){
    return args.reduce((p,c)=>p+c,0)
}

console.log(sum(1,2,3,4,5))