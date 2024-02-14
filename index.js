const object = require('./connection'); // Import function that connect with the database
require('dotenv').config(); // Upload the environment variables

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

// Create a client using twilio
const client = require('twilio')(accountSid, authToken);

/**
 * This function consume the TWILIO API for sending messages, require the following two params
 * @param {string} body
 * @param {number} numberTo
 */
function sendMessage(body, numberTo) {
  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: body,
      to: `whatsapp:+57${numberTo}`,
    })
    .then((message) => console.log(message.sid));
}

/**
 * This function work calling the function on another file that returns an  array and manipulate in order to send messages
 */
function main() {
  object().forEach((e) => {
    sendMessage(e.body, e.to);
  });
}

main();
