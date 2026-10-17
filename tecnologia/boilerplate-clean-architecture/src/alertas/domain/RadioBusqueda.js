import { ErrorDeDominio } from "./errores.js";

/** Objeto de valor: radio de la alerta en kilómetros (entre 0,5 y 20). */
export class RadioBusqueda {
  static MIN_KM = 0.5;
  static MAX_KM = 20;
  static POR_DEFECTO_KM = 5;

  constructor(km = RadioBusqueda.POR_DEFECTO_KM) {
    if (!Number.isFinite(km) || km < RadioBusqueda.MIN_KM || km > RadioBusqueda.MAX_KM)
      throw new ErrorDeDominio(`El radio debe estar entre ${RadioBusqueda.MIN_KM} y ${RadioBusqueda.MAX_KM} km.`);
    this.km = km;
    Object.freeze(this);
  }
}
