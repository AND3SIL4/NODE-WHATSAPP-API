import { main as message } from "./src/message.js";
import { ColorsStylesForText as styleText } from "./src/styles/textStyle.js";
import { writeFile, readFile } from "fs/promises";
import { schedule } from "node-cron";

const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;
const FILE_PATH = "data/data.json"; // Ruta del archivo para leer y escribir
const SET_INTERVAL = "*/60 * * * *"; // Ejecutar cada 60 minutos

const currentDate = new Date();
const text = new styleText();

// Función para ejecutar el proceso principal
async function executeMainProcess() {
  const currentHour = currentDate.getHours();
  if (currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR) {
    try {
      text.onInfo(`Working at: ${currentDate}`);
      await message(); // Ejecutar el proceso principal...
    } catch (e) {
      text.onFailed("An error has occurred", e);
    }
  }
}

// Programar la ejecución periódica del proceso principal
schedule(SET_INTERVAL, async () => {
  await executeMainProcess();
});

// Ejecutar el proceso una vez al inicio
(async () => {
  try {
    await executeMainProcess();
  } catch (error) {
    console.error("Error al ejecutar el proceso principal:", error);
  }
})();

// Limpiar el archivo JSON
async function cleanUp() {
  try {
    await writeFile(FILE_PATH, JSON.stringify([]));
    console.log("El archivo JSON ha sido limpiado");
  } catch (error) {
    console.error("Error al limpiar el archivo JSON:", error);
  }
}

// Limpiar el archivo dependiendo de la hora actual
try {
  const data = await readFile(FILE_PATH, "utf8");
  const json = JSON.parse(data);
  const previousDate = new Date(json[0].FchaInsert);

  if (currentDate > previousDate && data.trim()) {
    await cleanUp();
  }
} catch (error) {
  console.error("Error al leer el archivo JSON:", error);
}
