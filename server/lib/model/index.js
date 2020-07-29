const mongoose = require("mongoose");
const settings = require("../../../configs/settings");

mongoose.connect("mongodb://" +
    settings.HOST  + ":" +
    settings.PORT + "/" +
    settings.DB +
    "",
    {
        useNewUrlParser: true
    }
);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once("open", () => {
    console.log("connect mongodb success");
});

db.on("error", function(error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
});

db.on("close", function() {
    console.log("数据库断开，重新连接数据库");
});

exports.Comment = require("./Comment");
exports.Text = require("./Text");
