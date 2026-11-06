# ADR-006: PWA, REST y WebSocket en una aplicación

- **Estado:** Aceptada
- **Decisión:** React PWA consume API REST versionada y canal WebSocket `/ws`; ambos son expuestos por Caddy hacia el proceso API del monolito.
- **Alternativas:** aplicaciones nativas; gateway separado como servicio.
- **Consecuencias:** una experiencia web y un solo backend; las notificaciones en iOS pueden requerir instalación PWA y compatibilidad del navegador.
