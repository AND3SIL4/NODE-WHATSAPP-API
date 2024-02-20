const connect = require('./testConn'); // Import the connect function with data

require('dotenv').config(); // Upload the environment variables

// Get environ variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const phoneFrom = process.env.phone;

// Create a client using twilio
const client = require('twilio')(accountSid, authToken);

/**
 * This function consume the TWILIO API for sending messages, require the
 * following two params
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
function startWhitThree(number) {
  // Expresión regular para verificar que el número empiece con 3
  // y tenga 10 dígitos
  var regex = /^3\d{9}$/;

  // Verificar si el número coincide con la expresión regular
  return regex.test(number);
}

/**
 * This function work calling the function on another file that returns an
 * array and manipulate in order to send messages
 */
async function main() {
  try {
    // Manipulate the information stract to the database
    const dataFromConnect = await connect();

    // Iterate the result sent for connection function
    dataFromConnect.forEach((only) => {
      const body = `Buen día señor(a) ${only.name} ${only.lastName} su pedido ${
        only.status === 1
          ? 'se ha registrado con exito'
          : 'se encuentra en novedad'
      }`;
      const numberTo = only.phone;

      // Check the number with start for digit 3
      if (startWhitThree(numberTo)) {
        // Function for sending message to the customer
        sendMessage(body, numberTo);
      } else {
        console.log(`Número de celular ${numberTo} invalido`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = main;
