const sql = require('mssql');

// Set up the connection with the data base

const config = {
  user: 'cli-db-superricas2',
  password: 'super2015',
  server: '129.213.14.98',
  database: 'SUPERRICASPRUEBA',
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
    console.log('Connection stablished');

    // Realiza la consulta
    const result = await sql.query`SELECT TOP 8 * FROM [dbo].[Cliente]`;

    result.recordset.forEach((client) => {
      resultData.push({
        name: client.Nombre,
        lastName: client.Apellido1,
        phone: '3212413656',
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
