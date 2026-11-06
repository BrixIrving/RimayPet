# Restricciones y supuestos

| ID | Restricción | Aplicación |
|---|---|---|
| RC01 | Infraestructura gratuita | Se priorizan los recursos Oracle Cloud Free Tier y servicios con nivel gratuito. Los límites deben verificarse antes del despliegue. |
| RC02 | Equipo reducido | La solución debe ser viable para un desarrollador: un repositorio, un artefacto principal y operación simple. |
| RC03 | Cliente web | La PWA consume API REST para operaciones y WebSocket para mensajería en tiempo real. |
| RC04 | Seguridad centralizada | Caddy termina HTTPS y enruta; el middleware de la API valida JWT y aplica autorización. No se introduce un gateway como microservicio independiente. |
| RC05 | Dos servidores | Se dispone de dos VM Oracle Arm, cada una dimensionada en 1 OCPU y 6 GB RAM según el planteamiento del proyecto. |
| RC06 | Persistencia relacional | PostgreSQL con PostGIS; un esquema lógico por módulo dentro de una instancia administrada por el proyecto. |
| RC07 | Archivos multimedia | Fotos y videos se almacenan fuera de la VM, en Cloudflare R2 o adaptador equivalente. |
| RC08 | Alcance MVP | IA, recomendaciones inteligentes y aplicaciones móviles nativas quedan fuera de la versión 1.0. |

## Supuestos de dimensionamiento

La meta de 1000 concurrentes se interpreta como 1000 sesiones simultáneas con actividad intermitente, perfil normal de una acción por usuario cada 10 segundos. La capacidad debe medirse con k6. La cifra no implica que 1000 usuarios ejecuten una operación pesada al mismo instante.
