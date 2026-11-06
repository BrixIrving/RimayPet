# Índice de decisiones arquitectónicas

Las decisiones completas se mantienen en `docs/decisiones/`.

| ADR | Decisión | Estado |
|---|---|---|
| ADR-001 | Monolito modular como estilo arquitectónico | Aceptada |
| ADR-002 | Clean Architecture dentro de cada módulo | Aceptada |
| ADR-003 | Fachadas públicas y eventos con Transactional Outbox | Aceptada |
| ADR-004 | PostgreSQL/PostGIS con un esquema por módulo | Aceptada |
| ADR-005 | Seguridad transversal: Caddy, JWT, Argon2id y autorización | Aceptada |
| ADR-006 | PWA, REST y WebSocket en una aplicación | Aceptada |
| ADR-007 | Medios externos con URL firmadas | Aceptada |
| ADR-008 | Dos VM Oracle y despliegue Docker Compose | Aceptada |
| ADR-009 | Caché cache-aside para feed y lecturas frecuentes | Aceptada |
| ADR-010 | API sin estado y segunda instancia condicional detrás de Caddy | Aceptada con condición |
| ADR-011 | SDD, pruebas automáticas y CI/CD | Aceptada |

Las ADR antiguas de microservicios, bases independientes por servicio y Redis Pub/Sub quedan sustituidas.
