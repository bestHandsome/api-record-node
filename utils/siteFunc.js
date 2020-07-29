var log4js = require('log4js');
let logConfig = require('../configs/logConfig');
const logUtil = require('./middleware/logUtil');
var siteFunc = {
    renderApiData(req = {}, res, responseCode, responseMessage, data = {}, type = "") {
        let sendData = {
            status: responseCode,
            message: responseMessage,
            server_time: new Date().getTime(),
            data,
            type
        };
        return sendData;
    },
    renderApiErr(req, res, responseCode, responseMessage, type = '') {
        if (typeof responseMessage == 'object') {
            responseMessage = responseMessage.message;
        }
        let errorData = {
            status: responseCode,
            message: responseMessage,
            server_time: new Date().getTime(),
            data: {}
        };
        logUtil.error(responseMessage, req);
        return errorData;
    }
};

module.exports = siteFunc;
