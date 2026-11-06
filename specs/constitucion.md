# Constitución de RimayPet (SDD)

## Principios obligatorios
1. El estilo es monolito modular; no crear servicios desplegables por módulo.
2. Cada módulo posee Dominio, Aplicación, Presentación e Infraestructura.
3. Las dependencias apuntan hacia Dominio.
4. La comunicación entre módulos usa fachadas públicas o eventos Outbox.
5. Ningún módulo consulta tablas de otro esquema.
6. Toda operación protegida aplica autenticación, autorización por rol y propiedad.
7. Cada criterio de aceptación tiene pruebas asociadas.
8. Los cambios arquitectónicos se registran en ADR.
9. La infraestructura debe respetar el presupuesto de dos VM; toda cifra de capacidad se valida con medición.
10. Secretos nunca se versionan.

## Flujo SDD
Constitución → especificación de historia/reglas → plan técnico/puertos/datos → tareas pequeñas → implementación → pruebas → evidencia.

## Convenciones
- TypeScript estricto en el sistema objetivo.
- Commits: Conventional Commits (`feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`).
- IDs estables: HU, RF, EQ, ADR y S1.
- API REST `/api/v1`; eventos con `eventId`, `eventType`, `schemaVersion` y `correlationId`.
