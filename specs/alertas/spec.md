# Especificación — módulo Alertas

## Objetivo
Administrar reportes de mascotas perdidas, avistamientos, transiciones de estado y consulta pública limitada.

## Historias relacionadas
HU04, HU16, HU17 y HU18.

## Requisitos
RF08, RF09 y parte de RF10.

## Reglas de negocio
- Solo propietario o rol autorizado puede reportar la pérdida de su mascota.
- La ubicación debe cumplir rangos geográficos válidos.
- El radio debe estar dentro del rango configurado por producto.
- El reporte inicia en `PERDIDA`.
- Los cambios de estado siguen transiciones permitidas.
- La consulta pública expone solo campos expresamente autorizados.
- La creación del reporte y el evento Outbox se confirman en una sola transacción.

## Casos de uso
- `ReportarMascotaPerdida`
- `RegistrarAvistamiento`
- `ActualizarEstadoReporte`
- `ConsultarEstadoPublico`

## Puertos
- `RepositorioReportes`
- `PublicadorEventos`
- `Reloj` (si la lógica requiere tiempo controlable)

## Eventos
- Publica `MascotaPerdidaReportada`
- Publica `AvistamientoRegistrado`
- Publica `EstadoReporteCambiado`

## Criterios de aceptación
- AC-HU04-01: reporte válido devuelve 201 y un identificador.
- AC-HU04-02: la fila del reporte y la fila Outbox existen o ninguna existe.
- AC-HU16-01: el avistamiento queda asociado al reporte y autor.
- AC-HU17-01: solo el propietario/rol autorizado cambia el estado.
- AC-HU18-01: consulta pública no revela ubicación exacta ni datos privados.

## Pruebas
Unitarias de reglas de dominio; integración de repositorio y Outbox; autorización; contrato HTTP; prueba de fallo del worker.
