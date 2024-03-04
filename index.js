import { main as message } from './src/message.js';
import { ColorsStylesForText as styleText } from './src/styles/textStyle.js';

const currentHour = new Date().getHours();
const text = new styleText();

if (currentHour >= 8 && currentHour < 18) {
  try {
    const date = new Date(); // Get the current running time
    text.onInfo(`Working at: ${date}`);

    message(); // Run the main process...
  } catch (e) {
    text.onFailed('An error has ocurred', e);
  }
} else {
  console.log('Tarea fuera del horario permitido (8 am - 6 pm).');
}
