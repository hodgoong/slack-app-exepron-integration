// Example interactive messages
module.exports = Object.freeze({
    interactiveButtons: {
        text: 'The terms of service for this app are _not really_ here: <https://unsplash.com/photos/bmmcfZqSjBU>',
        response_type: 'in_channel',
        attachments: [{
            text: 'Do you accept the terms of service?',
            callback_id: 'example_action',
            actions: [
                {
                    name: 'example_action',
                    text: 'Yes',
                    value: 'accept',
                    type: 'button',
                    style: 'primary',
                },
                {
                    name: 'example_action',
                    text: 'No',
                    value: 'deny',
                    type: 'button',
                    style: 'danger',
                },
            ],
        }],
    },
    interactiveMenu: {
        text: 'San Francisco is a diverse city with many different neighborhoods.',
        response_type: 'in_channel',
        attachments: [{
            text: 'Explore San Francisco',
            callback_id: 'pick_sf_neighborhood',
            actions: [{
                name: 'neighborhood',
                text: 'Choose a neighborhood',
                type: 'select',
                data_source: 'external',
            }],
        }],
    },
    dialog: {
        callback_id: 'kudos_submit',
        title: 'Give kudos',
        submit_label: 'Give',
        elements: [
            {
                label: 'Teammate',
                type: 'select',
                name: 'user',
                data_source: 'users',
                placeholder: 'Teammate Name'
            },
            {
                label: 'Comment',
                type: 'text',
                name: 'comment',
                placeholder: 'Thanks for helping me with my project!',
                hint: 'Describe why you think your teammate deserves kudos.',
            },
        ],
    }
});




