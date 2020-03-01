const config = require('../../node_config/config');
const { createEventAdapter } = require('@slack/events-api');
const { eventOnAppMention, eventOnMessage } = require('../controller/controller.slack.events');

module.exports = function (app) {
    const slackEvents = createEventAdapter(config.slackSigningSecret);

    // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
    slackEvents.on('message', (event) => eventOnMessage(event));
    slackEvents.on('app_mention', (event) => eventOnAppMention(event));
    slackEvents.on('error', console.error);

    app.use('/slack/events', slackEvents.expressMiddleware());
}
