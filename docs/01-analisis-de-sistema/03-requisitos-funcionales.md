# Requisitos funcionales

| ID | Requisito funcional | Módulo / servicio |
|---|---|---|
| **RF01** | El sistema debe permitir registrar un perfil de dueño y uno o más perfiles de mascota (con privacidad configurable y verificación opcional mediante carnet de vacunación). | Perfiles |
| **RF02** | El sistema debe permitir publicar fotos y videos asociados a un perfil de mascota, con reacciones y comentarios. | Publicaciones |
| **RF03** | El sistema debe mostrar un feed cronológico y paginado de publicaciones de mascotas seguidas. | Publicaciones |
| **RF04** | El sistema debe permitir el envío y la recepción de mensajes directos en tiempo real mediante un canal WebSocket. | Mensajería |
| **RF05** | El sistema debe permitir reportar una mascota como perdida, indicando ubicación y características, y consultar su estado mediante un enlace público. | Alertas |
| **RF06** | El sistema debe distribuir una alerta geolocalizada a los usuarios dentro de un radio configurable, sin bloquear la operación que la origina. | Alertas y Notificaciones |
| **RF07** | El sistema debe permitir a un moderador revisar y actuar sobre el contenido reportado. | Perfiles (módulo de Moderación) |
| **RF08** | El sistema debe generar reportes de actividad (usuarios activos, publicaciones por día y alertas resueltas). | Perfiles (módulo de Moderación) |

## Trazabilidad historias de usuario → requisitos funcionales

| Historia de usuario | Requisitos funcionales |
|---|---|
| HU01 Crear perfil | RF01 |
| HU02 Publicar contenido | RF02, RF03 |
| HU03 Mensajería | RF04 |
| HU04 Reportar mascota perdida | RF05, RF06 |
| HU05 Recibir alertas | RF06 |
| HU06 Moderar contenido | RF07, RF08 |
