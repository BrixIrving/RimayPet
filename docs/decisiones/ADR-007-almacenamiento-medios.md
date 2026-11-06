# ADR-007: Almacenamiento externo de medios

- **Estado:** Aceptada
- **Decisión:** fotos y videos se almacenan en Cloudflare R2 mediante un puerto `AlmacenMedios`; API emite URLs firmadas y no retransmite archivos.
- **Alternativas:** guardar binarios en PostgreSQL; servir archivos desde la API.
- **Consecuencias:** reduce ancho de banda y CPU de las VM; depende de límites y políticas del proveedor.
