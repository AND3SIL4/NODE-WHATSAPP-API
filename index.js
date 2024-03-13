import { main as message } from './src/message.js';
import { ColorsStylesForText as styleText } from './src/styles/textStyle.js';
import { writeFile, readFile } from 'fs/promises';
import { schedule } from 'node-cron';

const WORK_START_HOUR = 8;
const WORK_END_HOUR = 18;
const FILE_PATH = 'data/data.json'; // File path to read and write the file
const SET_INTERVAL = '*/30 * * * *'; // Execute every 30 minutes

const currentDate = new Date();
const text = new styleText();

schedule(SET_INTERVAL, async () => {
  const currentHour = currentDate.getHours();
  if (currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR) {
    try {
      text.onInfo(`Working at: ${currentDate}`);
      await message(); // Run the main process...
    } catch (e) {
      text.onFailed('An error has occurred', e);
    }
  }
});

// Clean up the JSON file
async function cleanUp() {
  try {
    await writeFile(FILE_PATH, JSON.stringify([]));
    console.log('The JSON file has been cleaned up');
  } catch (error) {
    console.error('Error cleaning up JSON file:', error);
  }
}

// Clean up the file depends on the current hour
try {
  const data = await readFile(FILE_PATH, 'utf8');
  if (currentDate.getHours() < WORK_START_HOUR && data.trim()) {
    await cleanUp();
  }
} catch (error) {
  console.error('Error reading JSON file:', error);
}
