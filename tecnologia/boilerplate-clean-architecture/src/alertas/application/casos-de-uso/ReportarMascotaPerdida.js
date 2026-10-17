import { ReporteMascotaPerdida } from "../../domain/ReporteMascotaPerdida.js";

/**
 * Caso de uso (RF05 y RF06): crea el reporte, lo guarda y publica el evento.
 * Responde sin esperar a que se envíen las notificaciones (driver DA02).
 */
export class ReportarMascotaPerdida {
  constructor({ repositorio, publicador, generarId }) {
    this.repositorio = repositorio;
    this.publicador = publicador;
    this.generarId = generarId;
  }

  async ejecutar(datos) {
    const reporte = ReporteMascotaPerdida.crear({ ...datos, id: this.generarId() });
    await this.repositorio.guardar(reporte);
    await this.publicador.publicar({
      tipo: "MascotaPerdidaReportada",
      datos: {
        idReporte: reporte.id,
        nombreMascota: reporte.nombreMascota,
        latitud: reporte.ubicacion.latitud,
        longitud: reporte.ubicacion.longitud,
        radioKm: reporte.radio.km,
      },
    });
    return { id: reporte.id, estado: reporte.estado };
  }
}
