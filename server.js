const http = require('http');
const configureExpress = require('./node_config/express');

const app = configureExpress();

// Start the express application server
const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
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