import { RepositorioReportes } from "../application/ports/RepositorioReportes.js";

/** Adaptador de ejemplo. En el sistema real sería RepositorioReportesPostGIS. */
export class RepositorioReportesMemoria extends RepositorioReportes {
  #reportes = new Map();
  async guardar(reporte) { this.#reportes.set(reporte.id, reporte); }
  async buscarPorId(id) { return this.#reportes.get(id) ?? null; }
}
