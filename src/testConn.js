import mssql from "mssql";
import { config } from "dotenv";
import { ColorsStylesForText as textStyle } from "./styles/textStyle.js";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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
 * Function to connect a data base
 * @returns {string[]} resultData is an array that contains the result data of the query set
 */
async function connectDataBase() {
  try {
    await mssql.connect(settings);
    text.onSuccess("Connection established successfully", true);

    // Realiza la consulta
    const result = await mssql.query`
    SELECT P.DocNum, 
    P.FchaInsert, 
    P.CardCode, 
    P.ZonaSN, 
    P.EstadoPedido, 
    P.PedidoSAP, 
    P.FchaInsertSAP, 
    P.TipoDcmnto, 
    P.ValorBruto, 
    P.ValorTotal,
    D.RazonSocial, 
    D.DistContacto, 
    D.DistTelefono, 
    D.DistActivo, 
    D.DistEDS, 
    D.Coordinador, 
    D.TelfCoord,
    CASE P.EstadoPedido WHEN 'ERROR' THEN (SELECT substring(Mnsje,65,50) FROM CSS_Mnsje_SrvcioWin 
    WHERE ObjType like '%Orden Venta%' and DocNum = P.DocNum GROUP BY substring(Mnsje,65,50)) END Error
    FROM CSS_PedidoPreventa P
    INNER JOIN WS_Distribuidor D
    ON D.DistCodigo = P.CardCode
    WHERE P.FchaInsert >= dateadd(MINUTE,-60,getdate())
    and P.EstadoPedido <> 'Pendiente'
    order by DocNum
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

export async function readData(filePath) {
  try {
    const data = await readFile(filePath, "utf8");
    // Valida si el archivo esta vacío y devuelve una lista vacía
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (e) {
    console.log("Error code is: ", e);
    if (e.code === "ENOENT") {
      return [];
    } else {
      text.onFailed(e);
      throw new Error("Error al leer los archivos");
    }
  }
}

/**
 * This function take new data and write and update the data in a local file
 * @param {string} filePath
 * @param {object} newData
 */
async function writeData(filePath, newData) {
  try {
    await writeFile(filePath, JSON.stringify(newData, null, 2), "utf8");
    text.onSuccess("Data save correctly", true);
  } catch (e) {
    text.onFailed(e);
    throw new Error("Error al guardar los datos");
  }
}

export async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "../data", "data.json");

  // Leer los datos existentes
  let datosExistentes = await readData(filePath);

  if (datosExistentes) {
    text.onInfo("Datos encontrados exitosamente");
  } else {
    text.onFailed("No se encontraron datos");
  }

  // Tomar los nuevos datos
  const nuevosDatos = await connectDataBase();

  let datosParaAgregar = [];

  // Counters
  let exist = 0;
  let noExist = 0;

  // Iterator to validate if the messages has sent before
  nuevosDatos.forEach((datoNuevo) => {
    let datoExiste = false;
    datosExistentes.forEach((datoExistente) => {
      if (
        datoNuevo.DocNum === datoExistente.DocNum &&
        datoNuevo.TipoDcmnto === datoExistente.TipoDcmnto
      ) {
        datoExiste = true;
        return;
      }
    });

    if (!datoExiste) {
      datosParaAgregar.push(datoNuevo);
      exist++;
    } else {
      noExist++;
    }
  });
  console.log("Total new data: ", exist);
  console.log("Total exist data: ", noExist);

  // Escribir datos en el archivo JSON
  await writeData(filePath, [...datosExistentes, ...datosParaAgregar]);

  return datosParaAgregar;
}
