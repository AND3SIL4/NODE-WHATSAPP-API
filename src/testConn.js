const sql = require('mssql');
require('dotenv').config();

const user = process.env.user;
const password = process.env.password;
const server = process.env.server;
const dbName = process.env.databaseName;

// Set up the connection with the data base
const config = {
  user: user,
  password: password,
  server: server,
  database: dbName,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

/**
 * Function to connect a dabase
 * @returns {string[]} resultData is an arary that contains the result data of the query set
 */
async function connecDataBase() {
  let resultData = [];
  try {
    await sql.connect(config);
    console.log('Conexión extablecida correctamente...');

    // Realiza la consulta
    const result =
      await sql.query`SELECT TOP 20 * FROM [dbo].[Cliente] WHERE Activo = 0`;

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
    sql.close();
  }
  return resultData;
}

module.exports = connecDataBase;
