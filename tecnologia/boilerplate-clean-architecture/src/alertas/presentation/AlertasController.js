import { ErrorDeDominio, ReporteNoEncontrado } from "../domain/errores.js";

/**
 * Controlador sin framework: recibe una petición simple y devuelve { estado, cuerpo }.
 * En el sistema real, Express, Spring Boot o FastAPI solo llamarían a estos métodos.
 */
export class AlertasController {
  constructor({ reportarMascotaPerdida, consultarEstadoPublico }) {
    this.reportarMascotaPerdida = reportarMascotaPerdida;
    this.consultarEstadoPublico = consultarEstadoPublico;
  }

  async postAlerta({ cuerpo }) {
    try {
      const resultado = await this.reportarMascotaPerdida.ejecutar(cuerpo);
      return { estado: 201, cuerpo: resultado };
    } catch (e) { return this.#error(e); }
  }

  async getEstado({ parametros }) {
    try {
      return { estado: 200, cuerpo: await this.consultarEstadoPublico.ejecutar({ id: parametros.id }) };
    } catch (e) { return this.#error(e); }
  }

  #error(e) {
    if (e instanceof ErrorDeDominio) return { estado: 400, cuerpo: { error: e.message } };
    if (e instanceof ReporteNoEncontrado) return { estado: 404, cuerpo: { error: e.message } };
    return { estado: 500, cuerpo: { error: "Error interno" } };
  }
}
