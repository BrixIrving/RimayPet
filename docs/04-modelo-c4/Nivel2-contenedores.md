# C4 — Nivel 2: contenedores

El monolito modular se despliega como una aplicación con dos procesos (API y worker) construidos desde el mismo código. PostgreSQL es el único almacén relacional; los esquemas están separados por módulo.

![C4 nivel 2](../diagramas/c4-nivel2-contenedores.svg)

```mermaid
flowchart TB
  U[Dueño / Moderador / Visitante] -->|HTTPS| C[Caddy · TLS, reverse proxy, rate limit]
  C -->|HTTP REST / WebSocket| API[Proceso API · Node.js]
  API -->|Fachadas locales| MOD[Seis módulos de negocio]
  API -->|SQL / transacciones| DB[(PostgreSQL + PostGIS)]
  W[Proceso Worker · mismo artefacto] -->|Reclama Outbox| DB
  W -->|Consume eventos| MOD
  API -->|URL firmada| R2[Cloudflare R2]
  U -.->|Subida/descarga directa| R2
  W -->|HTTPS + VAPID| PUSH[Web Push]
  DB -->|NOTIFY · señal entre instancias| API2[API secundaria opcional]
  C -.->|Balanceo solo si se activa| API2
```

| Contenedor | Tecnología | Responsabilidad |
|---|---|---|
| PWA | React | Interfaz responsive e instalable. |
| Caddy | Caddy | TLS, reverse proxy, compresión, rate limit y distribución HTTP. |
| Proceso API | Node.js / TypeScript | REST, WebSocket, autenticación, composición de módulos. |
| Proceso Worker | Node.js / TypeScript | Outbox, notificaciones y tareas diferidas. Mismo código/imagen que API. |
| PostgreSQL + PostGIS | PostgreSQL | Una instancia primaria; esquemas por módulo, índices geoespaciales y Outbox. |
| Cloudflare R2 | Object Storage | Fotos y videos; transferencia directa con URL firmada. |
| Web Push | VAPID | Entrega push a navegadores suscritos. |

## Despliegue físico

- **Servidor 1:** Caddy, PWA, API principal y worker.
- **Servidor 2:** PostgreSQL/PostGIS; API secundaria opcional detrás de Caddy si la CPU de la base mantiene margen.
- No se separa cada módulo en un contenedor ni en un servicio.
