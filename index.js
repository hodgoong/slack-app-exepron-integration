const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

const web = new WebClient(process.env.SLACK_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

// Initialize using signing secret from environment variables
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', function(event){
    console.log(event);
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

slackEvents.on('app_mention', function(event){
    console.log(event);
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});


/**
 * Example code for posting a message in the designated channel
 */

// // The current date
// const currentTime = new Date().toTimeString();

// (async () => {

//   try {
//     // Use the `chat.postMessage` method to send a message from this app
//     await web.chat.postMessage({
//       channel: '#general',
//       text: `The current time is ${currentTime}`,
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   console.log('Message posted!');
// })();