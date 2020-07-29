const express = require('express');
const router = express.Router();
router.caseSensitive = true;
router.strict = true;

const {List, Comment, Text} = require("../lib/controller");

router.get('/list', List.getList);

// 评论相关
router.get('/comment/list', Comment.getComments);
router.post('/comment/add', Comment.addComment);
router.delete('/comment/delete', Comment.deleteComment);

// 获取言论
router.get('/text', Text.getText)

router.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
});

module.exports = router;
