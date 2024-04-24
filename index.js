import { main as message } from "./src/message.js";
import { ColorsStylesForText as styleText } from "./src/styles/textStyle.js";
import { schedule } from "node-cron";

const SET_INTERVAL = "*/10 * * * *"; // Run every 10 minutes
const text = new styleText();

// Función para ejecutar el proceso principal
async function executeMainProcess() {
  try {
    await message(); //Executing the main process
  } catch (e) {
    text.onFailed("An error has occurred", e);
  }
}

// Programar la ejecución periódica del proceso principal
schedule(SET_INTERVAL, async () => {
  await executeMainProcess();
});

// Execute the process as soon as the script ran
(async () => {
  try {
    text.onInfo("Executing at first time");
    await executeMainProcess();
  } catch (error) {
    text.onFailed("Error executing at first time:", error);
  }
})();
