# Patrones arquitectónicos y de diseño

| Patrón | Problema | Aplicación en RimayPet | Atributo |
|---|---|---|---|
| Monolito modular | Complejidad de despliegue con un equipo pequeño | Seis módulos y un artefacto | Desplegabilidad |
| Clean Architecture | Reglas de negocio acopladas a frameworks | Cuatro capas por módulo | Mantenibilidad |
| Module Facade | Dependencias cruzadas entre módulos | `index.ts` expone casos de uso/consultas permitidas | Mantenibilidad |
| Repository | SQL mezclado con reglas de negocio | Puertos de repositorio por módulo | Testabilidad |
| Dependency Inversion | Dominio dependiente de proveedores | Puertos en Aplicación; adaptadores en Infraestructura | Mantenibilidad |
| Transactional Outbox | Pérdida de eventos si falla la publicación | Tabla Outbox insertada en la misma transacción del negocio | Disponibilidad |
| Idempotent Consumer | Reintentos con efectos duplicados | Tabla `eventos_procesados` con `eventId` único | Disponibilidad |
| Cache-aside | Lecturas repetidas del feed | Caché TTL 30 s e invalidación por publicación | Escalabilidad |
| Adapter | Dependencia de proveedores externos | `AlmacenMedios` para R2 y `ServicioPush` para VAPID | Mantenibilidad |
| Factory Method | Entidades creadas sin validar invariantes | `ReporteMascotaPerdida.crear()` | Integridad |
| Retry + Exponential Backoff | Fallos transitorios de Web Push/R2 | Hasta 5 intentos con espera creciente | Disponibilidad |
| Circuit Breaker | Llamadas repetidas a proveedor degradado | Adaptador push y almacenamiento | Disponibilidad |
| Rate Limiting | Abuso o picos de solicitudes | Caddy y middleware API por IP/usuario | Seguridad |
| Health Check | Instancias no saludables | `/health/live` y `/health/ready` | Disponibilidad |
| Strangler (futuro) | Necesidad futura de escalar un módulo por separado | Extracción de un módulo solo con evidencia de carga y equipo | Evolución |

## Patrones que NO se aplican

- No se usa API Gateway como microservicio independiente; Caddy es proxy inverso y la API contiene el middleware de autenticación.
- No se usa Redis Pub/Sub como bus de eventos durable.
- No se usa una base de datos por módulo; se usa una instancia PostgreSQL con esquemas separados.
- No se despliegan los módulos como contenedores separados.
