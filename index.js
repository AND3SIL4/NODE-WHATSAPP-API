import { main as message } from './src/message.js';
import { ColorsStylesForText as styleText } from './src/styles/textStyle.js';
import { writeFileSync } from 'fs';

const currentDate = new Date();
const text = new styleText();
const filePath = 'data/data.json';

if (currentDate.getHours() > 8 && currentDate.getHours() < 18) {
  try {
    text.onInfo(`Working at: ${currentDate}`);
    await message(); // Run the main process...
  } catch (e) {
    text.onFailed('An error has ocurred', e);
  }
}

// Clean up the JSON file
function cleanUp() {
  writeFileSync(filePath, JSON.stringify([]));
  console.log('The JSON file has been cleaned up');
}

// Execute depends on the current hour
if (currentDate.getHours() === 6) {
  cleanUp();
}
