import { ErrorDeDominio } from "./errores.js";
import { Ubicacion } from "./Ubicacion.js";
import { RadioBusqueda } from "./RadioBusqueda.js";

export const EstadoReporte = Object.freeze({
  PERDIDA: "perdida",
  AVISTADA: "avistada",
  ENCONTRADA: "encontrada",
});

/** Entidad: reporte de una mascota perdida. Solo se crea con `crear` (método de fábrica). */
export class ReporteMascotaPerdida {
  #estado;

  constructor({ id, idMascota, nombreMascota, descripcion, ubicacion, radio, estado }) {
    this.id = id;
    this.idMascota = idMascota;
    this.nombreMascota = nombreMascota;
    this.descripcion = descripcion;
    this.ubicacion = ubicacion;
    this.radio = radio;
    this.#estado = estado;
  }

  static crear({ id, idMascota, nombreMascota, descripcion = "", latitud, longitud, radioKm }) {
    if (!id) throw new ErrorDeDominio("El reporte necesita un identificador.");
    if (!idMascota) throw new ErrorDeDominio("El reporte debe indicar la mascota.");
    if (!nombreMascota || !nombreMascota.trim()) throw new ErrorDeDominio("El reporte debe indicar el nombre de la mascota.");
    return new ReporteMascotaPerdida({
      id, idMascota, nombreMascota: nombreMascota.trim(), descripcion,
      ubicacion: new Ubicacion(latitud, longitud),
      radio: new RadioBusqueda(radioKm),
      estado: EstadoReporte.PERDIDA,
    });
  }

  get estado() { return this.#estado; }

  marcarAvistada() {
    if (this.#estado === EstadoReporte.ENCONTRADA)
      throw new ErrorDeDominio("Un reporte encontrado no puede volver a avistada.");
    this.#estado = EstadoReporte.AVISTADA;
  }

  marcarEncontrada() { this.#estado = EstadoReporte.ENCONTRADA; }
}
