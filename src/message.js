const connect = require('./testConn'); // Import the connect function with data

require('dotenv').config(); // Upload the environment variables

// Get environ variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const phoneFrom = process.env.phone;

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
      from: phoneFrom,
      body: body,
      to: `whatsapp:+57${numberTo}`,
    })
    .then((message) =>
      console.log(
        `Destinatario: ${message.to} estado: ${
          message.status === 'queued' ? 'enviado' : 'error'
        }`
      )
    );
}

/**
 * This function return false y the number does not start with '3'
 * @param {number} number
 * @param {number} digit
 * @returns boolean
 */
function startWhitThree(number, digit) {
  const regex = new RegExp(`^${digit}`);

  if (regex.test(number)) {
    return true;
  }
}

/**
 * This function work calling the function on another file that returns an  array and manipulate in order to send messages
 */
async function main() {
  try {
    const dataFromConnect = await connect(); // Manipulate the information stract to the database

    dataFromConnect.forEach((only) => {
      const body = `Buen día señor(a) ${only.name} ${only.lastName} su pedido ${
        only.status === 1
          ? 'se ha registrado con exito'
          : 'se encuentra en novedad'
      }`;
      const numberTo = only.phone;

      if (!startWhitThree(numberTo, 3) && numberTo < 10) {
        console.log('Número de celular invalido...');
        return;
      }
      console.log(numberTo);

      sendMessage(body, numberTo); // Function for sending message to the customer
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = main;
