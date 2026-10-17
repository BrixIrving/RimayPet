import { PublicadorEventos } from "../application/ports/PublicadorEventos.js";

/** Adaptador de ejemplo. En el sistema real sería PublicadorRedis (Redis Pub/Sub). */
export class PublicadorEventosMemoria extends PublicadorEventos {
  publicados = [];
  async publicar(evento) { this.publicados.push(evento); }
}
