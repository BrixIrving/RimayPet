# Trazabilidad: ¿de qué requisito sale cada componente?

| Componente (C4) | Historias | Requisitos funcionales | Drivers / calidad | ADR |
|---|---|---|---|---|
| PWA | HU01–HU06 | RF01–RF08 | DA05 | ADR-002 |
| API Gateway | (todas, acceso) | (transversal) | DA03, DA05, AC04 | ADR-002 |
| Servicio de Perfiles | HU01, HU06 | RF01, RF07, RF08 | DA03, DA06 | ADR-001, ADR-004, ADR-005 |
| Servicio de Publicaciones | HU02 | RF02, RF03 | DA01, AC01 | ADR-001, ADR-006, ADR-008 |
| Servicio de Mensajería | HU03 | RF04 | DA01, DA05, AC01 | ADR-001 |
| Servicio de Alertas | HU04 | RF05, RF06 | DA02, DA06 | ADR-003, ADR-004, ADR-005 |
| Servicio de Notificaciones | HU05 | RF06 | DA02, AC02, AC06 | ADR-003 |
| Redis (Pub/Sub y caché) | HU04, HU05 | RF06 | DA02, AC01 | ADR-003, ADR-008 |
| Bases PostgreSQL | (todas) | (persistencia) | DA01 | ADR-005 |
| CDN de medios | HU02 | RF02 | DA04, AC01 | ADR-006 |
| Servicio push | HU05 | RF06 | DA02 | ADR-003 |
| Docker Compose y CI/CD | (despliegue) | — | DA04, RC05 | ADR-007 |

## Trazabilidad con escenarios de calidad

| Escenario | Componentes que lo cumplen |
|---|---|
| EQ-01 Rendimiento | Publicaciones, Redis (caché), PostgreSQL |
| EQ-02 Disponibilidad | Alertas, Redis Pub/Sub, Notificaciones |
| EQ-03 Escalabilidad | Mensajería y contenedores independientes |
| EQ-04 Seguridad | API Gateway, Perfiles (JWT) |
| EQ-05 Mantenibilidad | Capas de Clean Architecture, puertos y adaptadores |
| EQ-06 Observabilidad | Alertas, Notificaciones, registros estructurados |
