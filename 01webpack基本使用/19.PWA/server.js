/*
    服务器代码
*/
const express = require('express');

const app = express();

app.use(express.static('dist',{maxAge:1000*3600}));

app.listen(3002,function(){
    console.log('服务器开启')
});