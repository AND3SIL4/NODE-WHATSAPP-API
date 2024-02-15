/**
 * TODO: Generar periocidad en horario laboral, cada 15 minutos & filtrar por solo clientes que lo necesiten.
 * TODO: Investigacion de precios para poder sustentar la propuesta.
 * TODO: Mirar el tema del DEPLOY.
 */

const cron = require('node-cron');

cron.schedule('*/15 8-17 * * *', async () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 8 && currentHour < 18) {
    try {
      const date = new Date();
      console.log(`This is working. Time: ${date}`);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('La tarea fuera del horario permitido (8 am - 6 pm).');
  }
});
