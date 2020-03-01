const http = require('http');
const config = require('../../node_config/config');
const { getKanbanTasks } = require('../controller/controller.kanbantool');
const { createMessageAdapter } = require('@slack/interactive-messages');

module.exports = function (app) {
    const slackInteractions = createMessageAdapter(config.slackSigningSecret);

    slackInteractions.action('example_action', (payload, respond) => {
        // `payload` contains information about the action
        // see: https://api.slack.com/docs/interactive-message-field-guide#action_url_invocation_payload
        console.log(payload);

        if(payload.actions[0].value === "accept"){
            try{
                getKanbanTasks((result) => respond({text: `Total number of tasks in Kanban Tool are \`${result}\``}));
            }
            catch(e){
                console.error(e.message);
            }
        }
        // The return value is used to update the message where the action occurred immediately.
        // Use this to items like buttons and menus that you only want a user to interact with once.
        return {
            text: 'Processing...',
        }
    });

    app.use('/slack/actions', slackInteractions.expressMiddleware());
}

