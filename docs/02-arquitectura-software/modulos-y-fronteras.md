# Módulos, responsabilidades y fronteras

RimayPet tiene **seis módulos de negocio** y un núcleo técnico compartido. Los módulos son unidades lógicas dentro de una aplicación; no son servicios desplegables independientes.

| Módulo | Responsabilidad / incluye | Datos propios | Fachada pública (ejemplos) | Eventos |
|---|---|---|---|---|
| **Identidad** | Registro, login/logout, hash de contraseñas, JWT, renovación y roles. | `identidad`: usuarios, credenciales, refresh_tokens, roles. | `registrarUsuario`, `autenticar`, `renovarToken`, `verificarToken`, `obtenerUsuario`. | `UsuarioRegistrado`, `CuentaSuspendida`. |
| **Perfiles** | Dueños, mascotas, propiedad, privacidad, ubicación aproximada, radio, verificación; subdominios de Moderación, Administración y Auditoría. | `perfiles`: propietarios, mascotas, ubicaciones, preferencias; `moderacion`: reportes y acciones; `auditoria`: bitácora. | `obtenerMascota`, `obtenerPropietario`, `destinatariosEnRadio`, `verificarPropiedad`, `registrarAccionModeracion`. | `MascotaRegistrada`, `ContenidoReportado`, `CuentaSuspendida`. |
| **Publicaciones** | Publicaciones, medios, seguimientos, feed, reacciones, comentarios, historial y grupos. | `publicaciones`: publicaciones, medios, seguimientos, reacciones, comentarios, grupos y miembros. | `crearPublicacion`, `obtenerFeed`, `obtenerPublicacion`, `seguir`, `reaccionar`. | `PublicacionCreada`, `InteraccionCreada`. |
| **Mensajería** | Conversaciones, participantes, mensajes y presencia/conexiones WebSocket. | `mensajeria`: conversaciones, participantes, mensajes. | `iniciarConversacion`, `enviarMensaje`, `consultarConversacion`. | `MensajeEnviado`. |
| **Alertas** | Reporte de pérdida, avistamientos, estados, ubicación y consulta pública. | `alertas`: reportes, avistamientos, historial_estado. | `reportar`, `registrarAvistamiento`, `actualizarEstado`, `consultarEstadoPublico`. | `MascotaPerdidaReportada`, `AvistamientoRegistrado`, `EstadoReporteCambiado`. |
| **Notificaciones** | Suscripciones, preferencias, bandeja de notificaciones y entrega push/interna. | `notificaciones`: suscripciones, notificaciones, eventos_procesados. | `registrarSuscripcion`, `marcarComoLeida`, `consultarNotificaciones`. | Consume eventos; no publica eventos de negocio en el MVP. |

## Núcleo técnico compartido (`shared`)

- `auth`: middleware JWT y contexto de usuario autenticado.
- `database`: conexión, transacciones y utilidades SQL; no contiene consultas de negocio.
- `events`: contrato de eventos, Outbox, dispatcher e idempotencia.
- `config`: configuración validada por entorno.
- `http`: errores RFC 9457, correlación, rate limiting y utilidades HTTP.
- `observability`: logs JSON, métricas y health checks.
- `errors`: errores técnicos comunes.

`shared` no debe convertirse en un lugar para colocar entidades o reglas que no se sabe a qué módulo pertenecen.

## Dependencias permitidas

| Módulo consumidor | Fachada que puede invocar | Eventos que consume |
|---|---|---|
| Identidad | Ninguna | — |
| Perfiles | Identidad | `UsuarioRegistrado` |
| Publicaciones | Perfiles | — |
| Mensajería | Perfiles | — |
| Alertas | Perfiles | — |
| Notificaciones | Perfiles | `MascotaPerdidaReportada`, `AvistamientoRegistrado`, `EstadoReporteCambiado`, `MensajeEnviado` |

Las consultas a otros módulos se realizan por fachada y DTO, nunca por SQL cruzado. El grafo es acíclico: Identidad → Perfiles → módulos consumidores.

## Propiedad de datos

PostgreSQL es una instancia compartida, pero cada módulo tiene un esquema y permisos lógicos propios. Las migraciones se organizan por módulo. En la aplicación, cada repositorio usa exclusivamente su esquema. Las uniones de información entre módulos se resuelven mediante fachadas o eventos.
