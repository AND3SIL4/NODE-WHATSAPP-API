import mssql from 'mssql';
import { config } from 'dotenv';
import { ColorsStylesForText as textStyle } from './styles/textStyle.js';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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
async function connecDataBase() {
  try {
    await mssql.connect(settings);
    text.onSuccess(
      'Conexión a la base de datos extablecida correctamente',
      true
    );

    // Realiza la consulta
    const result = await mssql.query`
      SELECT TOP 10
      p.Codigo CodigoPedido, 
      c.Codigo CodigoCliente,
      Nombre NombreCliente, 
      Apellido1 ApellidoCliente, 
      Telefono TelefonoCliente, 
      Activo esActivo, 
      p.Cantidad CantidadPedido
      FROM [dbo].[ultimopedido] p INNER JOIN [dbo].[Cliente] c 
      ON p.usuario = c.Codigo WHERE Activo = 1;
      `;

    return result.recordset;
  } catch (e) {
    console.error(e);
  } finally {
    mssql.close();
  }
}

/**
 * This function return the data into the data.json file
 * @param {string} filePath
 * @returns
 */
async function readData(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    // Valida si el archivo esta vacio y devuelte una lista vacia
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (e) {
    console.log('Error code is: ', e.code);
    if (e.code === 'ENOENT') {
      return {};
    } else {
      text.onFailed(e);
      throw new Error('Error al leer los archivos');
    }
  }
}

/**
 * This function take newdata and write and update the data in a local file
 * @param {string} filePath
 * @param {object} newData
 */
async function writeData(filePath, newData) {
  try {
    await writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');
    text.onSuccess('Datos guardados correctamente', true);
  } catch (e) {
    text.onFailed(e);
    throw new Error('Error al guardar los datos');
  }
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'data', 'data.json');

  // Leer los datos existentes
  let datosExistentes = await readData(filePath);

  if (datosExistentes) {
    text.onInfo('Datos encontrados exitosamente');
  } else {
    text.onFailed('No se encontraron datos');
  }

  // Tomar los nuevos datos
  const nuevosDatos = await connecDataBase();

  // Agregar o actualizar los nuevos datos con los datos anteriores
  datosExistentes = [...datosExistentes, ...nuevosDatos];

  // Escribir datos en el archivo JSON
  await writeData(filePath, datosExistentes);
}

main();
