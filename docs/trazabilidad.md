# Matriz de trazabilidad de RimayPet

| Componente / módulo | Historias | RF | Drivers / EQ | ADR |
|---|---|---|---|---|
| Identidad | HU07 | RF01 | DA03, EQ-05, EQ-06 | ADR-005 |
| Perfiles | HU01, HU06, HU08, HU15, HU20, HU22–HU25 | RF02, RF03, RF12, RF14, RF15 | DA03, DA06, EQ-06, EQ-09 | ADR-002, ADR-004, ADR-005 |
| Publicaciones | HU02, HU09–HU13, HU19, HU21 | RF04–RF06, RF12, RF13 | DA01, DA06, EQ-01, EQ-09 | ADR-001, ADR-002, ADR-009 |
| Mensajería | HU03 | RF07 | DA01, DA05, EQ-01, EQ-03 | ADR-001, ADR-006 |
| Alertas | HU04, HU16–HU18 | RF08–RF10 | DA02, DA03, EQ-02, EQ-03 | ADR-003, ADR-004 |
| Notificaciones | HU05, HU14 | RF10, RF11 | DA02, DA07, EQ-03, EQ-04 | ADR-003 |
| PWA / Caddy | Todas las historias de interacción | Transversal | DA03, DA05, EQ-05, EQ-07 | ADR-005, ADR-006, ADR-008 |
| PostgreSQL / Outbox | HU04, HU05, HU16, HU17 | RF08–RF11 | DA02, DA07, EQ-03, EQ-04 | ADR-003, ADR-004 |
| R2 / Web Push | HU02, HU05, HU08, HU14 | RF04, RF11 | DA01, DA02, EQ-04 | ADR-007 |
| CI/CD | Todas las entregas | — | DA04, DA07, EQ-07, EQ-08 | ADR-008, ADR-011 |

## Trazabilidad de calidad

| Escenario | Componentes |
|---|---|
| EQ-01 | API, Publicaciones, caché, PostgreSQL, Caddy |
| EQ-02 | API, Alertas, Outbox, Worker, Notificaciones |
| EQ-03 | API, Worker, Outbox, Docker Compose |
| EQ-04 | Worker, adaptadores R2/Web Push, dead-letter |
| EQ-05 | Caddy, middleware JWT, WebSocket |
| EQ-06 | Fachadas, políticas de autorización y repositorios |
| EQ-07–EQ-08 | GitHub Actions, Docker Compose y health checks |
| EQ-09 | Puertos y adaptadores de Infraestructura |
| EQ-10 | Logs estructurados, `correlationId`, Outbox y worker |

La trazabilidad detallada por criterio de aceptación y prueba se ampliará durante la implementación de cada historia.
