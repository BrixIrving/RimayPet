# Decisiones arquitectónicas (ADR)

Cada ADR (Architecture Decision Record) registra el contexto, la decisión y sus consecuencias.

## Resumen

| ID | Decisión | Driver | Estado |
|---|---|---|---|
| ADR-001 | Arquitectura de microservicios | DA01, DA06 | Aceptada |
| ADR-002 | API Gateway como punto único de entrada, con validación de JWT | DA03, DA05 | Aceptada |
| ADR-003 | Eventos asíncronos con Redis Pub/Sub | DA02 | Aceptada |
| ADR-004 | Clean Architecture dentro de cada servicio | DA06 | Aceptada |
| ADR-005 | Una base PostgreSQL por servicio, con PostGIS | DA01, DA06 | Aceptada |
| ADR-006 | Medios servidos desde un CDN gratuito | DA04, AC01 | Aceptada |
| ADR-007 | Docker Compose en dos servidores gratuitos y CI/CD con GitHub Actions | DA04 | Aceptada |
| ADR-008 | Caché del feed en Redis | DA02, AC01 | Aceptada |

## ADR-001. Arquitectura de microservicios
- **Contexto:** feed, mensajería y alertas tienen cargas distintas (DA01) y RC05 exige desplegar en más de un servidor.
- **Decisión:** un microservicio por capacidad de negocio: Perfiles (con Moderación), Publicaciones, Mensajería, Alertas y Notificaciones.
- **Alternativas:** monolito modular (opción del marketplace de ejemplo).
- **Consecuencias:** + escalado y despliegue independientes; − mayor complejidad operativa para una sola persona (se mitiga con Docker Compose).

## ADR-002. API Gateway con validación de JWT
- **Contexto:** RC04 exige acceso centralizado; DA03 exige proteger datos.
- **Decisión:** el servicio de Perfiles emite el JWT; el Gateway lo valida en cada petición y al abrir el WebSocket.
- **Consecuencias:** + seguridad en un solo punto; − el Gateway es un punto único de fallo (se mitiga con reinicio automático del contenedor).

## ADR-003. Eventos asíncronos con Redis Pub/Sub
- **Contexto:** una alerta puede alcanzar a toda la comunidad (DA02).
- **Decisión:** Alertas publica el evento `MascotaPerdidaReportada`; Notificaciones lo consume y envía las alertas.
- **Alternativas:** llamadas síncronas directas (descartada: bloquean a quien reporta).
- **Consecuencias:** + desacoplamiento y respuesta inmediata; − Pub/Sub no persiste mensajes si el consumidor está caído (se acepta en esta fase; alternativa futura: Redis Streams).

## ADR-004. Clean Architecture dentro de cada servicio
- **Contexto:** DA06 pide cambiar funcionalidades sin afectar otras y aislar tecnologías gratuitas que pueden cambiar.
- **Decisión:** cuatro capas por servicio: Dominio, Aplicación, Presentación e Infraestructura. Aplicación completa en Alertas y Perfiles, y más ligera en Publicaciones, Mensajería y Notificaciones.
- **Alternativas:** Arquitectura Hexagonal (equivalente en la práctica; se conserva su idea de puertos y adaptadores).
- **Consecuencias:** + pruebas del dominio sin infraestructura; − más carpetas e interfaces.

## ADR-005. Una base PostgreSQL por servicio, con PostGIS
- **Decisión:** bases independientes para Perfiles, Publicaciones, Mensajería y Alertas. PostGIS en Alertas y Perfiles para consultas por radio.
- **Consecuencias:** + independencia de datos; − no hay consultas entre servicios (se resuelven por API o eventos). Notificaciones no tiene base propia: consulta destinatarios a Perfiles.

## ADR-006. CDN gratuito para medios
- **Decisión:** Cloudflare R2 o Supabase Storage detrás del puerto `AlmacenMedios`.
- **Consecuencias:** + los servidores propios no sirven fotos ni videos; − dependencia de planes gratuitos (mitigada por el puerto).

## ADR-007. Docker Compose y CI/CD
- **Decisión:** dos servidores de Oracle Cloud Free Tier (aplicación y datos), Docker Compose y GitHub Actions.
- **Consecuencias:** + despliegues repetibles con costo cero; − sin orquestador, el escalado horizontal es manual.

## ADR-008. Caché del feed en Redis
- **Decisión:** el feed y las consultas frecuentes se cachean con expiración, reutilizando el Redis del bus de eventos.
- **Consecuencias:** + menos lecturas a la base; − hay que invalidar la caché al publicar.
