// Raíz de composición: el ÚNICO lugar que conoce todas las capas.
// Cambiar de tecnología = cambiar los adaptadores que se crean aquí.
import { randomUUID } from "node:crypto";
import { RepositorioReportesMemoria } from "../alertas/infrastructure/RepositorioReportesMemoria.js";
import { PublicadorEventosMemoria } from "../alertas/infrastructure/PublicadorEventosMemoria.js";
import { ReportarMascotaPerdida } from "../alertas/application/casos-de-uso/ReportarMascotaPerdida.js";
import { ConsultarEstadoPublico } from "../alertas/application/casos-de-uso/ConsultarEstadoPublico.js";
import { AlertasController } from "../alertas/presentation/AlertasController.js";

export function configurar() {
  const repositorio = new RepositorioReportesMemoria();
  const publicador = new PublicadorEventosMemoria();
  const controlador = new AlertasController({
    reportarMascotaPerdida: new ReportarMascotaPerdida({ repositorio, publicador, generarId: randomUUID }),
    consultarEstadoPublico: new ConsultarEstadoPublico({ repositorio }),
  });
  return { controlador, repositorio, publicador };
}
