import { ReporteNoEncontrado } from "../../domain/errores.js";

/** Caso de uso (RF05): consulta pública del estado, sin sesión. */
export class ConsultarEstadoPublico {
  constructor({ repositorio }) { this.repositorio = repositorio; }

  async ejecutar({ id }) {
    const reporte = await this.repositorio.buscarPorId(id);
    if (!reporte) throw new ReporteNoEncontrado(id);
    return { id: reporte.id, nombreMascota: reporte.nombreMascota, estado: reporte.estado };
  }
}
