// Impor the main function
const message = require('./src/message');

const currentHour = new Date().getHours();

if (currentHour >= 8 && currentHour < 18) {
  try {
    const date = new Date(); // Get the current running time
    console.log(`Funcionando a las: ${date}`);

    message(); // Run the main process...
  } catch (e) {
    console.error('Ha ocurrido un error: ', e);
  }
} else {
  console.log('Tarea fuera del horario permitido (8 am - 6 pm).');
}

