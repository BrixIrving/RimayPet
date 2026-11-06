# Drivers arquitectónicos

| ID | Driver | Origen | Decisión |
|---|---|---|---|
| DA01 | Atender hasta 1000 sesiones concurrentes con infraestructura limitada. | AC01, RC01, RC05 | Monolito modular sin estado de sesión, caché, paginación, worker y escalado condicional de API. |
| DA02 | La alerta masiva no debe bloquear al dueño que reporta. | RF08–RF11 | Transactional Outbox en PostgreSQL y worker asíncrono. |
| DA03 | Proteger datos personales, credenciales y ubicación. | AC03, RC04 | JWT, Argon2id, HTTPS, autorización por propiedad, minimización de ubicación y auditoría. |
| DA04 | Operar con dos VM gratuitas y un equipo pequeño. | RC01, RC02, RC05 | Un código base, un artefacto, Docker Compose y despliegue simple. |
| DA05 | Dar soporte a operaciones web y mensajería en tiempo real. | RC03 | REST versionado y WebSocket autenticado en el mismo proceso API. |
| DA06 | Permitir evolución sin acoplamiento entre funcionalidades. | AC05 | Seis módulos con fachadas públicas, esquemas separados y Clean Architecture. |
| DA07 | Recuperar el servicio y diagnosticar fallos. | AC02, AC06 | Health checks, reinicio automático, logs correlacionados, respaldos y pruebas de restauración. |

**Orden de prioridad:** DA01 y DA02; después DA03 y DA04; luego DA05, DA06 y DA07.
