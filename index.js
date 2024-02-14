const EXPRESS = require('express');

const APP = EXPRESS();
const PORT = 3000;

const accountSid = 'AC7946af502742b5c7293c8d788db632c5';
const authToken = 'e75157e2e765dee5115964ca9dd1d379';

const client = require('twilio')(accountSid, authToken);

/**
 * SIMPLE APP BACKEND
 */
APP.get('/', (req, res) => {
  res.send(`THIS IS A TEST TO SEND MESSAGES`);

  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: 'Hello there!',
      to: 'whatsapp:+573212413656',
    })
    .then((message) => console.log(message.sid));
});

APP.listen(PORT, () => {
  console.log(`The app is linsting in ${PORT} port`);
});
