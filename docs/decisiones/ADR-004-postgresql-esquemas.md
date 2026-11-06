# ADR-004: PostgreSQL/PostGIS con esquema por módulo

- **Estado:** Aceptada
- **Contexto:** se requiere persistencia relacional y consultas geoespaciales con recursos limitados.
- **Decisión:** una instancia PostgreSQL primaria con PostGIS y un esquema lógico por módulo. No hay consultas SQL cruzadas entre esquemas desde módulos consumidores.
- **Alternativas:** una instancia/base por módulo; esquema único compartido sin ownership.
- **Consecuencias positivas:** menor consumo operativo y transacciones locales; ownership claro.
- **Consecuencias negativas:** PostgreSQL es un punto único de fallo; la separación lógica requiere disciplina y pruebas.
- **Verificación:** migraciones por módulo, roles/permisos y pruebas de arquitectura.
