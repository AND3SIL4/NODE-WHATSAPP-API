import { formatoPrecio } from "../validators/priceFormat.js";

/**
 * This function is a structure for making a response in order to be sent to the user
 * @param {JSON object} element
 * @returns {string} body
 */
export const TextToBeSend = (element) => {
  const {
    RazonSocial,
    DocNum,
    EstadoPedido,
    FchaInsert,
    FchaInsertSAP,
    TipoDcmnto,
    ValorBruto,
    ValorTotal,
    ZonaSN,
    DistEDS,
  } = element;

  const weekDays = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  const genesis = new Date(FchaInsert);
  const sap = new Date(FchaInsertSAP);

  const dayFechaGenesis = weekDays[genesis.getDay() - 1];
  const dayFechaSap = weekDays[sap.getDay() - 1];

  //Obtain the hour, minutes and seconds in UTC
  const hourFechaGenesis = ("0" + genesis.getUTCHours()).slice(-2);
  const minutesFechaGenesis = ("0" + genesis.getUTCMinutes()).slice(-2);
  const secondsFechaGenesis = ("0" + genesis.getUTCSeconds()).slice(-2);

  const hourFechaSap = ("0" + sap.getUTCHours()).slice(-2);
  const minutesFechaSap = ("0" + sap.getUTCMinutes()).slice(-2);
  const secondsFechaSap = ("0" + sap.getUTCSeconds()).slice(-2);

  //Pass the date to show in a message
  const genesisInsert = `${dayFechaGenesis} ${genesis.getUTCDate()} ${hourFechaGenesis}:${minutesFechaGenesis}:${secondsFechaGenesis}`;
  const sapInsert = `${dayFechaSap} ${sap.getUTCDate()} ${hourFechaSap}:${minutesFechaSap}:${secondsFechaSap}`;

  //Format prices
  const valorBruto = formatoPrecio(ValorBruto);
  const valorTotal = formatoPrecio(ValorTotal);

  // Structure message for being send
  const body = `Buen día 😊, queremos informarte los siguientes datos del pedido #${DocNum}
*EDS*: ${DistEDS}
*Distribuidora*: ${RazonSocial} 
*Zona SN*: ${ZonaSN} 
${
  EstadoPedido === "Insertado"
    ? `Fue *recibido* en génesis el ${genesisInsert} y fue insertado en SAP el ${sapInsert}
*Estado*: ${
        TipoDcmnto === "Orden"
          ? "exitoso ✅"
          : "retenido por cartera 🔻, por favor comunicarse lo más pronto posible con cartera"
      }
*Valor bruto*: ${valorBruto} 
*Valor total*: ${valorTotal}`
    : "*no se pudo recibir debido a un error, por favor comuníquese con el area TIC 🔻*"
} `;

  return body;
};

