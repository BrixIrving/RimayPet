# ADR-003: Fachadas públicas y eventos con Transactional Outbox

- **Estado:** Aceptada
- **Contexto:** los módulos necesitan consultar datos de otros módulos y propagar efectos como alertas push sin bloquear la petición.
- **Decisión:** consultas inmediatas mediante fachada pública y DTO inmutables. Efectos diferidos mediante eventos guardados en Outbox dentro de la misma transacción del cambio de negocio.
- **Alternativas:** llamadas directas entre módulos; Redis Pub/Sub como bus; broker externo.
- **Consecuencias positivas:** no hay dependencia de red entre módulos; Outbox evita perder eventos confirmados si el worker está caído.
- **Consecuencias negativas:** entrega al menos una vez; requiere idempotencia, reintentos y gestión de dead-letter.
- **Verificación:** pruebas de atomicidad, concurrencia con `FOR UPDATE SKIP LOCKED` e idempotencia.
