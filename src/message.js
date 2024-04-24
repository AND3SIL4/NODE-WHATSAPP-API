import { config } from "dotenv";
import twilio from "twilio";
import { ColorsStylesForText as textStyle } from "./styles/textStyle.js";
import { main as myJson } from "./testConn.js";
import { startWhitThree } from "./validators/phoneNumber.js";
import { TextToBeSend } from "./components/textToSend.js";

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
  try {
    await client.messages.create({
      from: phoneFrom,
      body: body,
      to: numberTo,
    });
    const response = `Message sent successfully to: ${numberTo}`;
    text.onSuccess(response, false);
  } catch (error) {
    if (error.code === 63018) {
      console.error("Exceeded rate limit. Retrying in 10 seconds...");
      setTimeout(() => {
        sendMessage(body, numberTo); // Retry sending the message
      }, 10000); // Retry after 10 seconds
    } else {
      console.error("Error sending message:", error);
      const response = `Error sending message to ${numberTo}: ${error.message}`;
      text.onFailed(response);
    }
  }
}

/**
 * This function work calling the function on another file that returns an
 * array and manipulate in order to send messages
 */
export async function main() {
  text.onInfo(`Working at: ${new Date()}`);
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
          //"3202329139", // Ingeniero
          //"3209152850", // Juan
        ];

        NUMBER_LIST.forEach((e) => {
          const PHONE_NUMBER = concatText(e);
          //Send messages
          sendMessage(bodyText, PHONE_NUMBER);
        });

        // //!Uncomment the following code to pass on a production context
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
  return `whatsapp:+57${numberToBeConcat}`;
}
