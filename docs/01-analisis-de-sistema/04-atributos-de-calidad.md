# Atributos de calidad

Escenario que los pone a prueba: durante la difusión de una alerta de mascota perdida, o ante el crecimiento de la comunidad hasta 1000 usuarios registrados, el sistema recibe muchas solicitudes simultáneas (feed, mensajería y notificaciones).

| ID | Atributo | Descripción general | Prioridad |
|---|---|---|---|
| **AC02** | Disponibilidad | La plataforma debe mantenerse operativa de forma continua, en particular durante la propagación de una alerta. | Muy alta |
| **AC01** | Rendimiento | El feed y la mensajería deben responder con baja latencia con alta concurrencia. | Alta |
| **AC03** | Escalabilidad | Debe soportar hasta 1000 usuarios registrados, escalando cada microservicio de forma independiente. | Alta |
| **AC04** | Seguridad | Las comunicaciones y los datos deben protegerse con JWT y HTTPS. | Alta |
| **AC05** | Mantenibilidad | Debe permitir incorporar nuevos módulos sin afectar los servicios existentes. | Media-alta |
| **AC06** | Observabilidad | Los registros y métricas deben permitir diagnosticar fallos en la propagación de alertas. | Media |

> Estas descripciones generales se convierten en escenarios medibles en `08-escenarios-atributos-calidad.md`.
