/**
 * Puerto de salida: contrato que la infraestructura debe cumplir para guardar y leer reportes.
 * La aplicación solo conoce esta interfaz, nunca PostgreSQL ni PostGIS.
 */
export class RepositorioReportes {
  /** @param {import("../../domain/ReporteMascotaPerdida.js").ReporteMascotaPerdida} reporte */
  async guardar(reporte) { throw new Error("No implementado"); }
  /** @param {string} id */
  async buscarPorId(id) { throw new Error("No implementado"); }
}
