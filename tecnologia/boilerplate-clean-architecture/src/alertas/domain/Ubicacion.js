import { ErrorDeDominio } from "./errores.js";

/** Objeto de valor: coordenadas geográficas válidas. */
export class Ubicacion {
  constructor(latitud, longitud) {
    if (!Number.isFinite(latitud) || latitud < -90 || latitud > 90)
      throw new ErrorDeDominio("La latitud debe estar entre -90 y 90.");
    if (!Number.isFinite(longitud) || longitud < -180 || longitud > 180)
      throw new ErrorDeDominio("La longitud debe estar entre -180 y 180.");
    this.latitud = latitud;
    this.longitud = longitud;
    Object.freeze(this);
  }
}
