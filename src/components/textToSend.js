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
    insertDate,
    TipoDcmnto,
    ValorBruto,
    ValorTotal,
    ZonaSN,
    DistEDS,
  } = element;

  // Structure message for being send
  const body = `BUEN DÍA 😊, QUEREMOS INFÓRMATE LOS SIGUIENTES DATOS DE TU PEDIDO #${DocNum}
*EDS*: ${DistEDS}
*DISTRIBUIDORA*: ${RazonSocial} 
*ZONA SN*: ${ZonaSN} 
${
EstadoPedido === "Insertado"
? `FUE *RECIBIDO* EN GÉNESIS EN LA FECHA: ${FchaInsert} Y FUE *INSERTADO* EN SAP EN LA FECHA: ${insertDate}
*ESTADO*: ${
TipoDcmnto === "Orden"
? "EXITOSO ✅"
: "*RETENIDO POR CARTERA 🔻*, POR FAVOR COMUNICARSE LO MÁS PRONTO POSIBLE CON EL AREA ENCARGADA"
}
*VALOR BRUTO*: $${ValorBruto} 
*VALOR TOTAL*: $${ValorTotal}`
    : "*NO SE PUDO RECIBIR, DEBIDO A UN ERROR 🔻*"
} `;

  return body;
};
