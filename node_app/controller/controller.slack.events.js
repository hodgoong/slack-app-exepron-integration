module.exports = {
    eventOnAppMention: function (event) {
        console.log(event);
        console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    },
    eventOnMessage: function (event) {
        console.log(event);
        console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    }
}