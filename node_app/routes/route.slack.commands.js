const bodyParser = require('body-parser');
const { slackSlashCommand } = require('../controller/controller.slack.commands');

module.exports = function (app) {
    app.route('/slack/commands')
        .post(bodyParser.urlencoded({ extended: false }), slackSlashCommand)
}