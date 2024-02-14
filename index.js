const connect = require('./testConn'); // Import the connect function with data

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
async function sendMessage(body, numberTo) {
  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: body,
      to: `whatsapp:+57${numberTo}`,
    })
    .then((message) =>
      console.log(
        `The message to ${message.to} is currently: ${message.status}`
      )
    );
}

/**
 * This function work calling the function on another file that returns an  array and manipulate in order to send messages
 */
async function main() {
  console.clear();
  try {
    const dataFromConnect = await connect(); // Manipulate the information stract to the database

    dataFromConnect.forEach((only) => {
      console.clear();
      const body = `Buen día señor(a) ${only.name} ${only.lastName} su pedido ${
        only.status === 1
          ? 'Se ha registrado con exito'
          : 'se encuentra en novedad'
      }`;
      const numberTo = only.phone;

      sendMessage(body, numberTo);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
