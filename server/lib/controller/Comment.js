const CommentModel = require("../model").Comment;
const {siteFunc} = require("../../../utils");
class Comment {
    constructor() {
    }
    async getComments(req, res, next) {
       try {
           let current = req.query.current || 1;
           let pageSize = req.query.pageSize || 10;
           const comments = await CommentModel.find().skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).sort('-date').exec();
           let data = siteFunc.renderApiData(req, res, 200, 'commentList', comments);
           res.send(data);
       } catch (e) {
           res.send(siteFunc.renderApiErr(req, res, 500, e, 'getlist'))
       }
    }
    async addComment(req, res, next) {
        const data = req.body;
        try {
            const groupObj = {
                text: data.text,
                imageArr: data.imageArr || [],
            };
            const newComment = new CommentModel(groupObj);
            await newComment.save();
            res.send(siteFunc.renderApiData(req, res, 200, 'success', ))
        } catch (e) {
            res.send(siteFunc.renderApiErr(req, res, 500, e, 'save'))
        }
    }

    async deleteComment(req, res, next) {
        const data = req.query;
        console.log(data);
        try {
            let targetId = data.id;
            await CommentModel.deleteOne({
                '_id': targetId
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'comment', {}, 'delete'))
        } catch (e) {
            res.send(siteFunc.renderApiErr(req, res, 500, e, 'delete'));
        }
    }
}

module.exports = new Comment();
