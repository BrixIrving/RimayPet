# ADR-002: Clean Architecture por módulo

- **Estado:** Aceptada
- **Contexto:** reglas de negocio deben mantenerse independientes de Express, PostgreSQL, PostGIS, R2 y Web Push.
- **Decisión:** cada módulo usa Dominio, Aplicación, Presentación e Infraestructura. Las dependencias apuntan al Dominio.
- **Alternativas:** arquitectura en capas tradicional sin regla de dependencias; arquitectura hexagonal como nomenclatura principal.
- **Consecuencias:** dominio y casos de uso se prueban sin infraestructura; aumenta el número de carpetas y contratos.
- **Verificación:** pruebas de arquitectura y revisión de imports.
