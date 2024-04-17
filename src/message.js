import { config } from "dotenv";
import twilio from "twilio";
import { ColorsStylesForText as textStyle } from "./styles/textStyle.js";
import { main as myJson } from "./testConn.js";
import { startWhitThree } from "./validators/phoneNumber.js";
import { TextToBeSend } from "./components/textToSend.js";
import sendMessagesWithIntervals, {
  clearIntervals,
} from "./components/intervals.js";

config();
// Get environ variables
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const phoneFrom = process.env.phone;
// Create a client using twilio
const client = twilio(accountSid, authToken);
// Style instance
const text = new textStyle();

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
      to: numberTo,
    })
    .then((message) => {
      const response = `Message ${
        message.status === "queued" ? "sent" : "error"
      }: ${numberTo}`;
      text.onSuccess(response, false);
    });
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
    if (res.length === 0) console.log("There is no new data to send messages");

    // Iterate the result sent for connection function
    res.forEach((element) => {
      //Call the function to send the message
      const bodyText = TextToBeSend(element);

      // Check the number with start for digit 3
      if (startWhitThree(element.DistTelefono)) {
        // Array of number to be sent in a development context
        const NUMBER_LIST = [
          "3212413656", // Felipe
          "3202329139", // Ingeniero
          "3209152850", // Juan
        ];
        //Iterate over every element of the list
        NUMBER_LIST.forEach((number) => {
          const PHONE_NUMBER = concatText(number);
          sendMessagesWithIntervals(sendMessage, bodyText, PHONE_NUMBER);
        });

        NUMBER_LIST.forEach((number) => {
          const PHONE_NUMBER = concatText(number);
          setTimeout(() => {
            clearIntervals(PHONE_NUMBER);
          }, 5000);
        });

        //!Uncomment the following code to pass on a production context
        // const phoneTo = concatText(element.DistTelefono);
        // sendMessage(bodyText, phoneTo);
      } else {
        const response = `Phone number ${element.DistTelefono} invalid`;
        text.onFailed(response);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function concatText(numberToBeConcat) {
  return `whatsapp:${numberToBeConcat}`;
}
