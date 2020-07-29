//express_demo.js 文件
var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const path = require('path');

// api路由开始
const uploadApi = require("./server/routers/upload");
const restApi = require("./server/routers/api");

const app = express();


// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 加载解析json的中间件
app.use(bodyParser.json());

// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 加载解析cookie的中间件
app.use(cookieParser());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// api入口开始
app.use("/api", restApi);
app.use("/api/upload", uploadApi);


// 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen(3000, () => {
    console.log('Express app server listening on http://%s:%d', server.address().address, server.address().port);
});
