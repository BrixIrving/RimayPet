import test from "node:test";
import assert from "node:assert/strict";
import { configurar } from "../src/composition/configurar.js";

const cuerpo = { idMascota: "m-1", nombreMascota: "Canela", latitud: -13.16, longitud: -74.22, radioKm: 3 };

test("reportar guarda el reporte y publica el evento MascotaPerdidaReportada", async () => {
  const { controlador, repositorio, publicador } = configurar();
  const r = await controlador.postAlerta({ cuerpo });
  assert.equal(r.estado, 201);
  assert.ok(await repositorio.buscarPorId(r.cuerpo.id));
  assert.equal(publicador.publicados.length, 1);
  assert.equal(publicador.publicados[0].tipo, "MascotaPerdidaReportada");
  assert.equal(publicador.publicados[0].datos.radioKm, 3);
});
test("un reporte inválido responde 400 y no publica eventos", async () => {
  const { controlador, publicador } = configurar();
  const r = await controlador.postAlerta({ cuerpo: { ...cuerpo, radioKm: 99 } });
  assert.equal(r.estado, 400);
  assert.equal(publicador.publicados.length, 0);
});
test("el estado se consulta sin sesión y un id inexistente responde 404", async () => {
  const { controlador } = configurar();
  const creado = await controlador.postAlerta({ cuerpo });
  assert.equal((await controlador.getEstado({ parametros: { id: creado.cuerpo.id } })).cuerpo.estado, "perdida");
  assert.equal((await controlador.getEstado({ parametros: { id: "no-existe" } })).estado, 404);
});
