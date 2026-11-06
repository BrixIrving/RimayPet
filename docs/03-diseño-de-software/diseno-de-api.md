# Diseño de API de RimayPet

La API es única para todo el monolito. Los grupos de rutas reflejan módulos, no servicios desplegables.

## Convenciones

| Tema | Decisión |
|---|---|
| Transporte | HTTPS REST `/api/v1`; WebSocket `/ws`. |
| Formato | JSON UTF-8; fechas ISO 8601 UTC; UUID. |
| Errores | RFC 9457 (`type`, `title`, `status`, `detail`, `instance`). |
| Paginación | Cursor; `limit` predeterminado 20, máximo 50. |
| Validación | Esquemas de entrada en Presentación. |
| Idempotencia | `Idempotency-Key` para creación de reportes y operaciones críticas. |
| Seguridad | JWT Bearer, roles y autorización por propiedad. |
| Documentación | Un contrato OpenAPI con tags por módulo. |

## Grupos de endpoints (propuesta)

| Módulo | Método y ruta | Uso |
|---|---|---|
| Identidad | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` | Cuenta y tokens. |
| Perfiles | `GET/PATCH /owners/me`; `POST /pets`; `GET/PATCH /pets/{id}` | Dueños y mascotas. |
| Perfiles | `PUT /owners/me/location`; `PUT /owners/me/alert-radius`; `PUT /pets/{id}/privacy` | Ubicación y privacidad. |
| Perfiles | `POST /pets/{id}/verification` | Solicitar verificación. |
| Publicaciones | `POST /media/upload-url`; `POST /posts`; `GET /feed` | Medios, publicaciones y feed. |
| Publicaciones | `POST/DELETE /follows/{profileId}`; `POST /posts/{id}/reactions`; `GET/POST /posts/{id}/comments` | Interacciones. |
| Mensajería | `GET/POST /conversations`; `GET /conversations/{id}/messages` | Conversaciones y mensajes. |
| Mensajería | `WSS /ws` | Entrega de mensajes en tiempo real. |
| Alertas | `POST /alerts`; `POST /alerts/{id}/sightings`; `PATCH /alerts/{id}/status` | Reportes y avistamientos. |
| Alertas | `GET /public/alerts/{publicToken}` | Estado público limitado. |
| Notificaciones | `GET /notifications`; `PATCH /notifications/{id}/read`; `PUT /push-subscriptions` | Avisos y suscripción push. |
| Perfiles / Moderación | `POST /moderation/reports`; `GET /moderation/reports`; `POST /moderation/reports/{id}/actions` | Reportar y moderar. |
| Perfiles / Administración | `GET /admin/activity`; `GET /admin/audit` | Indicadores y bitácora. |

## WebSocket

| Mensaje | Dirección | Campos mínimos |
|---|---|---|
| `message.send` | Cliente → API | `conversationId`, `clientMessageId`, `content`. |
| `message.new` | API → cliente | `messageId`, `conversationId`, `senderId`, `content`, `sentAt`. |
| `message.ack` | API → cliente | `clientMessageId`, `messageId`, `status`. |
| `ping` / `pong` | Bidireccional | Marca de tiempo. |

El handshake valida JWT. Cada mensaje verifica pertenencia a la conversación. El servidor persiste el mensaje antes de emitir `message.new`.

## Eventos de dominio

Los eventos se escriben en PostgreSQL Outbox. No se utiliza Redis Pub/Sub como bus durable.

| Evento | Productor | Consumidor |
|---|---|---|
| `UsuarioRegistrado` | Identidad | Perfiles |
| `MascotaPerdidaReportada` | Alertas | Notificaciones |
| `AvistamientoRegistrado` | Alertas | Notificaciones |
| `EstadoReporteCambiado` | Alertas | Notificaciones |
| `MensajeEnviado` | Mensajería | Notificaciones |
| `PublicacionCreada` | Publicaciones | Notificaciones (versión 1.1) |

## Ejemplo: crear alerta

```http
POST /api/v1/alerts
Authorization: Bearer <access-token>
Idempotency-Key: <uuid>
Content-Type: application/json

{
  "petId": "<uuid>",
  "description": "Perra mestiza, collar rojo",
  "location": { "latitude": -13.1588, "longitude": -74.2232 },
  "radiusKm": 3
}
```

Respuesta:

```json
{
  "id": "<uuid>",
  "status": "PERDIDA",
  "publicUrl": "/public/alerts/<public-token>"
}
```

La creación del reporte y el evento Outbox se confirman en una sola transacción. El envío push sucede después en el worker.
