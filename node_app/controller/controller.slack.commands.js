const { interactiveButtons, interactiveMenu, dialog } = require('../model/model.im');

module.exports = {
    slackSlashCommand: function (req, res) {
        console.log('Received following slash command:');
        console.log(req.body);

        if (req.body.command === '/interactive-example') {
            const type = req.body.text.split(' ')[0];
            switch (type) {
                case interactiveButtons.command:
                    res.json(interactiveButtons.json);
                    break;

                case interactiveMenu.command:
                    res.json(interactiveMenu.json);
                    break;

                default:
                    res.send(`Use this command followed by \`${interactiveButtons.command}\`, \`${interactiveMenu.command}\``);
            }
        }
    }
}