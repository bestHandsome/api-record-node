/**
 * 系统支持功能
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
let multer = require('multer');
const tinify = require("tinify");
tinify.key = "CFjBb31cbwqKlpmzQ9pLlggCpC5Brkq4";

const basePath = "public/upload/images/";

var upload = multer({
    dest: 'public/upload/images/'
});//定义图片上传的临时目录

router.post('/image', upload.array('image', 9), function (req, res, next) {
    console.log(req.files.length);
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
        const source = tinify.fromFile(files[i].path);
        source.toFile(basePath + files[i].originalname, () => {
            fs.unlink(files[i].path, function(err){
                if(err) return console.error(err);
                console.log('删除原文件成功');
                res.set({
                    'content-type': 'application/json; charset=utf-8'
                });
                res.json({
                    status: 0,
                    msg: '上传成功'
                });
            });
        });
    }
});


module.exports = router;
