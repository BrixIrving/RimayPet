# Requisitos funcionales

Los requisitos funcionales se expresan a nivel de producto. Su asignación a módulos respeta la arquitectura modular, no implica servicios o despliegues separados.

| ID | Requisito funcional | Módulo responsable | Historias |
|---|---|---|---|
| RF01 | Registrar usuarios, autenticar, cerrar sesión, renovar tokens y administrar roles. | Identidad | HU07 |
| RF02 | Crear y administrar perfiles de dueños y mascotas, incluyendo datos básicos y relación de propiedad. | Perfiles | HU01 |
| RF03 | Administrar privacidad, ubicación aproximada y radio de alertas con consentimiento. | Perfiles | HU06, HU15 |
| RF04 | Crear publicaciones con fotos y videos mediante almacenamiento externo. | Publicaciones | HU02 |
| RF05 | Seguir cuentas/mascotas y consultar un feed cronológico paginado. | Publicaciones | HU10, HU11 |
| RF06 | Gestionar reacciones, comentarios e historial de actividad. | Publicaciones | HU09, HU12, HU13 |
| RF07 | Enviar y recibir mensajes directos en tiempo real. | Mensajería | HU03 |
| RF08 | Registrar reportes de mascotas perdidas y consultar su estado. | Alertas | HU04, HU18 |
| RF09 | Registrar avistamientos y actualizar el estado de un reporte. | Alertas | HU16, HU17 |
| RF10 | Identificar destinatarios geográficos elegibles y distribuir alertas sin bloquear la operación principal. | Alertas / Notificaciones | HU05, HU15 |
| RF11 | Generar notificaciones internas y push según suscripción y preferencias. | Notificaciones | HU05, HU14 |
| RF12 | Buscar perfiles y publicaciones y sugerir cuentas. | Perfiles / Publicaciones | HU19, HU20 |
| RF13 | Crear y administrar grupos temáticos y sus miembros. | Publicaciones | HU21 |
| RF14 | Recibir, revisar y resolver reportes de contenido y cuentas; registrar acciones de moderación. | Perfiles (subdominio Moderación) | HU22, HU23 |
| RF15 | Consultar indicadores y bitácora de actividad sensible. | Perfiles (Administración y Auditoría) | HU24, HU25 |

## Reglas transversales

- Toda operación protegida requiere autenticación y autorización.
- La autorización debe comprobar el rol y la propiedad del recurso; conocer un identificador no concede acceso.
- Los recursos públicos son explícitos y devuelven únicamente los campos permitidos.
- Los archivos se transfieren directamente entre cliente y almacenamiento mediante URL firmada; la API no retransmite el binario.
- Las operaciones que generan efectos secundarios diferidos guardan un evento en Outbox dentro de la misma transacción.
