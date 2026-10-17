import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = new URL("../src/alertas/", import.meta.url).pathname;
const archivos = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? archivos(p) : [p];
}).filter((p) => p.endsWith(".js"));
const importaciones = (f) => [...readFileSync(f, "utf8").matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);

test("el dominio no importa ninguna otra capa", () => {
  for (const f of archivos(join(base, "domain")))
    for (const i of importaciones(f))
      assert.ok(i.startsWith("./"), `${f} importa ${i}`);
});
test("la aplicación no importa infraestructura ni presentación", () => {
  for (const f of archivos(join(base, "application")))
    for (const i of importaciones(f))
      assert.ok(!/infrastructure|presentation/.test(i), `${f} importa ${i}`);
});
