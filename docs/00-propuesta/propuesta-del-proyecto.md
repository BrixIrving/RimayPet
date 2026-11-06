# Propuesta del proyecto RimayPet

![RimayPet](../img/RimayPet_logo.png)

RimayPet es una red social para dueños de mascotas que combina comunidad digital con alertas geolocalizadas de mascotas perdidas. El proyecto busca que la comunidad pueda compartir publicaciones, conversar y colaborar cuando una mascota desaparece.

## Alcance funcional

El sistema contempla cuentas, perfiles de dueños y mascotas, publicaciones, feed, seguimientos, mensajería, reportes de mascotas perdidas, avistamientos, actualización de estados, notificaciones, moderación y auditoría. Las historias se organizan en 25 elementos y se priorizan con MoSCoW.

## Visión arquitectónica

- Estilo: monolito modular.
- Enfoque: Clean Architecture por módulo.
- Módulos: Identidad, Perfiles, Publicaciones, Mensajería, Alertas y Notificaciones.
- Comunicación: fachadas locales para operaciones inmediatas y Transactional Outbox para efectos diferidos.
- Datos: PostgreSQL + PostGIS, una instancia primaria con esquema lógico por módulo.
- Medios: almacenamiento externo mediante URLs firmadas.
- Despliegue: dos VM Oracle Cloud Free Tier; API y worker desde el mismo código.
- Capacidad: objetivo de 1000 sesiones concurrentes con actividad normal, sujeto a prueba k6.

## Alcance por versiones

| Versión | Alcance |
|---|---|
| 1.0 MVP | 11 historias Debe: identidad, perfiles, publicaciones/feed, seguimientos, mensajería, reportes de pérdida, radio, avistamientos y estado. |
| 1.1 | 10 historias Debería: privacidad, verificación, reacciones, comentarios, historial, push comunitario, enlace público, moderación y auditoría. |
| 1.2 | 4 historias Podría: búsqueda, sugerencias, grupos y reportes de actividad. |
| 2.0+ | IA para coincidencia por imagen, autocompletado y asistente; fuera del MVP. |

## Restricciones

El diseño considera un desarrollador, recursos gratuitos y dos VM de 1 OCPU/6 GB cada una. La distribución de componentes, los límites y los riesgos se detallan en `docs/02-arquitectura-software/capacidad-y-despliegue.md`.

## Documentos de arquitectura

- Estilo y enfoque: `docs/02-arquitectura-software/estilo-arquitectonico.md`
- Módulos y fronteras: `docs/02-arquitectura-software/modulos-y-fronteras.md`
- Comunicación: `docs/02-arquitectura-software/comunicacion-componentes.md`
- C4: `docs/04-modelo-c4/`
- Sprint 1: `docs/05-sprint-1/plan-sprint-1.md`
