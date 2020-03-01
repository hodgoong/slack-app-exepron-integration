const { createMessageAdapter } = require('@slack/interactive-messages');

const config = require('../../node_config/config');

module.exports = function (app) {
    const slackInteractions = createMessageAdapter(config.slackSigningSecret);

    slackInteractions.action('example_action', (payload, respond) => {
        // `payload` contains information about the action
        // see: https://api.slack.com/docs/interactive-message-field-guide#action_url_invocation_payload
        console.log(payload);

        // `respond` is a function that can be used to follow up on the action with a message
        respond({
            text: 'Success!',
        });

        // The return value is used to update the message where the action occurred immediately.
        // Use this to items like buttons and menus that you only want a user to interact with once.
        return {
            text: 'Processing...',
        }
    });

    app.use('/slack/actions', slackInteractions.expressMiddleware());
}

