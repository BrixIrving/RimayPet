import test from "node:test";
import assert from "node:assert/strict";
import { ReporteMascotaPerdida, EstadoReporte } from "../src/alertas/domain/ReporteMascotaPerdida.js";
import { ErrorDeDominio } from "../src/alertas/domain/errores.js";

const datos = { id: "r-1", idMascota: "m-1", nombreMascota: "Canela", latitud: -13.16, longitud: -74.22, radioKm: 5 };

test("un reporte nuevo nace en estado perdida", () => {
  assert.equal(ReporteMascotaPerdida.crear(datos).estado, EstadoReporte.PERDIDA);
});
test("rechaza una latitud fuera de rango", () => {
  assert.throws(() => ReporteMascotaPerdida.crear({ ...datos, latitud: 95 }), ErrorDeDominio);
});
test("rechaza un radio fuera de 0,5 a 20 km", () => {
  assert.throws(() => ReporteMascotaPerdida.crear({ ...datos, radioKm: 50 }), ErrorDeDominio);
  assert.throws(() => ReporteMascotaPerdida.crear({ ...datos, radioKm: 0.1 }), ErrorDeDominio);
});
test("un reporte encontrado no puede volver a avistada", () => {
  const r = ReporteMascotaPerdida.crear(datos);
  r.marcarEncontrada();
  assert.throws(() => r.marcarAvistada(), ErrorDeDominio);
});
