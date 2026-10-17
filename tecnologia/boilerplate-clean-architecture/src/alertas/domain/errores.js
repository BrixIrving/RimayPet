export class ErrorDeDominio extends Error {
  constructor(mensaje) { super(mensaje); this.name = "ErrorDeDominio"; }
}
export class ReporteNoEncontrado extends Error {
  constructor(id) { super(`No existe el reporte ${id}`); this.name = "ReporteNoEncontrado"; }
}
