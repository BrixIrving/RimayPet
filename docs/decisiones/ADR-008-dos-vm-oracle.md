# ADR-008: Despliegue en dos VM Oracle Cloud

- **Estado:** Aceptada
- **Decisión:** VM1 ejecuta Caddy, PWA, API principal y worker; VM2 ejecuta PostgreSQL/PostGIS. API secundaria del mismo artefacto puede activarse en VM2 únicamente si las pruebas muestran margen de CPU para la base.
- **Alternativas:** Kubernetes; microservicios; todos los procesos en una VM.
- **Consecuencias:** distribución clara y despliegue simple; no hay alta disponibilidad automática de Caddy ni de PostgreSQL.
- **Verificación:** Compose, health checks, prueba de restauración y carga externa.
