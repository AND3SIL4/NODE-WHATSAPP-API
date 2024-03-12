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
    if (res.length === 0) console.log('There is no new data to send messages');

    // Iterate the result sent for connection function
    res.forEach((element) => {
      const receivedDate = new Date(element.FchaInsert);
      const insertDate = new Date(element.FchaInsertSAP);

      // Message for to be sent
      const bodyDistribuidor = `Buen día señores *${
        element.RazonSocial
      }*, su pedido *#${element.DocNum}*, ${
        element.EstadoPedido === 'Insertado'
          ? `fue recibido desde genesis el día ${receivedDate.toLocaleDateString()} y fue insertado en SAP el día ${insertDate.toLocaleDateString()}. Estado pedido: ${
              element.TipoDcmnto === 'Orden'
                ? '*EXITOSO*'
                : '*RETENIDO POR CARTERA*, por favor comunicarse lo más pronto posible'
            }. El valor bruto del pedido es de: *$${
              element.ValorBruto
            }* y el valor total es de: *$${element.ValorTotal}*. Zona SN: *${
              element.ZonaSN
            }*. EDS a la que pertenece el pedido: *${element.DistEDS}*.`
          : 'no se pudo recibir debido a un error'
      } `;

      const bodyCoordinador = `Buen día coordinador(a) *${
        element.Coordinador
      }*, el pedido ${element.DocNum} de la distribuidora *${
        element.RazonSocial
      }* ${
        element.EstadoPedido === 'Insertado'
          ? `fue recibido desde genesis el día ${receivedDate.toLocaleDateString()} y fue insertado en SAP el día ${insertDate.toLocaleDateString()}. Estado pedido: ${
              element.TipoDcmnto === 'Orden'
                ? '*EXITOSO*'
                : '*RETENIDO POR CARTERA*, por favor comunicarse lo más pronto posible'
            }. El valor bruto del pedido es de: *$${
              element.ValorBruto
            }* y el valor total es de: *$${element.ValorTotal}*. Zona SN: *${
              element.ZonaSN
            }*. EDS a la que pertenece el pedido: *${element.DistEDS}*.`
          : 'no se pudo recibir debido a un error'
      }`;

      // Check the number with start for digit 3
      if (startWhitThree(element.DistTelefono)) {
        // Function for sending message to the customer
        sendMessage(bodyDistribuidor, element.DistTelefono); // Distribuidor message
        sendMessage(bodyCoordinador, element.TelfCoord); // Coordinador message
      } else {
        const response = `Phone number ${element.DistTelefono} invalid`;
        text.onFailed(response);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
