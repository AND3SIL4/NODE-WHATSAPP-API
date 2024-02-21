const cron = require('node-cron');

cron.schedule('*/15 8-17 * * *', async () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 8 && currentHour < 18) {
    try {
      const date = new Date();
      console.log(`Proceso corriendo a las: ${date}`);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('La tarea fuera del horario permitido (8 am - 6 pm).');
  }
});
