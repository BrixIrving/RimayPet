/**
 * Puerto de salida: publica eventos de la comunidad (por ejemplo, MascotaPerdidaReportada).
 * La infraestructura lo implementa con Redis Pub/Sub.
 */
export class PublicadorEventos {
  /** @param {{tipo: string, datos: object}} evento */
  async publicar(evento) { throw new Error("No implementado"); }
}
