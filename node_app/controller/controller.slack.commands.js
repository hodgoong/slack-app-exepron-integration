const { interactiveButtons, interactiveMenu, dialog } = require('../model/model.im');

module.exports = {
    slackSlashCommand: function (req, res, next) {
        if (req.body.command === '/interactive-example') {
            const type = req.body.text.split(' ')[0];
            if (type === 'button') {
                res.json(interactiveButtons);
            } else if (type === 'menu') {
                res.json(interactiveMenu);
            } else if (type === 'dialog') {
                res.send();
                (async () => {
                    try {
                        // Open dialog
                        const response = await web.dialog.open({
                            trigger_id: req.body.trigger_id,
                            dialog,
                        });
                    } catch (error) {
                        axios.post(req.body.response_url, {
                            text: `An error occurred while opening the dialog: ${error.message}`,
                        }).catch(console.error);
                    }
                })();
            } else {
                res.send('Use this command followed by `button`, `menu`, or `dialog`.');
            }
        } else {
            next();
        }
    }
}