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
  const body = `Buen día 😊, queremos infórmate que el pedido #${DocNum} de la EDS ${DistEDS} y distribuidora ${RazonSocial} realizado desde la zona SN: ${ZonaSN} ${
    EstadoPedido === "Insertado"
      ? `fue recibido desde génesis a las ${FchaInsert} y fue insertado en SAP a las ${insertDate}. El estado del pedido es: ${
          TipoDcmnto === "Orden"
            ? "EXITOSO ✅"
            : "RETENIDO POR CARTERA 🔻, por favor comunicarse lo más pronto posible con el area encargada"
        }. Valor bruto: $${ValorBruto} y Valor total es de: $${ValorTotal}.`
      : "no se pudo recibir debido a un error"
  } `;

  return body;
};
