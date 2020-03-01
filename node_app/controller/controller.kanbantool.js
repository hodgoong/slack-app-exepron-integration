const https = require('https');
const xmlParser = require('xml2json');
const config = require('../../node_config/config');

let kanbanToolEndPointTasks = 'https://exepron-integration.kanbantool.com/api/v1/boards/590407/tasks.xml?api_token='+ config.kanbanToolToken;

module.exports = {
    getKanbanTasks: function (callback) {
        console.log('- GET Kanban Tasks activated. accessing: ' + kanbanToolEndPointTasks);

        https.get(kanbanToolEndPointTasks, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            } 

            if (error) {
                console.error(error.message);
                res.resume();
                return;
            }
            
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    if(/^application\/xml/.test(contentType)){
                        let resultData = xmlParser.toJson(rawData, {object: true});
                        let resultNumber = resultData['tasks']['task'].length;
                        callback(resultNumber);
                    }
                    else if(/^application\/json/.test(contentType)){
                        let resultData = JSON.parse(rawData);
                        let resultNumber = Object.keys(resultData).length;
                        callback(resultNumber);
                    }
                    else{
                        throw "content-type is not supported: " + contentType;
                    }
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
}