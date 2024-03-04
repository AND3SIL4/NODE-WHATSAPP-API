import { config } from 'dotenv';
import twilio from 'twilio';
import { ColorsStylesForText as textStyle } from './styles/textStyle.js';
import { main as myJson } from './testConn.js';

config();
// Get environ variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const phoneFrom = process.env.phone;

// Create a client using twilio
const client = twilio(accountSid, authToken);

const text = new textStyle(); // Style instance

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
      // to: `whatsapp:+573202329139`,
      to: `whatsapp:+573212413656`,
    })
    .then((message) => {
      const response = `Message ${
        message.status === 'queued' ? 'sent' : 'error'
      } - ${numberTo}`;

      text.onSuccess(response, false);
    });
}

/**
 * This function return false y the number does not start with '3'
 * @param {number} number
 * @param {number} digit
 * @returns boolean
 */
function startWhitThree(number) {
  // Regular expression to check the length of the phone number, I gotta start with number 3 and contains 10 digits
  var regex = /^3\d{9}$/;

  // Check the regular expression
  return regex.test(number);
}

/**
 * This function work calling the function on another file that returns an
 * array and manipulate in order to send messages
 */
export async function main() {
  try {
    // Income the new data in order to send messages 
    const res = await myJson();

    // Check the new data to know if the array is empty
    if (res.length === 0)
      console.log('There is no new data to send messages');

    // Iterate the result sent for connection function
    res.forEach((element) => {
      const body = `Buen día señor(a) ${element.NombreCliente} ${
        element.ApellidoCliente
      } su pedido: ${element.CodigoPedido} ${
        element.esActivo === 1
          ? 'se ha registrado con exito'
          : 'se encuentra en novedad'
      }. Cantidad solicitada: ${element.CantidadPedido}`;

      // Check the number with start for digit 3
      if (startWhitThree(element.TelefonoCliente)) {
        // Function for sending message to the customer
        sendMessage(body, element.TelefonoCliente);
      } else {
        const response = `Phone number ${element.TelefonoCliente} invalid`;
        text.onFailed(response);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
