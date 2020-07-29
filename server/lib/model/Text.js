var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var TextSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    type: Number,
    text: String,
    date: { type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }, // 更新时间
});

var Text = mongoose.model("Text", TextSchema);

module.exports = Text;
