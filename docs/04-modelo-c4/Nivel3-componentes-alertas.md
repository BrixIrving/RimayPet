# C4 — Nivel 3: componentes del módulo Alertas

![C4 nivel 3](../diagramas/c4-nivel3-alertas.svg)

```mermaid
flowchart TB
  HTTP[AlertasController · Presentación] --> UC1[ReportarMascotaPerdida · Aplicación]
  HTTP --> UC2[RegistrarAvistamiento · Aplicación]
  HTTP --> UC3[ActualizarEstadoReporte · Aplicación]
  HTTP --> UC4[ConsultarEstadoPublico · Aplicación]
  UC1 --> DOM[ReporteMascotaPerdida · Dominio]
  UC2 --> DOM
  UC3 --> DOM
  UC1 --> PORT1[RepositorioReportes · Puerto]
  UC1 --> PORT2[PublicadorEventos · Puerto]
  UC2 --> PORT2
  PORT1 -. implementado por .-> PG[RepositorioPostgres · Infraestructura]
  PORT2 -. implementado por .-> OUT[PublicadorOutbox · Infraestructura]
  PG --> DB[(PostgreSQL / esquema alertas)]
  OUT --> DB
  WORKER[Worker compartido] --> DB
```

| Componente | Capa | Responsabilidad |
|---|---|---|
| AlertasController | Presentación | Validar DTO HTTP y traducir respuesta. |
| ReportarMascotaPerdida | Aplicación | Orquestar validación, persistencia y evento. |
| RegistrarAvistamiento | Aplicación | Registrar avistamiento y producir evento. |
| ActualizarEstadoReporte | Aplicación | Validar transición y cambiar estado. |
| ConsultarEstadoPublico | Aplicación | Exponer solo campos públicos autorizados. |
| ReporteMascotaPerdida, Ubicacion, RadioBusqueda | Dominio | Reglas, invariantes y estados. |
| RepositorioReportes | Puerto | Contrato de persistencia. |
| PublicadorEventos | Puerto | Contrato para registrar evento en Outbox. |
| RepositorioPostgres | Infraestructura | Implementación SQL/PostGIS. |
| PublicadorOutbox | Infraestructura | Inserta evento dentro de la misma transacción. |
