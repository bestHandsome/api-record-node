var fs = require("fs");

class List {
   constructor() {
   }
    async getList(req, res, next) {
        fs.readFile(__dirname + "/list.json", 'utf8', function (err, data) {
            console.log( err );
            res.end( data );
        });
    }
}

module.exports = new List();
