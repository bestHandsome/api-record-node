const TextModel = require("../model").Text;
const {siteFunc} = require("../../../utils");
class Text {
    constructor() {
    }
    async getText(req, res, next) {
        try {
            const type = +req.query.type;
            const text = await TextModel.find({type: type});
            const length = text.length;
            const count = Math.floor(Math.random() * length)
            let data = siteFunc.renderApiData(req, res, 200, 'Text', text[count]);
            res.send(data);
        } catch (e) {
            res.send(siteFunc.renderApiErr(req, res, 500, e, 'getlist'))
        }
    }
}

module.exports = new Text();
