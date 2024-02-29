import { connecDataBase as connect } from './testConn.js';
import { config } from 'dotenv';
import twilio from 'twilio';
import { ColorsStylesForText as textStyle } from './styles/textStyle.js';

config();
// Get environ variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const phoneFrom = process.env.phone;

// Create a client using twilio
const client = twilio(accountSid, authToken);

const text = new textStyle(); // instancia de los estilos

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
      // to: `whatsapp:+57${numberTo}`,
      to: `whatsapp:+573212413656`,
    })
    .then((message) => {
      const respuesta = `Mensaje ${
        message.status === 'queued' ? 'enviado' : 'error'
      } - ${numberTo}`;

      text.onSuccess(respuesta, false);
    });
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
export async function main() {
  try {
    // Manipulate the information stract to the database
    const dataFromConnect = await connect();

    if (dataFromConnect.length === 0) {
      console.log('No hay datos para enviar mensajes...');
    }

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
        const respuesta = `Número de celular ${numberTo} invalido`;
        text.onFailed(respuesta);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
