import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Funcion para leer los datos del archivo JSON
async function readData(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Error code is: ', error.code);
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, devuelve un objeto vacío
      return {};
    } else {
      console.error('Error: ', error);
      throw error;
    }
  }
}

// Funcion para escribir los datos en el arhivo JSON
async function writeData(filePath, newData) {
  try {
    await writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');
    console.log('Los datos se escribieron correctamente');
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

// Usar las funciones construidas
(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'data', 'data.json'); // Ruta al archivo JSON

  // Leer los datos
  let datosExistentes = await readData(filePath);

  if (datosExistentes) {
    console.log('Los datos existentes son:', datosExistentes);
  } else {
    console.log('No se encontraron datos');
  }

  // Simular datos nuevos
  const nuevosDatos = {  };

  // Agregar o actualizar los nuevos datos en los datos existentes
  datosExistentes = { ...datosExistentes, ...nuevosDatos };

  // Escribir datos en el archivo JSON
  await writeData(filePath, datosExistentes);
})();
