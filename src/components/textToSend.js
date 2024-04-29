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
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
    "DOMINGO",
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
  const body = `BUEN DÍA 😊, QUEREMOS INFÓRMATE LOS SIGUIENTES DATOS DE TU PEDIDO #${DocNum}
*EDS*: ${DistEDS}
*DISTRIBUIDORA*: ${RazonSocial} 
*ZONA SN*: ${ZonaSN} 
${
  EstadoPedido === "Insertado"
    ? `FUE *RECIBIDO* EN GÉNESIS EL ${genesisInsert} Y FUE INSERTADO EN SAP EL ${sapInsert}
*ESTADO*: ${
        TipoDcmnto === "Orden"
          ? "EXITOSO ✅"
          : "RETENIDO POR CARTERA 🔻, POR FAVOR COMUNICARSE LO MÁS PRONTO POSIBLE CON CARTERA"
      }
*VALOR BRUTO*: ${valorBruto} 
*VALOR TOTAL*: ${valorTotal}`
    : "*NO SE PUDO RECIBIR, DEBIDO A UN ERROR 🔻*"
} `;

  return body;
};
