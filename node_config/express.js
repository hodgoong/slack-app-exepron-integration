const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = function () {
    const app = express();

    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());
    app.use(methodOverride());

    // Read the signing secret and access token from the environment variables
    if (!config.slackSigningSecret || !config.slackAccessToken) {
        throw new Error('A Slack signing secret and access token are required to run this app.');
    }

    // Below code returns express instance, which is app, via reference.
    require('../node_app/routes/route.slack.actions')(app);
    require('../node_app/routes/route.slack.events')(app);
    require('../node_app/routes/route.slack.commands')(app);

    return app;
}