import mssql from 'mssql';
import { config } from 'dotenv';
import { ColorsStylesForText as textStyle } from './styles/textStyle.js';

// Crear instancia de los colores para el texto
const text = new textStyle();

config();
const user = process.env.user;
const password = process.env.password;
const server = process.env.server;
const dbName = process.env.databaseName;

// Set up the connection with the data base
const settings = {
  user: user,
  password: password,
  server: server,
  database: dbName,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

/**
 * Function to connect a dabase
 * @returns {string[]} resultData is an arary that contains the result data of the query set
 */
export async function connecDataBase() {
  let resultData = [];
  try {
    await mssql.connect(settings);
    text.onSuccess(
      'Conexión a la base de datos extablecida correctamente',
      true
    );

    // Realiza la consulta
    const result =
      await mssql.query`SELECT TOP 10 Nombre, Apellido1, Telefono, Activo FROM [dbo].[Cliente] WHERE Activo = 1`;

    result.recordset.forEach((client) => {
      resultData.push({
        name: client.Nombre,
        lastName: client.Apellido1,
        phone: client.Telefono,
        status: client.Activo,
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    mssql.close();
  }
  return resultData;
}
