var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var shortid = require('shortid');
var CommentSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    text: String,
    imageArr: [{  // 媒体集合（图片）
        type: String
    }],
    date: { type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }, // 更新时间
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
