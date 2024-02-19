/**
 * This is the file that consult the database and return the result with a dictionary of data
 * @param {} void
 * @returns {string[]} object 
 */

function connectionData() {
  const object = [
    {
      body: 'Buenos dias estimado cliente... este es un mensaje de prueba',
      to: '3212413656',
    },
    {
      body: 'Este es un mensaje de prueba',
      to: '3212413656',
    },
    {
      body: 'Buenos dias es un mensaje de prueba',
      to: '3212413656',
    },
    {
      body: 'Es un mensaje de prueba',
      to: '3212413656',
    },
  ];

  return object;
}

module.exports = connectionData;
