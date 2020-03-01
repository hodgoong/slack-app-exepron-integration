// Slack slash command handler
const { slackSlashCommand } = require('../controller/controller.slack.commands');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.route('/slack/commands')
        .post(bodyParser.urlencoded({ extended: false }), slackSlashCommand)
}