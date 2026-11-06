# ADR-009: Caché cache-aside para el feed

- **Estado:** Aceptada
- **Decisión:** caché de lecturas frecuentes del feed con TTL inicial de 30 s, límite de memoria, paginación por cursor e invalidación al crear publicaciones. Si hay dos API, se notifica invalidación mediante PostgreSQL NOTIFY; TTL es la salvaguarda.
- **Alternativas:** sin caché; Redis como infraestructura obligatoria.
- **Consecuencias:** menor presión de lectura sobre PostgreSQL; posible dato ligeramente desactualizado hasta invalidación/TTL.
